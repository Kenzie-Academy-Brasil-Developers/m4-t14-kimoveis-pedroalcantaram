import "express-async-errors";
import express, { Application } from "express";
import { handleError } from "./errors";
import {
  categoriesRoutes,
  loginRoutes,
  realEstateRoutes,
  schedulesRoutes,
  usersRoutes,
} from "./routes";

const app: Application = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoriesRoutes);
app.use("/realEstate", realEstateRoutes);
app.use("/schedules", schedulesRoutes);

app.use(handleError);
export default app;
