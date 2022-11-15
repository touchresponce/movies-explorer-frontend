import "./Promo.css";
import textLogo from "../../images/text-landing.svg";

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__text">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <h2 className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </h2>
        </div>
        <img className="promo__image" src={textLogo} alt="логотип" />
      </div>
      <button className="promo__button" type="button">
        <a className="promo__link" href="#project">
          Узнать больше
        </a>
      </button>
    </section>
  );
}
