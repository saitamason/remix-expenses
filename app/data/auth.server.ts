import { hash } from "bcryptjs";
import { prisma } from "./database.server";
import type { Credentials } from "~/types";

export class HttpError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.status = status;
  }
}

export const signup = async ({ email, password }: Credentials) => {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    const error = new HttpError(
      "A user with the provided email address exists already.",
      422
    );
    throw error;
  }

  const passwordHash = await hash(password, 12);
  await prisma.user.create({ data: { email, password: passwordHash } });
};
