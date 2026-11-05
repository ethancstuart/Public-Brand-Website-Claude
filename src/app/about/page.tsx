import type { Metadata } from "next";
import { AboutContent } from "@/components/brand/about";
export const metadata: Metadata = { title: "About", description: "Product leadership, building software, and life outside work: family, cooking, home projects, and cars.", alternates: { canonical: "/about" } };
export default function Page() { return <AboutContent />; }
