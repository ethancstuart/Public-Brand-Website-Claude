import Link from "next/link";
import Image from "next/image";
import { KitchenCollection } from "./kitchen-collection";

export function HomeContent() {
  return (
    <div className="brand-page ">
      <div className="hero-band">
        <section className="hero wrap" aria-labelledby="intro-title">
          <p className="greeting">
            {"I’m Ethan."}
          </p>
          <h1 id="intro-title">
            {"I lead product strategy, build strong teams, and take responsibility for the results. "}
            <span className="venture-line">
              {"I’m also building Allison’s Kitchen."}
            </span>
          </h1>
          <p className="intro">
            {"At Disney Studios, I established the product function for the data and AI/ML platform. I directly lead a multidisciplinary team and own strategy for the platform’s broader product portfolio, working with teams across the organization. Clearer ownership helped product owners make more decisions independently, while shared capabilities helped us meet more business needs without starting from scratch."}
          </p>
          <div className="intro-links">
            <a className="primary-link" href="#leadership">
              {"Explore my work "}
              <span aria-hidden="true">
                {"↓"}
              </span>
            </a>
            <a className="text-link" href="#contact">
              {"Get in touch"}
            </a>
          </div>
          <figure className="portrait">
            <Image src="/brand/ethan-portrait.jpg" width={1688} height={1547} alt="Ethan smiling outdoors, in a blue shirt" sizes="(max-width: 760px) 130px, 330px" priority />
          </figure>
        </section>
      </div>
      <section className="leadership wrap" id="leadership" aria-labelledby="leadership-title">
        <div className="section-intro">
          <p className="section-label">
            {"How I lead"}
          </p>
          <h2 id="leadership-title">
            {"How I’ve put that into practice."}
          </h2>
          <p className="leadership-view">
            <Link className="text-link" href="/leadership">
              {"More about my leadership work →"}
            </Link>
          </p>
        </div>
        <article className="career-story">
          <h3>
            {"Disney Studios"}
          </h3>
          <p className="context">
            {"Data and AI/ML platform"}
          </p>
          <p>
            <strong>
              {"Our products brought information together to help leaders and business teams make better decisions."}
            </strong>
            {" I coached product owners through tradeoffs and backed their decisions as they took on more responsibility for their roadmaps."}
          </p>
          <Link className="text-link" href="/leadership#disney">
            {"What changed at Disney →"}
          </Link>
        </article>
        <article className="career-story">
          <h3>
            {"Yum / Taco Bell"}
          </h3>
          <p className="context">
            {"Customer platform and business growth"}
          </p>
          <p>
            <strong>
              {"I established the product function around an existing customer platform."}
            </strong>
            {" I led work that helped the business use shared customer information for targeting, personalization, retention, and reactivation. Those needs shaped what we built next."}
          </p>
          <Link className="text-link" href="/leadership#yum">
            {"How it supported the business →"}
          </Link>
        </article>
      </section>
      <section className="work wrap" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <h2 id="work-title">
            {"What I’m building."}
          </h2>
        </div>
        <article className="kitchen-feature kitchen-home-intro">
          <div className="project-copy">
            <p className="project-name">
              {"Allison’s Kitchen"}
            </p>
            <h3>
              {"Plan meals, get groceries, and share your kitchen."}
            </h3>
            <p>
              {"I started Kitchen to make meals easier for our household. I’m building it into a business for other families, too."}
            </p>
            <p>
              {"Explore what people you know actually cook. Save a recipe to your kitchen, add it to the week’s plan, and get a grocery list your household can use together. Share individual recipes or the whole kitchen you’ve put together."}
            </p>
            <p className="project-status">
              <span className="status-dot" aria-hidden="true">

              </span>
              {"Released on iOS. Inviting selected households."}
            </p>
            <Link className="text-link" href="/portfolio/allisons-kitchen">
              {"The product and the business →"}
            </Link>
          </div>
          <figure className="kitchen-visual kitchen-sharing-visual family-kitchen-concept" id="kitchen-sharing">
            <div className="kitchen-journey">
              <div className="shared-kitchen-view">
                <p className="visual-step">
                  {"Explore a kitchen"}
                </p>
                <KitchenCollection />
              </div>
              <div className="household-plan-view">
                <p className="visual-step">
                  {"Bring it into your week"}
                </p>
                <div className="example-plan homepage-plan">
                  <p className="plan-eyebrow">
                    {"Example plan"}
                  </p>
                  <h4>
                    {"Monday’s dinner"}
                  </h4>
                  <div className="planned-dish featured-plan">
                    <Image src="/brand/family-pastina.webp" alt="" loading="lazy" width={300} height={400} sizes="(max-width: 760px) 90vw, 600px" />
                    <div>
                      <p>
                        {"Pastina al Limone with Crispy Chicken Cutlets"}
                      </p>
                      <span className="plan-source">
                        {"Saved from the Stuart kitchen"}
                      </span>
                    </div>
                  </div>
                  <p className="plan-groceries">
                    {"Ingredients on the grocery list."}
                    <br />
                    {" Ready for your household."}
                  </p>
                </div>
              </div>
            </div>
            <figcaption>
              {"Presentation concept using recipes and images from our public kitchen, with an example meal plan."}
            </figcaption>
          </figure>
        </article>
        <div className="project-pair">
          <article className="secondary-project nexus-project">
            <div className="secondary-copy">
              <p className="project-name">
                {"NexusWatch"}
              </p>
              <h3>
                {"Making forecasts you can check."}
              </h3>
              <p>
                {"NexusWatch records forecasts and assesses them against external evidence. Working through it with AI has meant challenging the evidence, revisiting proposed fixes, and deciding how to correct the record when the assessment was wrong."}
              </p>
              <Link className="text-link" href="/portfolio/nexuswatch">
                {"The product and a decision behind it →"}
              </Link>
            </div>
            <Link className="visual-link" href="/portfolio/nexuswatch" aria-label="Read about NexusWatch">
              <figure className="evidence-preview correction-preview">
                <div className="preview-heading">
                  <span>
                    {"NexusWatch"}
                  </span>
                  <span>
                    {"A rule in the working project"}
                  </span>
                </div>
                <div className="preview-content">
                  <p className="preview-label">
                    {"From the correction script"}
                  </p>
                  <blockquote>
                    {"“A resolved call is never rewritten.”"}
                  </blockquote>
                  <p className="source-excerpt">
                    {"“each affected call keeps the verdict it was published with, and carries the corrected reading beside it”"}
                  </p>
                  <div className="correction-reading" aria-label="How the correction is explained">
                    <div>
                      <span>
                        {"Original verdict"}
                      </span>
                      <strong>
                        {"Keep the record"}
                      </strong>
                    </div>
                    <div>
                      <span>
                        {"Corrected reading"}
                      </span>
                      <strong>
                        {"Show the evidence"}
                      </strong>
                    </div>
                    <div>
                      <span>
                        {"Explanation"}
                      </span>
                      <strong>
                        {"Say what changed"}
                      </strong>
                    </div>
                  </div>
                </div>
                <figcaption>
                  {"Source excerpts · September 2026. Annotations explain the rule; this is not a live forecast."}
                </figcaption>
              </figure>
            </Link>
          </article>
          <article className="secondary-project os-project">
            <div className="secondary-copy">
              <p className="project-name">
                {"Product OS"}
              </p>
              <h3>
                {"Keeping track of why we’re building something."}
              </h3>
              <p>
                {"I’m building Product OS to keep reasoning and decisions connected as we build. It brings relevant context into AI-assisted work so a feature’s purpose and its place in the broader product stay in view."}
              </p>
              <p className="quiet-status">
                {"In use in my own work. Still evolving before wider use."}
              </p>
              <Link className="text-link" href="/portfolio/product-os">
                {"See the approach →"}
              </Link>
            </div>
            <Link className="visual-link" href="/portfolio/product-os" aria-label="Read about Product OS">
              <figure className="evidence-preview context-preview">
                <div className="preview-heading">
                  <span>
                    {"Product OS"}
                  </span>
                  <span>
                    {"From a design choice to a tool"}
                  </span>
                </div>
                <div className="preview-content">
                  <p className="preview-label">
                    {"A scoped request from the design"}
                  </p>
                  <code className="context-invocation">
                    {"get_product_context({ scope: 'auth' })"}
                  </code>
                  <p className="context-annotation">
                    {"Bring the reasoning with the feature."}
                  </p>
                  <dl className="context-returns">
                    <div>
                      <dt>
                        {"What we’re building"}
                      </dt>
                      <dd>
                        {"The feature specification"}
                      </dd>
                    </div>
                    <div>
                      <dt>
                        {"Why we chose it"}
                      </dt>
                      <dd>
                        {"Decision records mentioning "}
                        <code>
                          {"auth"}
                        </code>
                      </dd>
                    </div>
                    <div>
                      <dt>
                        {"How it fits"}
                      </dt>
                      <dd>
                        {"Related specifications"}
                      </dd>
                    </div>
                  </dl>
                </div>
                <figcaption>
                  {"Design excerpt · April 2026. Annotations describe the implementation; "}
                  <code>
                    {"auth"}
                  </code>
                  {" is example content."}
                </figcaption>
              </figure>
            </Link>
          </article>
        </div>
        <details className="more-work">
          <summary>
            <span>
              {"More work and experiments"}
            </span>
            <span className="more-names">
              {"Altogether, The Composer, Prototype Studio"}
            </span>
          </summary>
          <div className="more-work-body">
            <article>
              <h3>
                {"Altogether"}
              </h3>
              <p>
                {"Planning shared trips across households. In development."}
              </p>
              <a href="https://longtable.dev" target="_blank" rel="noopener noreferrer">
                {"Explore Altogether"}
              </a>
            </article>
            <article>
              <h3>
                {"The Composer"}
              </h3>
              <p>
                {"Exploring how an AI-assisted product organization can structure its work. In development."}
              </p>
            </article>
            <article>
              <h3>
                {"Prototype Studio"}
              </h3>
              <p>
                {"Earlier work on working sessions, guides and agent-system setup. Public deployment currently paused."}
              </p>
            </article>
          </div>
        </details>
      </section>
      <section className="writing-section" id="writing" aria-labelledby="writing-title">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <p className="section-label">
                {"Writing"}
              </p>
              <h2 id="writing-title">
                {"What I’m thinking about."}
              </h2>
            </div>
            <a className="text-link" href="https://thedataproductagent.substack.com/" target="_blank" rel="noopener noreferrer">
              {"All writing on Substack"}
            </a>
          </div>
          <div className="essays">
            <article>
              <p className="essay-topic">
                {"Leadership and organizational change"}
              </p>
              <h3>
                <Link href="/writing/workflow-is-the-real-unit-of-organizational">
                  {"Workflow Is the Real Unit of Organizational Transformation"}
                </Link>
              </h3>
              <p>
                {"Changing how an organization works means working through ownership, incentives, and how decisions get made. I write about what it takes to put a strategy into practice."}
              </p>
              <Link className="text-link" href="/writing/workflow-is-the-real-unit-of-organizational">
                {"Read the essay"}
              </Link>
            </article>
            <article>
              <p className="essay-topic">
                {"Judgment and building"}
              </p>
              <h3>
                <Link href="/writing/nearly-everyone-can-ship-now">
                  {"Nearly Everyone Can Ship Now"}
                </Link>
              </h3>
              <p>
                {"I changed what I screen for in product managers. This is why I put more weight on whether someone can specify the work, define a quality bar, and understand how the product fits together."}
              </p>
              <Link className="text-link" href="/writing/nearly-everyone-can-ship-now">
                {"Read the essay"}
              </Link>
            </article>
          </div>
        </div>
      </section>
      <section className="personal wrap" id="about" aria-labelledby="personal-title">
        <div>
          <p className="section-label">
            {"A little more about me"}
          </p>
          <h2 id="personal-title">
            {"Outside work."}
          </h2>
        </div>
        <div className="personal-copy">
          <p>
            {"Family is a big part of my life. I enjoy landscaping and projects around the house, smoking and BBQ, and working on my X5. Sometimes I’m fixing or improving something; sometimes I’m just curious and want to figure it out."}
          </p>
          <Link className="text-link about-link" href="/about">
            {"More about me →"}
          </Link>
          <div className="interests" aria-label="Personal interests">
            <span>
              {"Family"}
            </span>
            <span>
              {"Cooking"}
            </span>
            <span>
              {"Home projects"}
            </span>
            <span>
              {"Cars"}
            </span>
            <span>
              {"Learning"}
            </span>
          </div>
        </div>
      </section>
      <section className="contact wrap" id="contact" aria-labelledby="contact-title">
        <div>
          <p className="section-label">
            {"Get in touch"}
          </p>
          <h2 id="contact-title">
            {"The work I want to lead."}
          </h2>
        </div>
        <div>
          <p>
            {"I want to build and lead a product organization. The people and the work matter more to me than a particular title. I want responsibility for the results, with the authority to make the decisions that shape them."}
          </p>
          <p>
            {"If you’re looking for someone to take that on, I’d like to talk."}
          </p>
          <a className="email-link" href="mailto:ethan.c.stuart@gmail.com">
            {"ethan.c.stuart@gmail.com"}
          </a>
          <p className="advisory">
            {"I’d also consider advisory work for a project that’s a good fit."}
          </p>
        </div>
      </section>
    </div>
  );
}
