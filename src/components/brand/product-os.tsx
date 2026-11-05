import Link from "next/link";

export function ProductOSContent() {
  return (
    <div className="brand-page ">
      <div className="project-opening">
        <section className="wrap project-hero">
          <div>
            <p className="section-label">
              {"Product OS"}
            </p>
            <h1>
              {"Keep the reasoning connected "}
              <br />
              {"to what gets built."}
            </h1>
            <p className="project-deck">
              {"I want product people to own more of the problem—from deciding what matters to building and testing ideas. AI makes more of that possible, but people still need the context and judgment to make good decisions."}
            </p>
            <p className="project-deck">
              {"I’m building Product OS around something I keep running into myself: keeping the strategy, reasoning, and decisions connected as I move into building. I use it in my own work today, and that experience is shaping what I’m building for other product teams."}
            </p>
            <div className="chapter-links">
              <a className="text-link" href="#context-example">
                {"See the approach ↓"}
              </a>
              <a className="text-link" href="#decision">
                {"Why I built it this way ↓"}
              </a>
            </div>
          </div>
          <aside className="project-facts">
            <p className="fact-label">
              {"Where it stands"}
            </p>
            <p>
              {"In use in my own work."}
              <br />
              {"Still evolving."}
            </p>
            <p className="fact-note">
              {"I’m developing it with other product teams in mind. It needs more work before they can use it independently."}
            </p>
            <p className="fact-label">
              {"Working source"}
            </p>
            <p>
              {"Product OS / product.md"}
            </p>
          </aside>
        </section>
      </div>
      <figure className="wrap context-example" id="context-example">
        <div className="context-request">
          <span className="diagram-label">
            {"Working on a feature"}
          </span>
          <code>
            {"get_product_context({ scope: 'auth' })"}
          </code>
          <p>
            {"Bring the relevant material into the task."}
          </p>
        </div>
        <div className="context-materials">
          <div>
            <span className="diagram-label">
              {"Feature specification"}
            </span>
            <h2>
              {"What we’re building"}
            </h2>
            <p>
              {"The authentication feature’s intent and requirements."}
            </p>
          </div>
          <div>
            <span className="diagram-label">
              {"Associated decisions"}
            </span>
            <h2>
              {"Why we chose it"}
            </h2>
            <p>
              {"Decision records that mention this feature."}
            </p>
          </div>
          <div>
            <span className="diagram-label">
              {"Related specifications"}
            </span>
            <h2>
              {"How it fits"}
            </h2>
            <p>
              {"Connected work, such as the user-events specification."}
            </p>
          </div>
        </div>
        <figcaption>
          {"Explanation of the implemented context tool. Authentication and user events come from test examples; this is not a recorded customer session or a product interface."}
        </figcaption>
      </figure>
      <section className="leadership-chapter wrap">
        <div className="chapter-label">
          <p>
            {"The problem"}
          </p>
        </div>
        <div className="chapter-body">
          <h2>
            {"The reasoning can get lost between deciding and building."}
          </h2>
          <p>
            {"As I build, I want to keep track of why I’m doing something—not just what needs to get done. Decisions get made along the way, and a feature rarely exists on its own."}
          </p>
          <p>
            {"Keeping those things connected helps me give AI better context and move into implementation without losing sight of what I’m trying to accomplish. That’s the problem Product OS grows out of."}
          </p>
        </div>
      </section>
      <div className="ai-chapter-band">
        <section className="leadership-chapter wrap" id="decision">
          <div className="chapter-label">
            <p>
              {"A decision in the product"}
            </p>
          </div>
          <div className="chapter-body">
            <h2>
              {"Bring the reasoning with the feature."}
            </h2>
            <p>
              {"I wanted the relevant decisions to come into the task with the feature specification. If the feature depends on another part of the product, that context should be available too."}
            </p>
            <p>
              {"That choice appears in the design and carries through into the context tool: ask for a feature, and it retrieves the specification, decision records that mention it, and related specifications."}
            </p>
            <p>
              {"The point is to keep earlier reasoning useful as the work becomes more detailed. People should be able to take ownership with a clear understanding of what they’re trying to accomplish."}
            </p>
          </div>
        </section>
      </div>
      <section className="leadership-chapter wrap">
        <div className="chapter-label">
          <p>
            {"Another part of the approach"}
          </p>
        </div>
        <div className="chapter-body">
          <h2>
            {"Make a change in direction an intentional decision."}
          </h2>
          <p>
            {"Product OS also has a check for proposed work that conflicts with a specification’s constraints or what’s been left out of scope. It can surface the conflict before implementation, so a person can decide whether the direction should change."}
          </p>
          <div className="scope-example">
            <p className="diagram-label">
              {"Illustrative test from the project"}
            </p>
            <p>
              <strong>
                {"Recorded scope:"}
              </strong>
              {" real-time personalization is deferred."}
            </p>
            <p>
              <strong>
                {"Proposed work:"}
              </strong>
              {" add real-time personalization."}
            </p>
            <p>
              <strong>
                {"Response:"}
              </strong>
              {" flag the conflict and ask whether the scope should change."}
            </p>
          </div>
          <p>
            {"This is advisory. It depends on the context being present and the agent consulting it; it doesn’t guarantee that every change will follow the plan."}
          </p>
        </div>
      </section>
      <section className="leadership-chapter wrap">
        <div className="chapter-label">
          <p>
            {"Where I’m taking it"}
          </p>
        </div>
        <div className="chapter-body">
          <h2>
            {"More ownership, with the context to make good decisions."}
          </h2>
          <p>
            {"I want product teams to do more of the building and testing themselves. That makes shared strategy and clear decisions more important, especially when AI helps people move quickly."}
          </p>
          <p>
            {"Product OS is still developing through my own use. The context tools and checks give me something concrete to work with. I’m still learning what other teams would need to make it useful in their own practice."}
          </p>
          <Link className="text-link" href="/leadership#ai">
            {"How this connects to my leadership approach →"}
          </Link>
        </div>
      </section>
      <section className="project-invitation wrap" id="conversation" aria-labelledby="conversation-title">
        <div>
          <h2 id="conversation-title">
            {"Building a product organization?"}
          </h2>
          <p>
            {"If you’re looking for someone to lead product strategy, help people take more ownership, and rethink how the team builds with AI, I’d like to talk."}
          </p>
        </div>
        <a className="text-link" href="mailto:ethan.c.stuart@gmail.com?subject=Product%20leadership">
          {"Talk about product leadership "}
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
          <Link href="/portfolio/allisons-kitchen">
            {"Allison’s Kitchen "}
            <span aria-hidden="true">
              {"→"}
            </span>
          </Link>
          <p>
            {"A product and business growing out of everyday household life."}
          </p>
        </div>
        <Link className="text-link" href="/#work">
          {"All projects"}
        </Link>
      </nav>
    </div>
  );
}
