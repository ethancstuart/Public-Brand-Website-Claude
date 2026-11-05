import type { Metadata } from "next";
import { WorkflowContent } from "@/components/brand/workflow-review";
export const metadata: Metadata = {
  title: "Workflow Is the Real Unit of Organizational Transformation",
  description: "Changing the organization means changing how decisions get made and how work moves between people.",
  alternates: { canonical: "/writing/workflow-is-the-real-unit-of-organizational" },
};
export default function Page() { return <WorkflowContent />; }
