import "./Loader.css";

export default function Loader({
  size = "medium",
  text = "Loading...",
  fullscreen = false,
}) {
  return (
    <div
      className={`loader-wrapper ${
        fullscreen ? "loader-fullscreen" : ""
      }`}
    >
      <div className={`spinner spinner-${size}`}></div>

      {text && <p className="loader-text">{text}</p>}
    </div>
  );
}