import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LegalPage } from "./legal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — VLMS" },
      { name: "description", content: "Learn how the Virtual Lab Management System collects, protects, and processes student and institutional data." },
    ],
  }),
  component: PrivacyRouteComponent,
});

function PrivacyRouteComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/legal", search: { tab: "privacy" }, replace: true });
  }, [navigate]);

  return <LegalPage />;
}
