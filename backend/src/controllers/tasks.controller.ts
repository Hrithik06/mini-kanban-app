import { Request, Response } from "express";
import { Task } from "../types/tasks.js";

let tasksData: Task[] = [];
let nextId = 1;

const statusAllowed = ["todo", "done"];
export function getAllTasks(req: Request, res: Response) {
  res.status(404).json({ error: "Task not found." });
  // res.status(200).json(tasksData);
}
export function createTask(req: Request, res: Response) {
  const data = req.body;

  const { title } = data as Task;

  if (title === undefined) {
    res.status(400).json({ error: "Title is missing from request body." });
  } else if (!title || typeof title !== "string") {
    res.status(400).json({ error: "Title must be a non-empty string." });
  } else {
    const newTask: Task = { title, status: "todo", id: nextId };
    nextId = nextId + 1; //increment Id
    tasksData.push(newTask);
    res.status(201).json(newTask);
  }
}
export function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  const updateData = req.body;

  const { status: updateStatus } = updateData as Task;
  const updateId = Number(id);
  if (isNaN(updateId)) {
    res.status(400).json({ error: "Invalid ID, not a number." });
  } else if (updateStatus === undefined) {
    res.status(400).json({ error: "Status is missing from request body." });
  } else if (!updateStatus || typeof updateStatus !== "string") {
    res.status(400).json({ error: "Status must be a non-empty string." });
  } else if (!statusAllowed.includes(updateStatus)) {
    res.status(400).json({ error: "Status must be 'todo' or 'done'." });
  } else {
    if (!tasksData.find((task) => task.id === updateId)) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    const updatedTasksData = tasksData.map((task) => {
      if (task.id === updateId) {
        task = { ...task, status: updateStatus };
      }
      return task;
    });
    tasksData = updatedTasksData;
    const updatedTask = updatedTasksData.find((task) => task.id === updateId);
    res.status(200).json(updatedTask);
  }
}
export function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  const deleteId = Number(id);
  if (isNaN(deleteId)) {
    res.status(400).json({ error: "Invalid ID, not a number." });
  } else {
    const initialSize = tasksData.length;
    const filteredTasksData = tasksData.filter((task) => task.id !== deleteId);
    if (filteredTasksData.length === initialSize) {
      res.status(404).json({ error: "Task not found." });
    } else {
      tasksData = filteredTasksData;
      res.status(204).send();
    }
  }
}
