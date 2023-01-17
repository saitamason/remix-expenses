import type {
  ActionFunction,
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";
import type { Credentials } from "~/types";
import type { HttpError } from "~/data/auth.server";
import { login } from "~/data/auth.server";
import { signup } from "~/data/auth.server";
import AuthForm from "~/components/auth/AuthForm";
import authStyles from "~/styles/auth.css";
import { validateCredentials } from "~/data/validation.server";

export const meta: MetaFunction = () => ({
  title: "Login or Create New Account - RemixExpenses",
  description: "Login or create a new account in RemixExpenses app!",
});

export default function AuthPage() {
  return <AuthForm />;
}

export const action: ActionFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData) as unknown as Credentials;

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === "login") {
      return await login(credentials);
    } else {
      return await signup(credentials);
    }
  } catch (error) {
    if (
      (error as HttpError).status === 422 ||
      (error as HttpError).status === 401
    )
      return { credentials: (error as HttpError).message };
  }
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: authStyles },
];

export const headers = ({ parentHeaders }: { [k: string]: Headers }) => {
  return {
    "Cache-Control": parentHeaders.get("Cache-Control"),
  };
};
