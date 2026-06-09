import { Router } from "express";
import tasksRouter from "./tasks.route.js";

const router = Router();

router.use("/tasks", tasksRouter);

export default router;
