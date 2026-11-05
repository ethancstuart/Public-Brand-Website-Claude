import Image from "next/image";

export function KitchenCollection() {
  return (
    <div className="family-collection">
      <div className="collection-heading">
        <p className="collection-handle">
          {"@stuart-family"}
        </p>
        <h4>
          {"From our kitchen"}
        </h4>
        <p>
          {"A few recipes we’ve cooked at home."}
        </p>
      </div>
      <div className="family-recipes">
        <a className="family-recipe" href="https://allisonskitchen.app/r/68AKBNrfnZTe" target="_blank" rel="noopener noreferrer">
          <Image src="/brand/family-pastina.webp" alt="" loading="lazy" width={300} height={400} sizes="(max-width: 760px) 40vw, 260px" />
          <span className="recipe-title">
            {"Pastina al Limone with Crispy Chicken Cutlets"}
          </span>
          <span className="recipe-time">
            {"35 min"}
          </span>
        </a>
        <a className="family-recipe" href="https://allisonskitchen.app/r/hP7U93cZ4XON" target="_blank" rel="noopener noreferrer">
          <Image src="/brand/family-lettuce-wraps.webp" alt="" loading="lazy" width={400} height={600} sizes="(max-width: 760px) 40vw, 260px" />
          <span className="recipe-title">
            {"Asian Lettuce Wraps"}
          </span>
          <span className="recipe-time">
            {"20 min"}
          </span>
        </a>
        <a className="family-recipe" href="https://allisonskitchen.app/r/T_ulIFJtI1_p" target="_blank" rel="noopener noreferrer">
          <Image src="/brand/family-rigatoni.webp" alt="" loading="lazy" width={400} height={225} sizes="(max-width: 760px) 40vw, 260px" />
          <span className="recipe-title">
            {"Rigatoni With White Bolognese"}
          </span>
          <span className="recipe-time">
            {"1 hour"}
          </span>
        </a>
        <a className="family-recipe" href="https://allisonskitchen.app/r/YDiNl1GUjT4Y" target="_blank" rel="noopener noreferrer">
          <Image src="/brand/family-chicken-rice.webp" alt="" loading="lazy" width={400} height={400} sizes="(max-width: 760px) 40vw, 260px" />
          <span className="recipe-title">
            {"One Pot Crispy Chicken Thighs & Rice"}
          </span>
          <span className="recipe-time">
            {"45 min"}
          </span>
        </a>
      </div>
      <a className="collection-source" href="https://allisonskitchen.app/@stuart-family" target="_blank" rel="noopener noreferrer">
        {"Visit our public kitchen "}
        <span aria-hidden="true">
          {"↗"}
        </span>
      </a>
    </div>
  );
}
