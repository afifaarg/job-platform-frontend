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
      setBg("bg-[#adbeff]"); // Set background color if the step is active.
    } else {
      setBg(""); // Reset background color if the step is not active.
    }
  }, [active]); // Effect runs when the 'active' prop changes.

  return (
    <div
      className={`flex items-center text-left space-x-4 text-white mx-4 ${
        active
          ? "sm:border-b  border-[#adbeff]" // Border color for active step.
          : "sm:border-b border-[#d6d9e6]" // Border color for inactive step.
      } p-2`}
    >
      <div
        className={`font-bold text-center p-2 w-10 h-10 rounded-full ${
          active ? "bg-[#adbeff]" : "" // Background color for the number circle.
        }`}
      >
        {number} {/* Display the step number. */}
      </div>
      <div className="hidden md:block">
        {" "}
        {/* Only display title on medium screens and larger. */}
        <div className="font-bold text-white">{title}</div>{" "}
        {/* Display the step title. */}
      </div>
    </div>
  );
}
