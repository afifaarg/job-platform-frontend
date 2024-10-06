import React, { useEffect, useState } from "react";

/**
 * FormField component is a reusable input field used throughout the platform's forms.
 * It can render different types of inputs including text, textarea, and select dropdowns.
 * This component also handles validation feedback by showing a required field message
 * and highlighting the input border if the field is empty.
 *
 * @param {string} name - The name attribute for the input field.
 * @param {string} label - The label for the input field.
 * @param {string} placeholder - Placeholder text for the input field.
 * @param {function} onChangeYourInfo - Callback function to handle changes in the input value.
 * @param {string} type - The type of input (e.g., text, textarea, select).
 * @param {string} value - The current value of the input.
 * @param {boolean} isEmpty - Indicates if the field is required and currently empty.
 * @param {Array} options - Optional array for select input options, containing objects with label and value properties.
 */
export default function FormField({
  name,
  label,
  placeholder,
  onChangeYourInfo,
  type,
  value,
  isEmpty,
  options = [], // Add options to support select inputs
}) {
  // State for controlling visibility of the required message and border color
  const [displayRequired, setDisplayRequired] = useState("hidden");
  const [redBorder, setRedBorder] = useState("border-[#d6d9e6]");

  // Effect to manage the display of the required message based on isEmpty prop
  useEffect(() => {
    if (isEmpty === true) {
      setDisplayRequired("block"); // Show the required message if the field is empty
      setRedBorder("border-[#ed3548]"); // Set border to red if the field is empty
    } else {
      setDisplayRequired("hidden"); // Hide the required message if not empty
      setRedBorder("border-[#d6d9e6]"); // Reset border color when not empty
    }
  }, [isEmpty]);

  return (
    <div>
      {/* Label and validation message for the input field */}
      <div className="flex justify-between items-center">
        <label>{label}</label>
        <p
          className={`${displayRequired} font-medium text-[14px] text-[#ed3548]`}
        >
          This field is required
        </p>
      </div>
      <div>
        {/* Render a textarea if the input type is "long" */}
        {type === "long" ? (
          <textarea
            id="txtArea" // Unique ID for accessibility
            rows="10" // Number of visible text lines
            cols="70" // Number of visible character columns
            onChange={onChangeYourInfo} // Handler for value changes
            name={name} // Name attribute for the input
            placeholder={placeholder} // Placeholder text for guidance
            value={value} // Current value of the textarea
            className={`font-medium w-full mt-1 p-2 pl-3 rounded-lg border ${redBorder} text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]`}
          ></textarea>
        ) : type === "select" ? (
          // Render a select dropdown if the input type is "select"
          <select
            name={name} // Name attribute for the select input
            value={value} // Current selected value
            onChange={onChangeYourInfo} // Handler for value changes
            className={`font-medium w-full mt-1 p-2 pl-3 rounded-lg border ${redBorder} text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]`}
          >
            {/* Map through options to create option elements */}
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label} {/* Display label for each option */}
              </option>
            ))}
          </select>
        ) : (
          // Render an input field for all other types
          <input
            onChange={onChangeYourInfo} // Handler for value changes
            name={name} // Name attribute for the input
            className={`font-medium w-full mt-1 p-2 pl-3 rounded-lg border ${redBorder} text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]`}
            type={type} // Type of the input (e.g., text, password, email)
            placeholder={placeholder} // Placeholder text for guidance
            value={value} // Current value of the input
          />
        )}
      </div>
    </div>
  );
}
