import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';

export const getProducts = async (
  _req: Request,
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

async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      description, image, title, category, price,
    } = req.body;
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
      next(new BadRequestError(error.message));
      return;
    }
    if (error instanceof Error && error.message.includes('E11000')) {
      next(new ConflictError('Товар с таким названием существует'));
      return;
    }
    next(error);
  }
}

export default createProduct;
