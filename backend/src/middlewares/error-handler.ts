import BadRequestError from "../errors/bad-request-error";
import ConflictError from "../errors/conflict-error";
import NotFoundError from "../errors/not-found-error";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof Error && error.message.includes("E11000")) {
    return res
      .status(409)
      .json({ message: "Товар с таким названием существует" });
  }

  if (error instanceof BadRequestError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof NotFoundError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ConflictError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  res.status(500).json({
    message: "Ошибка на сервере",
  });
};
