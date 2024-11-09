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
      name: "extra_curricular_activities",
      type: "text",
      label: "Extra Curricular Activities",
      placeholder: "Enter your activities",
    },
    {
      id: 2,
      name: "adhaar_number",
      type: "text",
      label: "Adhaar Number (Govt. ID)",
      placeholder: "Enter your Adhaar number",
    },
    {
      id: 3,
      name: "disability_status",
      type: "text",
      label: "Disability Status",
      placeholder: "Specify if any",
    },
    {
      id: 4,
      name: "govt_employee",
      type: "text",
      label: "Govt. Employee",
      placeholder: "Yes/No",
    },
    {
      id: 5,
      name: "ex_military",
      type: "text",
      label: "Ex Military",
      placeholder: "Yes/No",
    },
    {
      id: 6,
      name: "reserve_forces",
      type: "text",
      label: "Reserve Forces",
      placeholder: "Yes/No",
    },
    {
      id: 7,
      name: "military",
      type: "text",
      label: "Military",
      placeholder: "Yes/No",
    },
    {
      id: 8,
      name: "current_ctc",
      type: "text",
      label: "Current CTC",
      placeholder: "Enter current CTC",
    },
    {
      id: 9,
      name: "expected_ctc",
      type: "text",
      label: "Expected CTC",
      placeholder: "Enter expected CTC",
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
