import React, { useEffect, useState } from "react";
import FormField from "./FormField";
import SectionHeading from "./SectionHeading";

/**
 * ProfessionalInfo component to collect professional details through a form.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.yourInfo - The object containing the user's information.
 * @param {function} props.onChangeYourInfo - The function to handle changes to the user's information.
 * @param {boolean} props.isEmpty - Flag to indicate if the form is empty.
 * @returns {JSX.Element} The rendered form for professional information.
 */
export default function ProfessionalInfo({
  yourInfo,
  onChangeYourInfo,
  isEmpty,
}) {
  const [formFields, setFormFields] = useState([
    {
      id: 1,
      name: "github_link",
      type: "url",
      label: "GitHub Link",
      placeholder: "e.g https://github.com/yourusername",
    },
    {
      id: 2, // Changed id to be unique for each field
      name: "linkedin_link",
      type: "url",
      label: "LinkedIn Link",
      placeholder: "e.g https://linkedin.com/in/yourprofile",
    },
    {
      id: 3,
      name: "portfolio_link",
      type: "url",
      label: "Portfolio Link",
      placeholder: "e.g https://yourportfolio.com",
    },
    {
      id: 4,
      name: "resume_file",
      type: "file",
      label: "Resume File",
      placeholder: "Upload your resume",
    },
    {
      id: 5, // Changed id to be unique for each field
      name: "proficiency",
      type: "text",
      label: "Proficiency",
      placeholder: "e.g Software Engineer, Graphic designer",
    },
  ]);

  return (
    <div>
      <SectionHeading
        title="Professional Information"
        desc="Please fill in the below form."
      />
      <form>
        <div className="flex flex-col space-y-6 text-[14px]">
          {formFields.map((formField) => (
            <FormField
              onChangeYourInfo={onChangeYourInfo}
              key={formField.id}
              name={formField.name}
              label={formField.label}
              placeholder={formField.placeholder}
              value={yourInfo[formField.name]}
              type={formField.type}
              options={formField.options} // Pass options for select fields
              isEmpty={isEmpty}
            />
          ))}
        </div>
      </form>
    </div>
  );
}
