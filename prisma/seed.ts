import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const db = new PrismaClient();

async function seed() {
  const user = await db.user.create({
    data: {
      username: "mompi",
      name: "Pedrito Coral",
      household: {
        create: { name: "MompiDev" },
      },
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });

  if (!!!user.householdId) return;

  const task = await db.task.create({
    data: {
      name: "Take the trash out",
      definitionOfDone:
        "Take all bags, glass, and any kind of garbage from the kitchen. Put new bags in all trash cans",
      householdId: user.householdId,
      tasklogs: {
        create: {
          completedOn: new Date("2022-02-13"),
          userId: user.id,
        },
      },
    },
  });
}

seed();
