import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RealEstate, Schedule, User } from "../entities";
import { AppError } from "../errors";
import { TSchedules, TSchedulesReturn } from "../interfaces";
import { returnUserSchema } from "../schemas";

const create = async (payload: TSchedules, userId: number): Promise<string> => {
  const schedulesRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateId: number = payload.realEstateId;

  const user: User | null = await usersRepository.findOneBy({
    id: userId,
  });

  const newUser = returnUserSchema.parse(user);

  const realEstate: RealEstate | null = await realEstateRepository.findOneBy({
    id: realEstateId,
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const scheduleHour = Number(payload.hour.split(":")[0]);

  if (scheduleHour < 8 || scheduleHour >= 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const scheduleDate = new Date(payload.date);

  const scheduledDay = scheduleDate.getDay();
  if (scheduledDay === 0 || scheduledDay === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const existenceScheduleOnRealEstate = await schedulesRepository
    .createQueryBuilder("schedule")
    .innerJoin("schedule.realEstate", "realEstate")
    .where("realEstate.id = :id", { id: payload.realEstateId })
    .andWhere("schedule.hour = :hour", { hour: payload.hour })
    .andWhere("schedule.date = :date", { date: payload.date })
    .getOne();

  if (existenceScheduleOnRealEstate) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const existenceScheduleToUser = await schedulesRepository
    .createQueryBuilder("schedule")
    .innerJoin("schedule.user", "user")
    .where("user.id = :id", { id: user!.id })
    .andWhere("schedule.hour = :hour", { hour: payload.hour })
    .andWhere("schedule.date = :date", { date: payload.date })
    .getOne();

  if (existenceScheduleToUser) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const schedule: TSchedulesReturn = schedulesRepository.create({
    ...payload,
    realEstate: realEstate,
    user: newUser!,
  });

  schedulesRepository.save(schedule);

  const message: string = "Schedule created";

  return message;
};

const readByRealEstate = async (realEstateId: number) => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate: RealEstate | null = await realEstateRepository.findOne({
    where: {
      id: realEstateId,
    },
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const schedulesList = await realEstateRepository
    .createQueryBuilder("realEstate")
    .select(["schedules", "user", "realEstate", "address", "category"])
    .innerJoin("realEstate.schedules", "schedules")
    .innerJoin("realEstate.address", "address")
    .innerJoin("realEstate.category", "category")
    .innerJoin("schedules.user", "user")
    .where("realEstate.id = :id", { id: realEstateId })
    .getOne();

  return schedulesList;
};

export default { create, readByRealEstate };
