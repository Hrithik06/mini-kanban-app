export type Status = "todo" | "done";
export type Task = {
  id: number;
  title: string;
  status: Status;
};

export type CreateTask = {
  title: string;
};
export type UpdateTask = {
  status: Status;
};
