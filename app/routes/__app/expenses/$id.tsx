import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { updateExpense } from "~/data/expenses.server";
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

  await updateExpense(params.id!, expense);
  return redirect("/expenses");
};
