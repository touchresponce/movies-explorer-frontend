import "./MoviesCard.css";

export default function MoviesCard({ isSave, title, duration, preview }) {
  function setDuration(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours >= 1 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }

  return (
    <article className='movie'>
      <h3 className='movie__title'>{title}</h3>
      <p className='movie__duration'>{setDuration(duration)}</p>
      <button
        className={`movie__button ${
          isSave ? "movie__button_type_save" : "movie__button_type_unsave"
        }`}
        type='button'
      />
      <img
        className='movie__image'
        src={`https://api.nomoreparties.co${preview}`}
        alt='кадр из фильма'
      />
    </article>
  );
}
