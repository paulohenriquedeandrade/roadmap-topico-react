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
  const inputId = label
    ? label.toLowerCase().replace(/\s+/g, "-")
    : `input-${Math.random()}`;

  return (
    <div className="mb-4">
      {label && (
        <label
          className="block text-sm font-semibold text-gray-700 mb-2"
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};
