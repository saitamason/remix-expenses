import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import { useCatch, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import type { Expense } from "~/types";
import type { CatchBoundaryComponent } from "@remix-run/server-runtime/dist/routeModules";
import { getExpenses } from "~/data/expenses.server";
import { json } from "react-router";
import Error from "~/components/util/Error";
import { requireUserSession } from "~/data/auth.server";

export default function ExpensesAnalyticsPage() {
  const expenses: Expense[] = useLoaderData();

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);

  if (!expenses || expenses.length === 0)
    throw json(
      { message: "No expenses found. There is nothig to analyze." },
      {
        status: 404,
        statusText: "Expenses not found",
      }
    );

  return expenses;
};

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caughtResponse = useCatch();

  return (
    <Error title={caughtResponse.statusText}>
      {caughtResponse.data?.message ||
        "Something went wrong. Please try again later."}
    </Error>
  );
};
