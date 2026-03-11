import { validateOrder } from "../middlewares/validatons";
import { createOrder } from "../controllers/order";
import { Router } from "express";

const router = Router()

router.post("/", validateOrder, createOrder)

export default router