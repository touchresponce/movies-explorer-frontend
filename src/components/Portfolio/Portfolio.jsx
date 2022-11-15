import "./Portfolio.css";
import arrow from "../../images/site-arrow.svg";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__item-link"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
            <img src={arrow} alt="иконка ссылки" />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__item-link"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
            <img src={arrow} alt="иконка ссылки" />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__item-link"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
            <img src={arrow} alt="иконка ссылки" />
          </a>
        </li>
      </ul>
    </section>
  );
}
