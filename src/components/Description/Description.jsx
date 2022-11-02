import "./Description.css";

export default function Description({ text }) {
  return (
    <div className="description">
      <h2 className="description__text">{text}</h2>
    </div>
  );
}
