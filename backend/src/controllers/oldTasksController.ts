import { Request, Response } from "express";
// import { tasksData } from "../data/tasks.js";
import { Task } from "../types/tasks.js";

let tasksData: Task[] = [];
let nextId = 1;

const statusAllowed = ["todo", "done"];
export function getAllTasks(req: Request, res: Response) {
  res.status(200).json({ data: tasksData });
}
export function addNewTask(req: Request, res: Response) {
  const data = req.body;
  if (!data) {
    res.status(400).json({ error: "Data not found" });
  }
  const { title } = data as Task; // may need to remove as Task cuz i am checking down using if else-if statements

  if (!title) {
    res.status(400).json({ error: "Title cannot be empty" });
  }
  // else if (!status) {
  //   res.status(400).json({ error: "Status not found" });
  // }
  // else if (!title.length) {
  //   res.status(400).json({ error: "Title cannot be empty" });
  // }
  // else if (!status.length) {
  //   res.status(400).json({ error: "Status cannot be empty" });
  // }
  // else if (!statusAllowed.includes(status)) {
  //   res.status(400).json({ error: "Status values allowed todo or done" });
  // }
  else {
    const newTask: Task = { title, status: "todo", id: nextId };
    nextId = nextId + 1; //increment Id
    tasksData.push(newTask);
    res.status(201).json({ msg: "Task added", data: newTask });
  }
}
export function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  const updateData = req.body;
  if (!updateData) {
    res.status(400).json({ error: "Data not found" });
  }

  const { status: updateStatus } = updateData as Task; // may need to remove as Task cuz i am checking down using if else-if statements
  const updateId = Number(id);
  if (!id) {
    //I think this is unnecessary as without path params it will never reach this code
    res.status(401).json({ error: "id missing in request" });
  } else if (isNaN(updateId)) {
    res.status(400).json({ error: "Invalid id, not a number" });
  } else if (!updateStatus) {
    res.status(400).json({ error: "Status not found" });
  } else if (updateStatus && !updateStatus.length) {
    res.status(400).json({ error: "Status cannot be empty" });
  } else if (updateStatus && !statusAllowed.includes(updateStatus)) {
    res.status(400).json({ error: "Status values allowed todo or done" });
  } else {
    if (!tasksData.find((task) => task.id === updateId)) {
      res.status(404).json({ error: "task not found" });
    }
    const updatedTasksData = tasksData.map((task) => {
      if (task.id === updateId) {
        task = { ...task, status: updateStatus };
      }
      return task;
    });
    tasksData = updatedTasksData;
    res.status(200).json(tasksData);
    // .json({ msg: `task with id ${updateId} updated successfully` }); // or send 204 and be done
  }
}
export function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  const deleteId = Number(id);
  if (!id) {
    //I think this is unnecessary as without path params it will never reach this code
    res.status(401).json({ error: "id missing in request" });
  } else if (isNaN(deleteId)) {
    res.status(400).json({ error: "Invalid id, not a number" });
  } else {
    const initialSize = tasksData.length;
    const filteredTasksData = tasksData.filter((task) => task.id !== deleteId);
    if (filteredTasksData.length === initialSize || !initialSize) {
      // !initialSize is not reqd it already fails or u can have at the top to check if tasksData is empty array
      res.status(404).json({ error: "task not found" });
      return; //cuz 404 check doesn't stop execution updatedTasksData still runs
    } else {
      tasksData = filteredTasksData;
      res
        .status(200)
        .json({ msg: `task with id ${deleteId} deleted successfully` }); // or send 204 and be done
    }
  }
}
