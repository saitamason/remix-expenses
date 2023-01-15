import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { requireUserSession } from "~/data/auth.server";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export const meta: MetaFunction = () => ({
  title: "Add New Expense - RemixExpenses",
  description: "Add new expense. Provide title, amount and date.",
});

export default function AddExpensePage() {
  const navigate = useNavigate();
  const closeHandler = () => navigate("..");

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserSession(request);

  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }

  await addExpense(expenseData, userId);
  return redirect("/expenses");
};
