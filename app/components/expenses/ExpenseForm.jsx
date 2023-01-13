import {
  Form,
  Link,
  useActionData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData();
  const params = useParams();
  const matches = useMatches();
  const expenses = matches.find(
    (match) => match.id === "routes/__app/expenses"
  ).data;
  const expense = expenses.find((expense) => expense.id === params.id);

  const defaultValues = expense
    ? {
        title: expense.title,
        amount: expense.amount,
        date: expense.date,
      }
    : {
        title: "",
        amount: "",
        date: new Date().toISOString(),
      };

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <Form method="post" className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={defaultValues.title}
          required
          maxLength={30}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            defaultValue={defaultValues.amount}
            required
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            defaultValue={defaultValues.date.slice(0, 10)}
            required
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
