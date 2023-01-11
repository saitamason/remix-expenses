import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

export default function ExpenseDetailsPage() {
  return (
    <Modal onClose={() => {}}>
      <ExpenseForm />
    </Modal>
  );
}
