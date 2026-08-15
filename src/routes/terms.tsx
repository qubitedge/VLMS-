import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LegalPage } from "./legal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — VLMS" },
      { name: "description", content: "Terms of Service and academic sandbox guidelines for Virtual Lab Management System." },
    ],
  }),
  component: TermsRouteComponent,
});

function TermsRouteComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/legal", search: { tab: "terms" }, replace: true });
  }, [navigate]);

  return <LegalPage />;
}
