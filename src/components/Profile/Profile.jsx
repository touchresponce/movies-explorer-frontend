import './Profile.css'
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <div className='profile__area'>
        <p className='profile__name'>Имя</p>
        <p className='profile__value'>Виталий</p>
      </div>
      <div className='profile__area'>
        <p className='profile__name'>E-mail</p>
        <p className='profile__value'>pochta@yandex.ru</p>
      </div>
      <Link className='profile__edit' to="">Редактировать</Link>
      <Link className='profile__loguot' to="/">Выйти из аккаунта</Link>

    </section>
  )
}
