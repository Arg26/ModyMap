import "./Button.css";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  fullWidth = false,
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${
        fullWidth ? "btn-full" : ""
      } ${className}`.trim()}
    >
      {children}
    </button>
  );
}