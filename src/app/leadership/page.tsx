import type { Metadata } from "next";
import { LeadershipContent } from "@/components/brand/leadership";
export const metadata: Metadata = { title: "Leadership", description: "Product strategy, ownership, and organizational change: my work at Disney and Yum, and how I help people lead.", alternates: { canonical: "/leadership" } };
export default function Page() { return <LeadershipContent />; }
