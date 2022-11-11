import "./MoviesCard.css";
import preview from "../../images/preview.jpg"; // временно

export default function MoviesCard({ isSave }) {
  return (
    <article className="movie">
      <h3 className="movie__title">33 слова о дизайне</h3>
      <p className="movie__duration">1ч 47м</p>
      <img className="movie__image" src={preview} alt="кадр из фильма" />
      <button
        className={`movie__button ${
          isSave ? "movie__button_type_save" : "movie__button_type_unsave"
        }`}
        type="button"
      />
    </article>
  );
}
