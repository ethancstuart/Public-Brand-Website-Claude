import Link from "next/link";
import Image from "next/image";

export function NexusWatchContent() {
  return (
    <div className="brand-page ">
      <div className="project-opening">
        <section className="wrap project-hero">
          <div>
            <p className="section-label">
              {"NexusWatch"}
            </p>
            <h1>
              {"A forecast should hold up "}
              <br />
              {"when you question it."}
            </h1>
            <p className="project-deck">
              {"NexusWatch records forecasts before the outcome and assesses them against external evidence. I want people to be able to see what was predicted, what happened, and whether the assessment deserves their trust."}
            </p>
            <div className="chapter-links">
              <a className="text-link" href="#corrections">
                {"A decision behind the product ↓"}
              </a>
              <a className="text-link" href="https://nexuswatch.dev/ledger" target="_blank" rel="noopener noreferrer">
                {"Explore the public ledger ↗"}
              </a>
            </div>
          </div>
          <aside className="project-facts">
            <p className="fact-label">
              {"The product"}
            </p>
            <p>
              {"A public forecasting ledger."}
            </p>
            <p className="fact-label">
              {"What I’m working through"}
            </p>
            <p>
              {"Trustworthy evidence."}
              <br />
              {"Testable results."}
              <br />
              {"Visible corrections."}
            </p>
            <p className="fact-note">
              {"A record people can question, including when the system gets something wrong."}
            </p>
          </aside>
        </section>
      </div>
      <figure className="wrap ledger-capture">
        <div className="capture-heading">
          <span>
            {"NexusWatch · The public ledger"}
          </span>
          <span>
            {"Product capture"}
          </span>
        </div>
        <Image src="/brand/nexus-screen.jpg" width={1440} height={900} alt="NexusWatch’s calibration view compares stated forecast probabilities with observed frequencies." sizes="(max-width: 760px) 90vw, 1100px" />
        <figcaption>
          {"Product capture from November 2026. Shown to explain the experience, not as a current performance claim."}
        </figcaption>
      </figure>
      <section className="leadership-chapter wrap">
        <div className="chapter-label">
          <p>
            {"Why it matters"}
          </p>
        </div>
        <div className="chapter-body">
          <h2>
            {"The result is only useful if the assessment holds up."}
          </h2>
          <p>
            {"If you’re deciding whether to trust a forecasting system, an accuracy number isn’t enough. You need to see what it predicted, how the results were assessed, and what is still unresolved. That’s what I want the ledger to make easier to judge."}
          </p>
          <p>
            {"But using an external source doesn’t settle everything. The evidence has to cover the right period, mean what we think it means, and be sufficient to support the conclusion."}
          </p>
        </div>
      </section>
      <div className="ai-chapter-band">
        <section className="leadership-chapter wrap" id="corrections">
          <div className="chapter-label">
            <p>
              {"Working through a problem"}
            </p>
          </div>
          <div className="chapter-body">
            <h2>
              {"The evidence changed. The record needed to show that."}
            </h2>
            <p>
              {"While building NexusWatch with AI tools, I kept questioning whether the evidence justified the results we were publishing. Working through that exposed problems in how observations were collected and forecasts were assessed."}
            </p>
            <p>
              {"Some assessments were based on incomplete evidence. A forecast could look wrong even though the fuller record supported it. Fixing the assessment mattered, but so did deciding what someone should see when a published result changed."}
            </p>
            <p>
              {"I challenged the explanations and proposed fixes, and helped decide how to handle the corrections: keep the original verdict visible, show the corrected result alongside it, and explain what changed."}
            </p>
          </div>
        </section>
      </div>
      <figure className="wrap correction-example">
        <p className="section-label">
          {"How a correction is represented"}
        </p>
        <div className="correction-grid">
          <div>
            <span className="diagram-label">
              {"Original verdict"}
            </span>
            <strong>
              {"Miss"}
            </strong>
            <p>
              {"Keep what was published."}
            </p>
          </div>
          <div>
            <span className="diagram-label">
              {"Corrected reading"}
            </span>
            <strong>
              {"Hit"}
            </strong>
            <p>
              {"Show what the fuller evidence supports."}
            </p>
          </div>
          <div>
            <span className="diagram-label">
              {"Explanation"}
            </span>
            <strong>
              {"What changed"}
            </strong>
            <p>
              {"Attach the reason to the forecast itself."}
            </p>
          </div>
        </div>
        <figcaption>
          {"Schematic of the documented correction pattern—not an individual forecast or a live product screen."}
        </figcaption>
      </figure>
      <section className="leadership-chapter wrap">
        <div className="chapter-label">
          <p>
            {"The judgment behind it"}
          </p>
        </div>
        <div className="chapter-body">
          <h2>
            {"“We don’t know” has to remain a possible answer."}
          </h2>
          <p>
            {"If the system hasn’t collected enough evidence, a missing event shouldn’t automatically become a failed forecast. The resolution rules now check coverage and allow time for late evidence. Calls that can’t be assessed remain visible without being counted as misses."}
          </p>
          <p>
            {"This work involved repeated reviews and revisions with AI. I kept pushing on the evidence, the reasoning, and what we should show people, while working through the investigation and implementation with AI tools."}
          </p>
          <p>
            {"Better assessment doesn’t, by itself, mean better forecasts. It gives us a more useful way to find out whether the forecasting approach is working."}
          </p>
          <details className="source-detail">
            <summary>
              {"A little more on the implementation"}
            </summary>
            <div className="detail-copy">
              <p>
                {"In one case, the system was storing an hour’s observations as though they represented a whole day. In another, it assessed a forecast before the final day’s evidence had arrived. The collection fix requests daily observations explicitly. The resolution logic checks that final-day evidence is available before recording a miss. Corrections are stored alongside the original verdict and returned with the forecast, so the explanation can travel with the result."}
              </p>
              <p>
                {"This account describes the work recorded in the project’s August–September 2026 history."}
              </p>
            </div>
          </details>
        </div>
      </section>
      <section className="project-invitation wrap" id="conversation" aria-labelledby="conversation-title">
        <div>
          <h2 id="conversation-title">
            {"Working on a similar problem?"}
          </h2>
          <p>
            {"If you’re building a product where people need to trust the evidence and AI outputs, I’d like to compare notes."}
          </p>
        </div>
        <a className="text-link" href="mailto:ethan.c.stuart@gmail.com?subject=NexusWatch%20and%20trustworthy%20AI%20products">
          {"Compare notes "}
          <span aria-hidden="true">
            {"↗"}
          </span>
        </a>
      </section>
      <nav className="next-project wrap" aria-label="More work">
        <div>
          <p className="section-label">
            {"Keep exploring"}
          </p>
          <Link href="/portfolio/product-os">
            {"Product OS "}
            <span aria-hidden="true">
              {"→"}
            </span>
          </Link>
          <p>
            {"Keeping product reasoning available during AI-assisted development."}
          </p>
        </div>
        <Link className="text-link" href="/#work">
          {"All projects"}
        </Link>
      </nav>
    </div>
  );
}
