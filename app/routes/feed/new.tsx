import { Task, User } from "@prisma/client";
import dayjs from "dayjs";
import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useLoaderData,
  useNavigate,
} from "remix";
import TasklogForm from "~/components/TasklogForm";
import { Paths } from "~/constants";
import { getUserHouseholdId } from "~/utils/auth.server";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async ({ request }) => {
  const householdId = await getUserHouseholdId(request);
  if (!!!householdId) throw new Error("Something is wrong, contact your admin");
  const tasks = await db.task.findMany({
    where: {
      householdId,
    },
  });
  const users = await db.user.findMany({
    where: {
      householdId,
    },
    select: {
      id: true,
      username: true,
    },
  });
  return { tasks, users };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const taskId = formData.get("taskId") as string;
  const userId = formData.get("userId") as string;
  const datetime = formData.get("completedOn") as string;
  const completedOn = dayjs(datetime).toDate();

  await db.tasklog.create({
    data: {
      userId,
      taskId,
      completedOn,
    },
  });

  return redirect(Paths.FEED);
};

export default function NewTasklogPage() {
  const data =
    useLoaderData<{ tasks: Task[]; users: Pick<User, "id" | "username">[] }>();
  const navigate = useNavigate();
  return (
    <TasklogForm
      onClose={() => navigate(Paths.FEED)}
      tasks={data.tasks}
      users={data.users}
    />
  );
}
