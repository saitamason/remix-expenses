import { hash, compare } from "bcryptjs";
import { createCookieSessionStorage } from "@remix-run/node";

import { prisma } from "./database.server";
import type { Credentials } from "~/types";
import { redirect } from "react-router";

export class HttpError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.status = status;
  }
}

const SESSION_SECRET = process.env.SESSION_SECRET!;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 2_592_000, // 30 days (30 * 24 * 60 * 60)
    httpOnly: true,
  },
});

const createUserSession = async (userId: string, redirectPath: string) => {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
};

export const signup = async ({ email, password }: Credentials) => {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    throw new HttpError(
      "A user with the provided email address exists already.",
      422
    );
  }

  const passwordHash = await hash(password, 12);

  const user = await prisma.user.create({
    data: { email, password: passwordHash },
  });

  return createUserSession(user.id, "/expenses");
};

export const login = async ({ email, password }: Credentials) => {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (!existingUser) {
    throw new HttpError(
      "Could not log you in, please check the provided credentials.",
      401
    );
  }

  const passwordCorrect = await compare(password, existingUser.password);

  if (!passwordCorrect) {
    throw new HttpError(
      "Could not log you in, please check the provided credentials.",
      401
    );
  }

  return createUserSession(existingUser.id, "/expenses");
};
