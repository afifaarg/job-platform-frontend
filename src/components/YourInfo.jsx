import React, { useMemo, useEffect, useState } from "react";
import FormField from "./FormField";
import SectionHeading from "./SectionHeading";
import Select from "react-select";
import countryList from "react-select-country-list";
export default function YourInfo({ yourInfo, onChangeYourInfo, isEmpty }) {
  const [formFields] = useState({
    personalInfo: [
      {
        id: 1,
        name: "name",
        type: "text",
        label: "Full Name",
        placeholder: "e.g Harry Potter",
      },
      {
        id: 20,
        name: "birth_Date",
        type: "date",
        label: "Date of Birth",
      },
      {
        id: 21,
        name: "gender",
        type: "select",
        label: "Gender",
        options: [
          { value: "", label: "Select Gender" },
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
          { value: "none", label: "Prefer Not To Say" },
        ],
      },
    ],
    currentAddress: [
      {
        id: 4,
        name: "current_address_line_1", // Changed to match backend
        type: "text",
        label: "Current Address Line 1",
        placeholder: "e.g 123 Main St",
      },
      {
        id: 5,
        name: "current_address_line_2", // Changed to match backend
        type: "text",
        label: "Current Address Line 2",
        placeholder: "Apartment, suite, unit, etc.",
      },

      {
        id: 7,
        name: "current_country", // Changed to match backend
        type: "country",
        label: "Current Country",
        placeholder: "e.g India",
      },
      {
        id: 8,
        name: "current_city", // Changed to match backend
        type: "text",
        label: "Current City",
        placeholder: "e.g Mumbai",
      },
      {
        id: 9,
        name: "current_state", // Changed to match backend
        type: "text",
        label: "Current State",
        placeholder: "e.g Maharashtra",
      },
      {
        id: 10,
        name: "current_pin_code", // Changed to match backend
        type: "text",
        label: "Current Pincode",
        placeholder: "e.g 400001",
      },
    ],
    permanentAddress: [
      {
        id: 11,
        name: "permanent_address_line_1", // Changed to match backend
        type: "text",
        label: "Permanent Address Line 1",
        placeholder: "e.g 456 Main St",
      },
      {
        id: 12,
        name: "permanent_address_line_2", // Changed to match backend
        type: "text",
        label: "Permanent Address Line 2",
        placeholder: "Apartment, suite, unit, etc.",
      },
      {
        id: 14,
        name: "permanent_country", // Changed to match backend
        type: "country",
        label: "Permanent Country",
        placeholder: "e.g India",
      },
      {
        id: 15,
        name: "permanent_city", // Changed to match backend
        type: "text",
        label: "Permanent City",
        placeholder: "e.g Mumbai",
      },
      {
        id: 16,
        name: "permanent_state", // Changed to match backend
        type: "text",
        label: "Permanent State",
        placeholder: "e.g Maharashtra",
      },
      {
        id: 17,
        name: "permanent_pin_code", // Changed to match backend
        type: "text",
        label: "Permanent Pincode",
        placeholder: "e.g 400001",
      },
    ],
  });

  return (
    <div>
      <SectionHeading
        title="General Information"
        desc="Please fill in the below form."
      />

      <form>
        {/* Personal Info Section */}
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-4">Personal Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px]">
            {formFields.personalInfo.map((formField) => (
              <FormField
                key={formField.id}
                onChangeYourInfo={onChangeYourInfo}
                name={formField.name}
                label={formField.label}
                placeholder={formField.placeholder}
                value={yourInfo[formField.name] || ""}
                type={formField.type}
                options={formField.options}
                isEmpty={isEmpty}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Current Address Section */}
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-4">Current Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px]">
            {formFields.currentAddress.map((formField) => (
              <FormField
                key={formField.id}
                onChangeYourInfo={onChangeYourInfo}
                name={formField.name}
                label={formField.label}
                placeholder={formField.placeholder}
                value={yourInfo[formField.name]}
                type={formField.type}
                options={formField.options}
                isEmpty={isEmpty}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Permanent Address Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Permanent Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px]">
            {formFields.permanentAddress.map((formField) => (
              <FormField
                key={formField.id}
                onChangeYourInfo={onChangeYourInfo}
                name={formField.name}
                label={formField.label}
                placeholder={formField.placeholder}
                value={yourInfo[formField.name] || ""}
                type={formField.type}
                options={formField.options}
                isEmpty={isEmpty}
              />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
