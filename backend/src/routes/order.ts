import { Router } from 'express';
import { validateOrder } from '../middlewares/validatons';
import createOrder from '../controllers/order';

const router = Router();

router.post('/', validateOrder, createOrder);

export default router;
