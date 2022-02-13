import React, { FC, InputHTMLAttributes } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  id: string;
  label?: string;
  error?: [boolean, string];
}

const Input: FC<InputProps> = ({ id, label, error, ...rest }) => (
  <div className="m-2 w-full">
    {Boolean(label) && (
      <label className="mb-1.5 block text-sm" htmlFor={id}>
        {label}
      </label>
    )}
    <input
      id={id}
      className="w-full rounded-lg bg-gray-100 p-2.5 text-sm text-black outline-none focus:bg-white focus:ring-1 focus:ring-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
      type="text"
      value={undefined}
      {...rest}
    />
    {error && error[0] && (
      <small className="mt-1 block text-red-500">{error[1]}</small>
    )}
  </div>
);

export default Input;
