import type { MetaFunction } from "@remix-run/node";
import { FaTrophy, FaHandshake } from "react-icons/fa";

import PricingPlan from "~/components/marketing/PricingPlan";

const PRICING_PLANS = [
  {
    id: "p1",
    title: "Basic",
    price: "Free forever",
    perks: ["1 User", "Up to 100 expenses/year", "Basic analytics"],
    icon: FaHandshake,
  },
  {
    id: "p2",
    title: "Pro",
    price: "$9.99/month",
    perks: ["Unlimited Users", "Unlimited expenses/year", "Detailed analytics"],
    icon: FaTrophy,
  },
];

export const meta: MetaFunction = () => ({
  title: "RemixExpenses - Pricing Plans",
  description:
    "Manage your expenses with ease. Choose a plan to get all features!",
});

export default function PricingPage() {
  return (
    <main id="pricing">
      <h2>Great Product, Simple Pricing</h2>
      <ol id="pricing-plans">
        {PRICING_PLANS.map((plan) => (
          <li key={plan.id} className="plan">
            <PricingPlan
              title={plan.title}
              price={plan.price}
              perks={plan.perks}
              icon={plan.icon}
            />
          </li>
        ))}
      </ol>
    </main>
  );
}

export const headers = ({ parentHeaders }: { [k: string]: Headers }) => {
  return {
    "Cache-Control": parentHeaders.get("Cache-Control"),
  };
};
