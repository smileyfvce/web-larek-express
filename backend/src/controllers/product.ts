import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import mongoose from "mongoose";
import BadRequestError from "../errors/bad-request-error";
import ConflictError from "../errors/conflict-error";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      items: products,
      total: products.length,
    });
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { description, image, title, category, price } = req.body;
    const product = await Product.create({
      description,
      image,
      title,
      category,
      price,
    });
    res.status(201).json(product);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(error.message));
    }
    if (error instanceof Error && error.message.includes("E11000")) {
      return next(new ConflictError("Товар с таким названием существует"));
    }
    next(error);
  }
};
