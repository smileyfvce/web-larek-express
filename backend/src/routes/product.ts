import { validateProduct } from "../middlewares/validatons";
import { createProduct, getProducts } from "../controllers/product";
import { Router } from "express";

const router = Router();

router.get("/", getProducts);
router.post("/", validateProduct, createProduct)

export default router;
