import React, { useEffect, useState } from "react";

/**
 * FormField component is a reusable input field used throughout the platform's forms.
 * It can render different types of inputs including text, textarea, and select dropdowns.
 * This component also handles validation feedback by showing a required field message
 * and highlighting the input border if the field is empty.
 */
export default function FormField({
  name,
  label,
  placeholder,
  onChangeYourInfo,
  type,
  value,
  isEmpty,
  options = [],
  disabled = false,
}) {
  const [displayRequired, setDisplayRequired] = useState("hidden");
  const [redBorder, setRedBorder] = useState("border-[#d6d9e6]");

  useEffect(() => {
    if (isEmpty === true) {
      setDisplayRequired("block");
      setRedBorder("border-[#ed3548]");
    } else {
      setDisplayRequired("hidden");
      setRedBorder("border-[#d6d9e6]");
    }
  }, [isEmpty]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <label>{label}</label>
        <p
          className={`${displayRequired} font-medium text-[14px] text-[#ed3548]`}
        >
          This field is required
        </p>
      </div>
      <div>
        {type === "long" ? (
          <textarea
            rows="5"
            cols="30"
            onChange={onChangeYourInfo}
            name={name}
            placeholder={placeholder}
            value={value}
            className={`font-medium w-full mt-1 p-2 pl-3 rounded-lg border ${redBorder} text-[#02295a] text-[15px]`}
          ></textarea>
        ) : type === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChangeYourInfo}
            className={`font-medium w-full mt-1 p-2 pl-3 rounded-lg border ${redBorder} text-[#02295a] text-[15px]`}
            disabled={disabled}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            onChange={onChangeYourInfo}
            name={name}
            className={`font-medium w-full mt-1 p-2 pl-3 rounded-lg border ${redBorder} text-[#02295a] text-[15px]`}
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
}
