import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Address, Category, RealEstate } from "../entities";
import { AppError } from "../errors";
import {
  TRealEstate,
  TAddress,
  TRealEstateWithCategoryReturn,
  TRealEstateList,
} from "../interfaces";

const createAdress = async (addressPayload: TAddress): Promise<Address> => {
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const existenceAddress = await addressRepository.findOne({
    where: {
      zipCode: addressPayload.zipCode,
      street: addressPayload.street,
      state: addressPayload.state,
    },
  });

  if (existenceAddress) {
    throw new AppError("Address already exists", 409);
  }

  const address: Address = addressRepository.create(addressPayload);
  await addressRepository.save(address);

  return address;
};

const create = async (
  payload: TRealEstate
): Promise<TRealEstateWithCategoryReturn> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const address: Address = await createAdress(payload.address);

  const category: Category | null = await categoryRepository.findOneBy({
    id: payload.categoryId,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const realEstate: RealEstate = realEstateRepository.create({
    ...payload,
    address: address!,
    category: category!,
  });

  await realEstateRepository.save(realEstate);

  return realEstate;
};

const read = async (): Promise<TRealEstateList> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateList: TRealEstateList = await realEstateRepository.find({
    relations: {
      address: true,
    },
  });

  return realEstateList;
};

export default { create, read };
