import { Router } from 'express';
import { validateProduct } from '../middlewares/validatons';
import createProduct, { getProducts } from '../controllers/product';

const router = Router();

router.get('/', getProducts);
router.post('/', validateProduct, createProduct);

export default router;
