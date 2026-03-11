import { celebrate, Joi, Segments } from 'celebrate';

export const productSchema = Joi.object({
  description: Joi.string(),
  image: Joi.object({
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  }).required(),
  title: Joi.string().min(2).max(30).required(),
  category: Joi.string().required(),
  price: Joi.number(),
});

export const validateProduct = celebrate({
  [Segments.BODY]: productSchema,
});

export const orderSchema = Joi.object({
  payment: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  total: Joi.number().required(),
  items: Joi.array().min(1).required(),
});

export const validateOrder = celebrate({
  [Segments.BODY]: orderSchema,
});
