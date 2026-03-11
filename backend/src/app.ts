import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import productRouter from "./routes/product";
import orderRouter from "./routes/order"
import path from "path";
import { errors } from "celebrate";
import { errorHandler } from "./middlewares/error-handler";
import { requestLogger, errorLogger } from "./middlewares/logger";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// логгер запросов
app.use(requestLogger)
// роуты
app.use("/product", productRouter);
app.use("/order", orderRouter)
app.get("/", (req, res) => {
  res.json({ message: "Сервер работает!" });
});
// логгер ошибок
app.use(errorLogger)
// обработка ошибок
app.use(errors())
app.use(errorHandler)

mongoose
  .connect(process.env.DB_ADDRESS as string)
  .then(() => console.log("БД подключена"))
  .catch(() => console.log("Ошибка БД"));

app.listen(Number(process.env.PORT));
