import { Task, Tasklog } from "@prisma/client";
import { Link, LoaderFunction, Outlet, useLoaderData } from "remix";

import TaskLogCard from "~/components/Tasklog";
import { Paths } from "~/constants";
import { getUserHouseholdId, requireUserId } from "~/utils/auth.server";
import { NAVBAR_HEIGHT } from "~/constants";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  const householdId = await getUserHouseholdId(request);
  if (!!!householdId) throw new Error("Something is wrong, contact your admin");
  const tasklogs = await db.tasklog.findMany({
    where: { user: { householdId } },
    select: {
      id: true,
      completedOn: true,
      task: true,
      user: {
        select: {
          id: true,
          username: true,
          name: true,
        },
      },
    },
    orderBy: {
      completedOn: "desc",
    },
  });
  return { tasklogs };
};

const Feed = () => {
  const data = useLoaderData<{
    tasklogs: (Tasklog & {
      user: { id: string; username: string; name: string };
      task: Task;
    })[];
  }>();
  return (
    <div className="h-full overflow-auto bg-gray-50 p-5 md:p-9">
      <Outlet />
      <header className="flex h-14 w-full items-center py-10">
        <h2 className="mr-5 text-lg font-light">
          See what other Mompirris have been up to lately
        </h2>
        <Link to={Paths.NEW_TASKLOG}>
          <button className="btn-primary btn-m">Add tasklog</button>
        </Link>
      </header>
      <section className="relative mt-10 flex flex-col space-y-3" role="feed">
        {data.tasklogs.map(({ id, task, user, completedOn }) => (
          <article key={id}>
            <TaskLogCard
              taskDoD={task.definitionOfDone}
              taskName={task.name}
              completedOn={completedOn}
              userDetails={user}
            />
          </article>
        ))}
      </section>
    </div>
  );
};
export default Feed;
