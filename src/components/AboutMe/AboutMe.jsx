import Description from "../Description/Description";
import "./AboutMe.css";
import photo from "../../images/photo.png";
import { Link } from "react-router-dom";

export default function AboutMe() {
  return (
    <section className="about">
      <Description text={"Студент"} />
      <div className="about__wrapper">
        <div className="about__wrapper-text">
          <h2 className="about__title">Виталий</h2>
          <h3 className="about__subtitle">Фронтенд-разработчик, 30 лет</h3>
          <p className="about__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="about__link"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={photo} alt="фото" className="about__image" />
      </div>
    </section>
  );
}
