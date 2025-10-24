import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled,
}: ButtonProps) => {
  return (
    <button className={variant} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
