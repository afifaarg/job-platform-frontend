import React, { useEffect, useState } from "react"; // Import React and necessary hooks
import FormField from "./FormField"; // Import the FormField component for rendering input fields
import SectionHeading from "./SectionHeading"; // Import SectionHeading for section titles and descriptions

// YourInfo component for capturing general user information
export default function YourInfo({ yourInfo, onChangeYourInfo, isEmpty }) {
  // State to hold form field configurations
  const [formFields, setFormFields] = useState([
    {
      id: 1,
      name: "name",
      type: "text",
      label: "Full Name",
      placeholder: "e.g Harry Potter", // Example placeholder
    },
    {
      id: 2,
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "e.g harry@gmail.com", // Example placeholder
    },
    {
      id: 3,
      name: "phone",
      type: "text",
      label: "Phone Number",
      placeholder: "e.g +91 234 567 890", // Example placeholder
    },
    {
      id: 4,
      name: "country",
      type: "text",
      label: "Country",
      placeholder: "e.g India", // Example placeholder
    },
    {
      id: 5,
      name: "city",
      type: "text",
      label: "City",
      placeholder: "e.g Mumbai", // Example placeholder
    },
  ]);

  // Optional useEffect to log when isEmpty changes (currently commented out)
  // useEffect(() => {
  //   console.log(isEmpty); // Log the isEmpty value for debugging
  // }, [isEmpty]);

  return (
    <div>
      {/* Section heading for the form */}
      <SectionHeading
        title="General Informations" // Title of the section
        desc="Please fill in the below form." // Description of the section
      />
      <form>
        <div className="flex flex-col space-y-6 text-[14px]">
          {" "}
          {/* Flexbox for vertical layout */}
          {/* Map over the formFields array to render each input field */}
          {formFields.map((formField) => (
            <FormField
              onChangeYourInfo={onChangeYourInfo} // Pass the onChange handler
              key={formField.id} // Unique key for each form field
              name={formField.name} // Field name for the input
              label={formField.label} // Label for the input
              placeholder={formField.placeholder} // Placeholder text for the input
              value={yourInfo[formField.name]} // Current value for the input from yourInfo
              type={formField.type} // Input type (text/email)
              isEmpty={isEmpty} // Prop to determine if the field is empty
            />
          ))}
        </div>
      </form>
    </div>
  );
}
