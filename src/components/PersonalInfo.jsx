import React, { useState } from "react";
import FormField from "./FormField"; // Importing the FormField component
import SectionHeading from "./SectionHeading"; // Importing the SectionHeading component

/**
 * PersonalInfo component for collecting user's general information.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.yourInfo - The current user information.
 * @param {Function} props.onChangeYourInfo - Function to handle changes in input fields.
 * @param {boolean} props.isEmpty - Flag to indicate if the form is empty.
 * @returns {JSX.Element} The rendered component.
 */
export default function PersonalInfo({ yourInfo, onChangeYourInfo, isEmpty }) {
  // Define the form fields to be rendered
  const [formFields] = useState([
    {
      id: 1,
      name: "gender",
      type: "select", // Select input for gender
      label: "Gender",
      options: [
        { value: "", label: "Select Gender" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
    },
    {
      id: 2,
      name: "birth_Date",
      type: "date", // Date input for birth date
      label: "Birth Date",
      placeholder: "Select your birth date",
    },
    {
      id: 3,
      name: "description",
      type: "long", // Long text input for description
      label: "Description",
      placeholder: "Describe yourself",
    },
  ]);

  return (
    <div>
      <SectionHeading
        title="General Informations" // Title of the section
        desc="Please fill in the below form." // Description under the title
      />
      <form>
        <div className="flex flex-col space-y-6 text-[14px]">
          {/* Map over formFields to render FormField components */}
          {formFields.map((formField) => (
            <FormField
              onChangeYourInfo={onChangeYourInfo} // Function to handle input changes
              key={formField.id} // Unique key for each form field
              name={formField.name} // Field name
              label={formField.label} // Field label
              placeholder={formField.placeholder} // Placeholder text
              value={yourInfo[formField.name]} // Current value of the field
              type={formField.type} // Input type (text, date, select)
              options={formField.options} // Options for select fields
              isEmpty={isEmpty} // Check if form is empty
            />
          ))}
        </div>
      </form>
    </div>
  );
}
