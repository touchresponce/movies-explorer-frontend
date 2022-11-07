import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__year">&copy; 2022</p>
        <ul className="footer__list">
          <li>
            <a className="footer__link" href="https://practicum.yandex.ru" target='_blank' rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li>
            <a className="footer__link" href="https://github.com" target='_blank' rel="noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
