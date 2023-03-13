import "dotenv/config";
import app from "./app";
import { AppDataSource } from "./data-source";

const PORT: number | undefined = Number(process.env.PORT);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
