import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
import type { Expense } from "~/types";
import type { Expense as PrismaExpense } from "@prisma/client";

export const meta: MetaFunction = ({ params, parentsData }) => {
  const expense: PrismaExpense = parentsData["routes/__app/expenses"].find(
    (expense: PrismaExpense) => expense.id === params.id
  );

  return {
    title: `${expense.title} - RemixExpenses`,
    description: `Update information about expense titled ${expense.title}`,
  };
};

export default function ExpenseDetailsPage() {
  const navigate = useNavigate();
  const closeHandler = () => navigate("..");

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

export const action: ActionFunction = async ({ params, request }) => {
  const expenseId = params.id!;

  if (request.method === "PATH") {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);

    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }

    const expense: Expense = {
      title: String(expenseData.title),
      amount: String(expenseData.amount),
      date: String(expenseData.date),
    };

    await updateExpense(expenseId, expense);
    return redirect("/expenses");
  }

  if (request.method === "DELETE") {
    await deleteExpense(expenseId);
    return { deletedId: expenseId };
  }
};
