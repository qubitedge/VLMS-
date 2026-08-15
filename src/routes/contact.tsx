import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LegalPage } from "./legal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Support — VLMS" },
      { name: "description", content: "Contact the VLMS team, Grievance Officer, or report issues and security concerns." },
    ],
  }),
  component: ContactRouteComponent,
});

function ContactRouteComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/legal", search: { tab: "contact" }, replace: true });
  }, [navigate]);

  return <LegalPage />;
}
