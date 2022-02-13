import Avatar from "~/components/Avatar";
import dayjs from "dayjs";
import { User } from "@prisma/client";

export interface TaskLogProps {
  completedOn: Date;
  userDetails: Pick<User, "id" | "username" | "name">;
  taskName: string;
  taskDoD: string;
}
const TaskLogCard = ({
  completedOn,
  userDetails: { name, username, id: userId },
  taskDoD,
  taskName,
}: TaskLogProps) => {
  return (
    <div className="surface grid grid-cols-[100px_minmax(0,_1fr)] gap-4 bg-white p-3">
      <Avatar
        src={`https://avatars.dicebear.com/api/personas/${userId}.svg?size=300`}
      />

      <div className="relative">
        <p>
          <span className="text-lg text-sky-600">{name}</span>
          <span className="text-md ml-4 text-gray-500">
            @{username ?? "User"}
          </span>
        </p>
        <p>
          Completed {/* TODO: Link to task details page instead of title*/}
          <strong title={taskDoD} className="cursor-pointer">
            {taskName ?? "a task"}.
          </strong>
        </p>
        <p className="absolute top-0 right-0">
          <small className="mt-5">{dayjs(completedOn).fromNow()}</small>
        </p>
      </div>
    </div>
  );
};

export default TaskLogCard;
