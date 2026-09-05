import Link from "next/link";
import { FocusIn } from "@/components/motion";
import { Section } from "@/components/section";
import { Register, Legend } from "@/components/register";
import { Strip, Method, OperatingRecord, Track } from "@/components/blocks";
import { LiveIndicators } from "@/components/live-indicators";
import { JsonLd } from "@/components/json-ld";
import { PROJECTS, siteConfig } from "@/lib/constants";
import { getPersonJsonLd, getWebSiteJsonLd } from "@/lib/jsonld";

/**
 * The home page is a static deployment artifact — never a time-based ISR entry.
 * Its content changes only when the code does, so it must be invalidated by the
 * deploy and nothing else. Do not add a fetch with `next: { revalidate }` to
 * this tree; one such fetch turns the whole page into a stale-servable cache
 * entry and a deploy stops being the thing that ships it.
 */
export const revalidate = false;

export default function Home() {
  return (
    <>
      <JsonLd data={getPersonJsonLd()} />
      <JsonLd data={getWebSiteJsonLd()} />

      <div className="wrap">
        <div className="pb-[clamp(34px,5vw,56px)] pt-[clamp(52px,8vw,104px)]">
          <FocusIn delay={0}>
            <span className="eyebrow mb-6 block">
              Los Angeles · Data &amp; AI Product Leadership
            </span>
          </FocusIn>
          <FocusIn delay={0.12}>
          <h1 className="mb-6 max-w-[21ch] font-display text-[clamp(29px,4.3vw,51px)] leading-[1.14] tracking-[-0.017em]">
            I run an AI-native product organization at Disney. I run{" "}
            <em className="italic text-accent">one for myself</em> too.
          </h1>
          </FocusIn>
          <FocusIn delay={0.26}>
          <p className="max-w-[58ch] text-[17.5px] leading-[1.6] text-ink-soft">
            <strong className="font-medium text-ink">
              Senior Manager, Data Products and BI Engineering at Disney
              Studios
            </strong>{" "}
            — a matrixed data and AI product engineering organization running
            enterprise-wide across the studios. Nights and weekends, the same
            operating model runs a household-software practice where I&apos;m the
            only human on the team.
          </p>
          </FocusIn>
        </div>

        <FocusIn delay={0.4}>
          <Strip />
          <LiveIndicators />
        </FocusIn>

        <Section
          id="work"
          title="Selected work"
          aside="Status is literal"
          note={
            <>
              Built independently, outside the day job.{" "}
              <strong className="font-medium text-ink">Live</strong> means a
              stranger can use it today,{" "}
              <strong className="font-medium text-ink">Invite</strong> means real
              users behind a gate,{" "}
              <strong className="font-medium text-ink">In Development</strong>{" "}
              means not yet in anyone&apos;s hands. Nothing here is aspirational.
            </>
          }
        >
          <Legend />
          <Register projects={PROJECTS} />
        </Section>

        <Section
          id="method"
          title="How the work gets made"
          aside="The actual differentiator"
          note="Most product leaders can describe an AI-native operating model. This one runs on two: a full product organization at Disney, and a one-person practice at home. Same primitives, different scale — and every product above is evidence for the claim."
        >
          <Method />
        </Section>

        <Section
          id="record"
          title="Operating record"
          aside="Sourced, not asserted"
          note="Every figure carries its measurement method. If it can't be sourced, it isn't here."
        >
          <OperatingRecord />
        </Section>

        <Section
          id="track"
          title="Track"
          aside="2016 — present"
          note="Investment analysis into business intelligence into data products into AI product leadership. The domain kept changing; the work of turning messy data into something people trust did not."
        >
          <Track />
        </Section>

        <section className="py-[clamp(50px,6.5vw,82px)]">
          <div className="grid grid-cols-2 border-t border-rule-strong max-[720px]:grid-cols-1">
            <div className="pb-8 pr-7 pt-[30px] max-[720px]:pr-0">
              <span className="eyebrow">Writing</span>
              <p className="my-3.5 font-display text-[21px] leading-[1.35] tracking-[-0.01em]">
                The Data Product Agent
              </p>
              <p className="text-[15px] text-ink-soft">
                Long-form work on data products, AI-native team operating models,
                multi-agent systems, and building enterprise software through AI
                coding tools.
              </p>
              <Link href="/writing" className="cta mt-4">
                Read the newsletter
              </Link>
            </div>
            <div
              id="contact"
              className="border-l border-rule pb-8 pl-7 pt-[30px] max-[720px]:border-l-0 max-[720px]:border-t max-[720px]:pl-0"
            >
              <span className="eyebrow">Contact</span>
              <p className="my-3.5 font-display text-[21px] leading-[1.35] tracking-[-0.01em]">
                Open to Director and VP roles in AI product leadership.
              </p>
              <p className="text-[15px] text-ink-soft">
                Teams building where data and AI actually become products — and
                where the person leading it is expected to understand what&apos;s
                underneath.
              </p>
              <a href={`mailto:${siteConfig.links.email}`} className="cta mt-4">
                {siteConfig.links.email}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
