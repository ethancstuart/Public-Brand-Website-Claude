import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/section";
import { FaqAccordion } from "@/components/faq-accordion";
import { WaitlistForm } from "@/components/waitlist-form";
import { courseConfig } from "@/lib/constants";
import { getCheckoutUrl } from "@/lib/lemonsqueezy";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: courseConfig.title,
  description: courseConfig.subtitle,
};

export default function CoursePage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-24 pb-16">
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
          Course
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {courseConfig.title}
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
          {courseConfig.subtitle}
        </p>
        <WaitlistForm />
      </Section>

      {/* Problem */}
      <Section className="py-16">
        <div className="max-w-2xl">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
            The Problem
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            You have ideas for tools, apps, and automations that would make your
            work and life better — but you&apos;ve never written code. Traditional
            bootcamps take months and teach you things you&apos;ll never use. AI
            has changed the game: you can now build real software by describing
            what you want. This course teaches you how.
          </p>
        </div>
      </Section>

      {/* Curriculum */}
      <Section className="py-16">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
          Curriculum
        </h2>
        <p className="mb-10 text-3xl font-bold tracking-tight">
          What you&apos;ll learn
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courseConfig.modules.map((mod, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <p className="mb-2 font-mono text-xs text-muted-foreground">
                Module {i + 1}
              </p>
              <h3 className="mb-2 text-base font-semibold">{mod.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {mod.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section className="py-16">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
          Pricing
        </h2>
        <p className="mb-10 text-3xl font-bold tracking-tight">
          Choose your path
        </p>
        <div className="grid gap-6 lg:grid-cols-3">
          {courseConfig.tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border p-8 ${
                tier.highlighted
                  ? "border-accent bg-card shadow-lg shadow-accent/5"
                  : "border-border bg-card"
              }`}
            >
              {tier.highlighted && (
                <p className="mb-4 font-mono text-xs text-accent uppercase">
                  Most Popular
                </p>
              )}
              <h3 className="mb-1 text-lg font-semibold">{tier.name}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {tier.description}
              </p>
              <p className="mb-6 text-4xl font-bold">
                ${tier.price}
                <span className="text-base font-normal text-muted-foreground">
                  {" "}
                  USD
                </span>
              </p>
              <ul className="mb-8 space-y-2">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={getCheckoutUrl(tier.variantId)}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all ${
                  tier.highlighted
                    ? "bg-accent text-accent-foreground hover:opacity-90"
                    : "bg-foreground text-background hover:opacity-90"
                }`}
              >
                Get Started
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* About Instructor */}
      <Section className="py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[200px_1fr]">
          <div className="aspect-square relative overflow-hidden rounded-2xl border border-border bg-muted">
            <Image
              src="/headshot.jpg"
              alt="Ethan Stuart"
              fill
              className="object-cover object-top"
              sizes="200px"
            />
          </div>
          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
              Your Instructor
            </h2>
            <h3 className="mb-4 text-2xl font-bold">Ethan Stuart</h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              Product & technology leader at Disney Studios who builds his own
              products. I shipped DashPulse (a real-time dashboard) and a
              family meal planner — both built with AI coding tools. I lead AI
              strategy for Disney Studios and drive AI enablement for
              non-engineering roles. This course is what I wish existed when I
              started building.
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="py-16">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
          FAQ
        </h2>
        <p className="mb-10 text-3xl font-bold tracking-tight">
          Common questions
        </p>
        <div className="max-w-2xl">
          <FaqAccordion items={courseConfig.faq} />
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="py-24">
        <div className="rounded-3xl border border-border bg-card p-10 text-center sm:p-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to start building?
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
            Join the waitlist and be the first to know when the course launches.
            Early supporters get a discount.
          </p>
          <WaitlistForm />
        </div>
      </Section>
    </>
  );
}
