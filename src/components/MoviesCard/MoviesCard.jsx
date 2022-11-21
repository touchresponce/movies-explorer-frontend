import "./MoviesCard.css";

export default function MoviesCard({ isSave, title, duration, preview }) {
  return (
    <article className='movie'>
      <h3 className='movie__title'>{title}</h3>
      <p className='movie__duration'>{duration}</p>
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
