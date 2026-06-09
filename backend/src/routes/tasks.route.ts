import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/tasks.controller.js";

const tasksRouter = Router();

tasksRouter.get("/", getAllTasks);
tasksRouter.post("/", createTask);
tasksRouter.put("/:id", updateTask);
tasksRouter.delete("/:id", deleteTask);

export default tasksRouter;
