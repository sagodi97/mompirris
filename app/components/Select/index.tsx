import { SelectHTMLAttributes } from "react";

interface SelectProps
  extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "className" | "placeholder"
  > {
  options: { text: string; value: string }[];
  label?: string;
  placeholder?: string;
}

const Select = ({ id, label, placeholder, options, ...rest }: SelectProps) => {
  return (
    <div className="m-2 w-full">
      {Boolean(label) && (
        <label className="mb-1.5 block text-sm" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        id={id}
        className="relative w-full appearance-none rounded-lg bg-gray-100 p-2.5 text-sm text-black outline-none focus:bg-white focus:ring-1 focus:ring-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
        {...rest}
      >
        {Boolean(placeholder) && (
          <option selected disabled value={""}>
            {placeholder}&nbsp;
          </option>
        )}
        {options.map(({ text, value }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
