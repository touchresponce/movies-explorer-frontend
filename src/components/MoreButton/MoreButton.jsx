import "./MoreButton.css";

export default function MoreButton({ handleMore }) {
  return (
    <div className='more'>
      <button className='more__button' type='button' onClick={handleMore}>
        Еще
      </button>
    </div>
  );
}
