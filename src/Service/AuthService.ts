import argon from "argon2";
import prisma from "../utils/PrismaClient";
import { isUserExists } from "./UserService";
import { Prisma } from "@prisma/client";

type User = typeof prisma.user;
async function isValidLogin(username: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        username: true,
        password: true,
      },
      where: {
        username: username,
      },
    });
    if (!user) {
      await new Promise((resolve) => setTimeout(resolve, 102));
      return null;
    }
    const isValid = await argon.verify(user.password, password);
    if (isValid) {
      return { id: user.id, username: user.username };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function createUser(username, password) {
  const hash = await argon.hash(password);

  if (await isUserExists(username)) {
    throw new Error("Username already exists");
  }

  const user = prisma.user.create({
    data: {
      username,
      password: hash,
    },
  });
  return user;
}

export { isValidLogin, createUser };
