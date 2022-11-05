import Description from "../Description/Description";
import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section className="project">
      <Description text={"О проекте"} />
      <div className="project__wrapper">
        <article>
          <h3 className="project__title">Дипломный проект включал 5 этапов</h3>
          <p className="project__subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </article>
        <article>
          <h3 className="project__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="project__subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </article>
      </div>
      <div className="project__container">
        <div className="project__backend">
          <h4 className="project__backend-title">1 неделя</h4>
          <p className="project__backend-subtitle">Back-end</p>
        </div>
        <div className="project__frontend">
          <h4 className="project__frontend-title">4 недели</h4>
          <p className="project__frontend-subtitle">Front-end</p>
        </div>
      </div>
    </section>
  );
}
