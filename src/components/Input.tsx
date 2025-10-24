import "./Input.css";

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
}: InputProps) => {
  return (
    <div className="input">
      {label && <label>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};
