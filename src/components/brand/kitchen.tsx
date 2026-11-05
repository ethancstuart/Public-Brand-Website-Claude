import Link from "next/link";
import Image from "next/image";
import { KitchenCollection } from "./kitchen-collection";

export function KitchenContent() {
  return (
    <div className="brand-page ">
      <div className="project-opening kitchen-opening">
        <section className="wrap project-hero">
          <div>
            <p className="section-label">
              {"Allison’s Kitchen"}
            </p>
            <h1>
              {"See what people you know actually cook."}
            </h1>
            <p className="project-deck">
              {"Find a dinner in a friend’s kitchen and bring it into your own week. Save the recipe, put it on the plan, and get the ingredients onto a grocery list your household can use together."}
            </p>
            <div className="chapter-links">
              <a className="primary-link" href="#experience">
                {"Explore the experience ↓"}
              </a>
              <a className="text-link" href="https://allisonskitchen.app/@stuart-family" target="_blank" rel="noopener noreferrer">
                {"Visit our kitchen ↗"}
              </a>
            </div>
          </div>
          <aside className="project-facts">
            <p className="fact-label">
              {"Where it stands"}
            </p>
            <p>
              {"Released on iOS."}
              <br />
              {"Inviting selected households."}
            </p>
            <p className="fact-label">
              {"Why I’m building it"}
            </p>
            <p>
              {"I started with our household. I’m building toward a business that helps other families make everyday meals easier."}
            </p>
          </aside>
        </section>
      </div>
      <section className="wrap product-experience" id="experience" aria-labelledby="kitchen-experience-title">
        <div className="section-heading">
          <div>
            <p className="section-label">
              {"The experience"}
            </p>
            <h2 id="kitchen-experience-title">
              {"That could be dinner"}
              <br />
              {"at your house, too."}
            </h2>
          </div>
          <p>
            {"Start with the pastina in our kitchen. Save it to yours, plan a night to cook it, and put the ingredients on your list. The kitchen you build up is yours to share, too."}
          </p>
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
              <div className="example-plan">
                <p className="plan-eyebrow">
                  {"Example plan"}
                </p>
                <h4>
                  {"Dinner this week"}
                </h4>
                <div className="planned-dish featured-plan">
                  <span className="plan-day">
                    {"Monday"}
                  </span>
                  <Image src="/brand/family-pastina.webp" alt="" loading="lazy" width={300} height={400} sizes="(max-width: 760px) 90vw, 600px" />
                  <p>
                    {"Pastina al Limone with Crispy Chicken Cutlets"}
                  </p>
                  <span className="plan-source">
                    {"From the Stuart kitchen"}
                  </span>
                </div>
                <div className="planned-dish">
                  <span className="plan-day">
                    {"Tuesday"}
                  </span>
                  <p>
                    {"Asian Lettuce Wraps"}
                  </p>
                </div>
                <div className="planned-dish">
                  <span className="plan-day">
                    {"Wednesday"}
                  </span>
                  <p>
                    {"One Pot Crispy Chicken Thighs & Rice"}
                  </p>
                </div>
                <p className="plan-groceries">
                  {"From the plan to the grocery list "}
                  <span aria-hidden="true">
                    {"→"}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <p className="sharing-connection">
            <span className="connection-label">
              {"One recipe, two kitchens"}
            </span>
            {"Find the pastina in our kitchen, save it to yours, and plan it for dinner."}
          </p>
          <figcaption>
            {"Presentation concept using recipes and images from our public kitchen, with an example meal plan."}
          </figcaption>
        </figure>
      </section>
      <section className="meal-journey wrap" aria-label="From discovery to dinner">
        <div>
          <h3>
            {"Find something you want to cook."}
          </h3>
          <p>
            {"Explore a whole kitchen, with more recipes to come back to when you need an idea."}
          </p>
        </div>
        <div>
          <h3>
            {"Make it part of your week."}
          </h3>
          <p>
            {"Save it to your kitchen and connect it to the meal plan and groceries."}
          </p>
        </div>
        <div>
          <h3>
            {"Use it together. Share yours."}
          </h3>
          <p>
            {"Keep your household involved, then share a recipe or your kitchen with friends and other households."}
          </p>
        </div>
      </section>
      <div className="ai-chapter-band">
        <section className="leadership-chapter wrap">
          <div className="chapter-label">
            <p>
              {"What I see in it"}
            </p>
          </div>
          <div className="chapter-body">
            <h2>
              {"A kitchen is more useful when it helps you decide what to cook."}
            </h2>
            <p>
              {"Seeing what people you know actually cook feels more useful to me than another recipe feed. A whole kitchen gives you a collection you can explore and return to. The important part is making it easy to use those ideas at home."}
            </p>
            <p>
              {"That’s the connection I’ve kept building toward: finding a recipe, making it part of the week, and using Kitchen together as a household. Sharing should feed that experience. I want it to help someone answer “What should we make?” and follow through."}
            </p>
            <p>
              {"This developed as I built and used Kitchen. It’s why recipe and kitchen sharing sit alongside planning and groceries in the product today."}
            </p>
          </div>
        </section>
      </div>
      <section className="leadership-chapter wrap">
        <div className="chapter-label">
          <p>
            {"Where it started"}
          </p>
        </div>
        <div className="chapter-body">
          <h2>
            {"I wanted this to work for our own household."}
          </h2>
          <p>
            {"Our recipes were scattered across links, videos, and screenshots. Turning them into a plan for the week and a grocery list took more effort than it should have. I started building Kitchen to make that easier for us."}
          </p>
          <p>
            {"Using it at home gave me a reason to keep building—and made me think other families could benefit too."}
          </p>
        </div>
      </section>
      <section className="leadership-chapter wrap">
        <div className="chapter-label">
          <p>
            {"Building the business"}
          </p>
        </div>
        <div className="chapter-body">
          <h2>
            {"I want Kitchen to become part of how families plan and cook."}
          </h2>
          <p>
            {"I’m building it into a business. The opportunity I see is in a product people return to for everyday meals, with kitchens worth sharing giving other households a reason to try it."}
          </p>
          <p>
            {"Right now, I’m inviting selected households and working on the things that make it easy to get value: a dependable core experience, a clear start for a new household, and fewer places to get stuck. That’s what I want in place before opening it up more broadly."}
          </p>
          <p>
            {"I’m learning whether households keep using it, share it with people they know, and find enough value to pay. Those are still questions to answer, and they’re shaping what I work on next."}
          </p>
          <a className="text-link" href="https://allisonskitchen.app/@stuart-family" target="_blank" rel="noopener noreferrer">
            {"Explore our public kitchen ↗"}
          </a>
        </div>
      </section>
      <section className="project-invitation wrap" id="conversation" aria-labelledby="conversation-title">
        <div>
          <h2 id="conversation-title">
            {"Interested in Kitchen?"}
          </h2>
          <p>
            {"I’m inviting selected households while I improve the experience. If you’d like to try it with yours or talk about what I’m building, get in touch."}
          </p>
        </div>
        <a className="text-link" href="mailto:ethan.c.stuart@gmail.com?subject=Allison%E2%80%99s%20Kitchen">
          {"Ask about Kitchen "}
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
          <Link href="/portfolio/nexuswatch">
            {"NexusWatch "}
            <span aria-hidden="true">
              {"→"}
            </span>
          </Link>
          <p>
            {"Working through what makes a forecast trustworthy."}
          </p>
        </div>
        <Link className="text-link" href="/#work">
          {"All projects"}
        </Link>
      </nav>
    </div>
  );
}
