import type { ActionFunction, LinksFunction } from "@remix-run/node";
import AuthForm from "~/components/auth/AuthForm";
import authStyles from "~/styles/auth.css";

export default function AuthPage() {
  return <AuthForm />;
}

export const action: ActionFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData) as {
    email: string;
    password: string;
  };

  // validate user input

  if (authMode === "login") {
    // login logic
  } else {
    // signup logic
  }
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: authStyles },
];
