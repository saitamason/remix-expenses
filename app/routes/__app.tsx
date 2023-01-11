import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import expensesStyles from "~/styles/expenses.css";

export default function ExpensesAppLayout() {
  return <Outlet />;
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: expensesStyles },
];
