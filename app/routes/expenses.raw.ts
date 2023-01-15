import type { LoaderArgs } from "@remix-run/node";
import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserSession(request);

  return getExpenses(userId);
}
