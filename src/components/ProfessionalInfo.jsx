import React, { useState } from "react";
import FormField from "./FormField"; // Importing the FormField component
import SectionHeading from "./SectionHeading"; // Importing the SectionHeading component

export default function ProfessionalInfo({
  yourInfo,
  onChangeYourInfo,
  isEmpty,
}) {
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
      type: "number",
      label: "Adhaar Number (Govt. ID)",
      placeholder: "Enter your Adhaar number",
    },
    {
      id: 3,
      name: "disability_status",
      type: "select", // Use select for Yes/No
      label: "Disability Status",
      placeholder: "Specify if any",
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ], // Options for the select field
    },

    {
      id: 4,
      name: "govt_employee",
      type: "select", // Use select for Yes/No
      label: "Govt. Employee",
      placeholder: "Yes/No",
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ], // Options for the select field
    },
    {
      id: 5,
      name: "ex_military",
      type: "select", // Use select for Yes/No
      label: "Ex Military",
      placeholder: "Yes/No",
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ], // Options for the select field
    },
    {
      id: 6,
      name: "reserve_forces",
      type: "select", // Use select for Yes/No
      label: "Reserve Forces",
      placeholder: "Yes/No",
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ], // Options for the select field
    },
    {
      id: 7,
      name: "military",
      type: "select", // Use select for Yes/No
      label: "Military",
      placeholder: "Yes/No",
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ], // Options for the select field
    },
    {
      id: 8,
      name: "current_ctc",
      type: "number", // Use number for numeric input
      label: "Current CTC",
      placeholder: "Enter current CTC",
    },
    {
      id: 9,
      name: "expected_ctc",
      type: "number", // Use number for numeric input
      label: "Expected CTC",
      placeholder: "Enter expected CTC",
    },
  ]);

  // Helper function to handle select change for Yes/No fields
  const handleSelectChange = (name, value) => {
    onChangeYourInfo({
      target: {
        name,
        value: value == "Yes" ? true : false, // Convert "Yes" to true, "No" to false
      },
    });
  };

  // Helper function to handle numeric change for CTC fields
  const handleNumericChange = (name, value) => {
    const numericValue = isNaN(value) ? "" : parseFloat(value); // Ensure numeric input
    onChangeYourInfo({
      target: {
        name,
        value: numericValue,
      },
    });
  };

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
              onChangeYourInfo={
                formField.type === "select"
                  ? (e) => handleSelectChange(formField.name, e.target.value)
                  : formField.type === "number"
                  ? (e) => handleNumericChange(formField.name, e.target.value)
                  : onChangeYourInfo
              }
              key={formField.id} // Unique key for each form field
              name={formField.name} // Field name
              label={formField.label} // Field label
              placeholder={formField.placeholder} // Placeholder text
              value={yourInfo[formField.name]} // Current value of the field
              type={formField.type} // Input type (text, number, select)
              options={formField.options} // Options for select fields
              isEmpty={isEmpty} // Check if form is empty
            />
          ))}
        </div>
      </form>
    </div>
  );
}
