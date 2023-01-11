import { prisma } from "./database.server";

export const addExpense = async (expenseData: {
  [k: string]: FormDataEntryValue;
}) => {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(String(expenseData.date)),
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
