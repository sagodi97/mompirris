import Input from "~/components/Input";
import Modal from "~/components/Modal";
import { Task } from "@prisma/client";

interface TaskFormProps {
  task?: Task;
}
const TaskForm = ({ task }: TaskFormProps) => {
  return (
    <Modal buttonLabel="Add task" title={`${task ? "Edit" : "Add"} Task`}>
      <form method="post">
        <Input name="taskName" id="taskName" label="Name" />
        <Input name="taskScope" id="taskScope" label="Definition of done" />
        <button className="btn-m btn-primary" type="submit">
          Save
        </button>
      </form>
    </Modal>
  );
};

export default TaskForm;
