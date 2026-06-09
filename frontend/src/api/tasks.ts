import { http } from "../services/http";
import type { Task } from "../types/tasks";
export async function getAllTasks(): Promise<Task[]> {
  const response = await http.request({ method: "GET", url: "/tasks" });
  return response.data;
}

export async function createTask(title: string): Promise<Task> {
  const response = await http.request({
    method: "POST",
    url: "/tasks",
    data: { title },
  });
  return response.data;
}

export async function updateTask(task: Task): Promise<Task> {
  const response = await http.request({
    method: "PUT",
    url: `/tasks/${task.id}`,
    data: { status: task.status },
  });
  return response.data;
}

export async function deleteTask(id: number): Promise<void> {
  await http.request({ method: "DELETE", url: `/tasks/${id}` });
}
