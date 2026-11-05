import Link from "next/link";

export function LeadershipContent() {
  return (
    <div className="brand-page ">
      <div className="leadership-opening">
        <section className="wrap leadership-hero" aria-labelledby="page-title">
          <p className="section-label">
            {"Leadership"}
          </p>
          <h1 id="page-title">
            {"I helped turn separate business needs into a shared platform strategy."}
          </h1>
          <p className="leadership-deck">
            {"At Disney Studios, teams needed useful tools quickly. For the data and AI/ML platform, I helped decide what we could deliver first and what we could build once for several products to use."}
          </p>
          <nav className="page-index" aria-label="On this page">
            <a href="#disney">
              {"Disney"}
            </a>
            <a href="#yum">
              {"Yum / Taco Bell"}
            </a>
            <a href="#people">
              {"Developing people"}
            </a>
            <a href="#ai">
              {"Working with AI"}
            </a>
            <a href="#contact">
              {"The work I want to lead"}
            </a>
          </nav>
        </section>
      </div>
      <section className="leadership-chapter wrap" id="disney" aria-labelledby="disney-title">
        <div className="chapter-label">
          <p>
            {"Disney"}
          </p>
          <span>
            {"Product function & portfolio"}
          </span>
        </div>
        <div className="chapter-body">
          <h2 id="disney-title">
            {"Deciding what to build first."}
          </h2>
          <p>
            {"I established the product function for Disney Studios’ data and AI/ML platform. I directly lead a multidisciplinary team and own strategy for the platform’s product portfolio, working with teams across the organization."}
          </p>
          <div className="leadership-change">
            <h3>
              {"We delivered useful pieces in phases."}
            </h3>
            <p>
              {"In some areas, I helped shape the business priorities. In others, I turned broader goals into product direction. We sequenced the work so teams could start using what we built early, doing the foundational work first where later products depended on it."}
            </p>
          </div>
          <div className="leadership-change">
            <h3>
              {"Shared capabilities helped us meet more needs."}
            </h3>
            <p>
              {"The products brought information together for leaders and business teams to use in their decisions. As the platform grew, we could meet more needs without rebuilding the same foundations."}
            </p>
          </div>
          <div className="leadership-change">
            <h3>
              {"Product owners made more decisions themselves."}
            </h3>
            <p>
              {"With clearer responsibility and a shared strategy, owners had more room to shape their roadmaps and priorities. It became easier to explain our priorities and push back on requests that didn’t fit. Those changes helped make delivery faster and more predictable."}
            </p>
          </div>
          <p className="portfolio-note">
            {"I stayed involved in major commitments and decisions that affected the wider portfolio."}
          </p>
        </div>
      </section>
      <section className="leadership-chapter wrap" id="yum" aria-labelledby="yum-title">
        <div className="chapter-label">
          <p>
            {"Yum / Taco Bell"}
          </p>
          <span>
            {"Customer platform"}
          </span>
        </div>
        <div className="chapter-body">
          <h2 id="yum-title">
            {"Shared customer information supported more ways to reach and retain people."}
          </h2>
          <p>
            {"The customer data platform was already in place. I established its product function and led work that helped the business use that foundation for targeting, personalization, retention, and reactivation."}
          </p>
          <div className="leadership-change">
            <h3>
              {"Business needs shaped what we built next."}
            </h3>
            <p>
              {"Those needs drew on the same customer foundation. Starting there gave the team a reason to build each capability and a basis for deciding what should come next."}
            </p>
          </div>
          <div className="leadership-change">
            <h3>
              {"The platform contributed to broader growth efforts."}
            </h3>
            <p>
              {"It supported work to reach people more effectively, personalize their experience, and bring them back. The platform was one part of the broader work behind growth in active loyalty membership at Taco Bell."}
            </p>
          </div>
        </div>
      </section>
      <section className="leadership-chapter wrap" id="people" aria-labelledby="people-title">
        <div className="chapter-label">
          <p>
            {"People & ownership"}
          </p>
          <span>
            {"How I lead"}
          </span>
        </div>
        <div className="chapter-body">
          <h2 id="people-title">
            {"Helping people take more ownership."}
          </h2>
          <p>
            {"I enjoy helping experienced people take on more responsibility. At Disney, that meant talking through difficult decisions and backing people with stakeholders as they took on more responsibility."}
          </p>
          <p>
            {"I want people to shape their roadmaps and priorities within a shared strategy. When a product needs direction or someone to own it, I’m willing to step in, figure it out, and help someone else take it forward. I’ll stay involved where it makes sense."}
          </p>
        </div>
      </section>
      <div className="ai-chapter-band">
        <section className="leadership-chapter wrap" id="ai" aria-labelledby="ai-title">
          <div className="chapter-label">
            <p>
              {"AI & building"}
            </p>
            <span>
              {"What I’m putting into practice"}
            </span>
          </div>
          <div className="chapter-body">
            <h2 id="ai-title">
              {"AI should let people own more of the problem."}
            </h2>
            <p>
              {"I want product people to build and test ideas themselves, and contribute to the actual product where it makes sense. People won’t all have the same technical skills. I care more about their judgment and the quality of the work."}
            </p>
            <p>
              {"In my own work, I use "}
              <Link href="/portfolio/product-os">
                {"Product OS"}
              </Link>
              {" to bring earlier decisions into AI-assisted work. A request about sign-in, for example, can pull in the feature spec, the decisions that mention it, and related specs. That helps me check what the AI proposes against what I set out to build."}
            </p>
            <p>
              {"I want teams to have that kind of context so they can take an idea further and judge the result for themselves. I’ve brought some of what I’ve learned with AI into how my team works. Staying close to that work helps me see where to invest and what needs to change."}
            </p>
            <div className="chapter-links">
              <Link className="text-link" href="/#work">
                {"What I’m building"}
              </Link>
              <Link className="text-link" href="/writing/the-middle-of-product-management">
                {"More on how product roles are changing"}
              </Link>
            </div>
          </div>
        </section>
      </div>
      <section className="leadership-chapter wrap leadership-contact" id="contact" aria-labelledby="contact-title">
        <div className="chapter-label">
          <p>
            {"What’s next"}
          </p>
        </div>
        <div className="chapter-body">
          <h2 id="contact-title">
            {"The work I want to lead."}
          </h2>
          <p>
            {"I want to build and lead a product organization. I care about the people I’ll work with, what we’re trying to do, and whether I’ll have the authority to make the decisions the role calls for. I want to own the results and stay close to the product and customers."}
          </p>
          <p>
            {"If that’s the kind of role you’re looking to fill, I’d like to talk."}
          </p>
          <a className="email-link" href="mailto:ethan.c.stuart@gmail.com">
            {"ethan.c.stuart@gmail.com"}
          </a>
        </div>
      </section>
    </div>
  );
}
