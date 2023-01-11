import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import marketingStyles from "~/styles/marketing.css";

export default function MarketingLayout() {
  return <Outlet />;
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: marketingStyles },
];
