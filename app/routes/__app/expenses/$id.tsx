import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
import type { Expense } from "~/types";

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
    return redirect("/expenses");
  }
};
