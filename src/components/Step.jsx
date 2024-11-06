import React, { useEffect, useState } from "react";

/**
 * Step Component
 *
 * This component represents a single step in a multi-step process,
 * displaying a step number and title, with styles that indicate
 * whether the step is active or not.
 *
 * @param {Object} props - The props for the component.
 * @param {number} props.number - The number representing the step.
 * @param {string} props.title - The title of the step.
 * @param {boolean} props.active - A boolean indicating if this step is active.
 *
 * @returns {JSX.Element} The rendered Step component.
 */
export default function Step({ number, title, active }) {
  const [bg, setBg] = useState(""); // State to manage background color of the step.

  useEffect(() => {
    if (active) {
      setBg("bg-[#000066] text-white"); // Set background and text color if the step is active.
    } else {
      setBg("text-[#4F566A]"); // Inactive text color.
    }
  }, [active]);

  return (
    <div
      className={`flex text-[#000066]  items-center space-x-4 px-3 py-1  ${
        active
          ? " bg-[#000066] cursor-pointer text-white rounded-lg"
          : "text-black rounded-lg hover:bg-gray-100"
      }`} // Rounded background for the active step.
    >
      <div
        className={`font-bold text-center w-8 h-8 flex items-center justify-center rounded-full text-[#000066] ${
          active ? "bg-[#E5E7EB] " : "bg-[#F3F4F6] "
        }`} // Number circle styling for active and inactive states.
      >
        {number}
      </div>
      <div className="text-sm font-medium hidden sm:block ">
        <span className={`cursor-default ${bg}`}>{title}</span>{" "}
        {/* Step title */}
      </div>
    </div>
  );
}
