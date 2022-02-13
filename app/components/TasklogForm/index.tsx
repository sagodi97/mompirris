import Input from "~/components/Input";
import Modal from "~/components/Modal";
import { Task, Tasklog, User } from "@prisma/client";
import Select from "../Select";

interface TaskFormProps {
  tasklog?: Tasklog;
  onClose?: () => void;
  tasks: Task[];
  users: Pick<User, "id" | "username">[];
}

const TasklogForm = ({ tasklog, onClose, tasks, users }: TaskFormProps) => {
  return (
    <Modal
      title={`${tasklog ? "Edit" : "Add"} Task`}
      defaultOpen
      onClose={onClose}
    >
      <form method="post" className="grid grid-cols-1 gap-2">
        <Select
          label="Select a task"
          id="taskId"
          name="taskId"
          options={tasks.map((task) => ({ text: task.name, value: task.id }))}
          required
        />
        <Select
          label="Who completed this task?"
          id="userId"
          name="userId"
          options={users.map((user) => ({
            text: user.username,
            value: user.id,
          }))}
          required
        />
        <Input
          label="When was this completed?"
          name="completedOn"
          id="CompletedOn"
          type="datetime-local"
          required
        />
        <button className="btn-primary btn-m">Submit</button>
      </form>
    </Modal>
  );
};

export default TasklogForm;
