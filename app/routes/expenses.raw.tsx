import type { LoaderFunction } from "@remix-run/node";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "First expense",
    amount: 12.99,
    date: new Date().toISOString(),
  },
  {
    id: "e2",
    title: "Second expense",
    amount: 19.99,
    date: new Date().toISOString(),
  },
];

export const loader: LoaderFunction = () => DUMMY_EXPENSES;
