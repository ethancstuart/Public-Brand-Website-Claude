import Link from "next/link";
import Image from "next/image";

export function AboutContent() {
  return (
    <div className="brand-page about-page">
      <div className="project-opening about-opening">
        <section className="wrap about-hero">
          <div>
            <p className="section-label">
              {"About me"}
            </p>
            <h1>
              {"I’m Ethan."}
            </h1>
            <p className="about-deck">
              {"I lead product teams, build software, and enjoy figuring things out."}
            </p>
            <p>
              {"I’m at Disney, where I lead a multidisciplinary team and a product portfolio. Outside that work, I’m building Allison’s Kitchen into a business and exploring ideas through NexusWatch and Product OS."}
            </p>
          </div>
          <figure>
            <Image src="/brand/ethan-portrait.jpg" width={1688} height={1547} alt="Ethan smiling outdoors, in a blue shirt" sizes="(max-width: 760px) 130px, 330px" priority />
            <figcaption>
              {"A photo from time with family."}
            </figcaption>
          </figure>
        </section>
      </div>
      <section className="life-section" id="outside-work" aria-labelledby="life-title">
        <div className="wrap life-inner">
          <div>
            <p className="section-label">
              {"Outside work"}
            </p>
            <h2 id="life-title">
              {"Life at home."}
            </h2>
          </div>
          <div>
            <p>
              {"Family is a big part of my life. I also enjoy landscaping and projects around the house, smoking and BBQ, and working on my X5."}
            </p>
            <p>
              {"Sometimes there’s something I want to fix or improve, and I figure out how to do it. Other times, I get interested in how something works and end up going deeper. I enjoy the doing as much as the learning."}
            </p>
            <a className="text-link" href="https://allisonskitchen.app/@stuart-family" target="_blank" rel="noopener noreferrer">
              {"A few things from our kitchen ↗"}
            </a>
          </div>
        </div>
      </section>
      <section className="leadership-chapter wrap">
        <div className="chapter-label">
          <p>
            {"Getting here"}
          </p>
        </div>
        <div className="chapter-body">
          <h2>
            {"I wanted to turn business understanding into useful products."}
          </h2>
          <p>
            {"My path into product was gradual. I wanted to own outcomes and build strong teams, and I discovered how much I enjoyed building along the way."}
          </p>
          <p>
            {"I enjoy helping people take more ownership while staying close to the product and customers. Building my own products gives me another place to learn and put ideas into practice."}
          </p>
          <Link className="text-link" href="/leadership">
            {"More about my leadership work →"}
          </Link>
        </div>
      </section>
      <section className="leadership-chapter wrap">
        <div className="chapter-label">
          <p>
            {"Keeping in touch"}
          </p>
        </div>
        <div className="chapter-body">
          <h2>
            {"I’m open to the right next conversation."}
          </h2>
          <p>
            {"Career opportunities are my priority. I’m interested in building and leading a product organization where I can help shape direction, develop strong teams, and own outcomes."}
          </p>
          <a className="email-link" href="mailto:ethan.c.stuart@gmail.com">
            {"ethan.c.stuart@gmail.com"}
          </a>
        </div>
      </section>
    </div>
  );
}
