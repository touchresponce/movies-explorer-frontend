import "./AuthPage.css";
import { Link } from "react-router-dom";

export default function AuthPage({
  children,
  title,
  question,
  linkPath,
  linkName,
}) {
  return (
    <section className="auth">
      <div className="auth__wrapper">
        <Link to="/" className="auth__image" />
        <h1 className="auth__text">{title}</h1>
        {children}
        <p className="auth__question">
          {question}
          <Link className="auth__link" to={linkPath}>
            {linkName}
          </Link>
        </p>
      </div>
    </section>
  );
}
