import type { Expense } from "~/types";
import { prisma } from "./database.server";

export const addExpense = async (expenseData: {
  [k: string]: FormDataEntryValue;
}) => {
  try {
    return await prisma.expense.create({
      data: {
        title: String(expenseData.title),
        amount: +expenseData.amount,
        date: new Date(String(expenseData.date)),
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add expense.");
  }
};

export const getExpenses = async () => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { date: "desc" },
    });
    return expenses;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get expenses.");
  }
};

// export const getExpense = async (id: string) => {
//   try {
//     const expense = await prisma.expense.findFirst({ where: { id } });
//     return expense;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

export const updateExpense = async (id: string, expenseData: Expense) => {
  try {
    await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update expense.");
  }
};

export const deleteExpense = async (id: string) => {
  try {
    await prisma.expense.delete({ where: { id } });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete expense.");
  }
};
