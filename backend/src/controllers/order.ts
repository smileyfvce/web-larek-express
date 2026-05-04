import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';

async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { items, payment, total } = req.body;

    const products = await Product.find({ _id: { $in: items } });

    // проверка корректного способа оплаты
    if (payment !== 'card' && payment !== 'online') {
      res.status(400).json({ message: 'Некорректный способ оплаты' });
      return;
    }

    // проверка: существования товаров в бд
    if (products.length !== items.length) {
      res.status(400).json({ message: 'Товар не существует' });
      return;
    }

    // проверка: продаётся ли товар
    const nullPriceProduct = products.filter(
      (product) => product.price === null,
    );
    if (nullPriceProduct.length > 0) {
      res.status(400).json({ message: 'Товар не продаётся' });
      return;
    }
    // проверка суммы
    const totalSum = products.reduce(
      (sum, product) => sum + (product.price || 0),
      0,
    );
    if (totalSum !== total) {
      res.status(400).json({ message: 'Сумма заказа не совпадает' });
      return;
    }
    const order = {
      id: faker.string.uuid(),
      total: totalSum,
    };

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

export default createOrder;
