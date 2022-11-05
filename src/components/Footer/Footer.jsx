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
            <a>Яндекс.Практикум</a>
          </li>
          <li>
            <a>Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
