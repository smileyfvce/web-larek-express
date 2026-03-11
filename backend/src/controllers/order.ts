import { Request, Response, NextFunction } from "express";
import Product from '../models/product'
import { faker } from "@faker-js/faker";
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { payment, email, phone, address, total, items} = req.body;

    const products = await Product.find({_id: {$in: items}})

    // проверка: существования товаров в бд 
    if(products.length !== items.length){
      return res.status(400).json({ message: 'Товар не существует'})
    }

    // проверка: продаётся ли товар
    const nullPriceProduct = products.filter(product => product.price === null)
    if(nullPriceProduct.length > 0){
      return res.status(400).json({ message: 'Товар не продаётся' })
  }
    // проверка суммы
    const totalSum = products.reduce((sum, product) => sum + (product.price || 0), 0)

    const order = {
      id: faker.string.uuid(),
      total: totalSum
    }

    res.status(201).json(order)
}
  catch(err){next(err)}
}