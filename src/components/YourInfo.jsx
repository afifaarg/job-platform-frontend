import React, { useEffect, useState } from "react";
import FormField from "./FormField";
import SectionHeading from "./SectionHeading";

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
        id: 2,
        name: "email",
        type: "email",
        label: "Email Address",
        placeholder: "e.g harry@gmail.com",
      },
      {
        id: 3,
        name: "phone",
        type: "text",
        label: "Phone Number",
        placeholder: "e.g +91 234 567 890",
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
        name: "currentAddress",
        type: "text",
        label: "Current Address Line 1",
        placeholder: "e.g 123 Main St",
      },
      {
        id: 5,
        name: "currentAddress1",
        type: "text",
        label: "Current Address Line 2",
        placeholder: "Apartment, suite, unit, etc.",
      },
      {
        id: 6,
        name: "currentAddress2",
        type: "text",
        label: "Current Address Line 3",
        placeholder: "Additional address info",
      },
      {
        id: 7,
        name: "countryC",
        type: "text",
        label: "Current Country",
        placeholder: "e.g India",
      },
      {
        id: 8,
        name: "cityC",
        type: "text",
        label: "Current City",
        placeholder: "e.g Mumbai",
      },
      {
        id: 9,
        name: "stateC",
        type: "text",
        label: "Current State",
        placeholder: "e.g Maharashtra",
      },
      {
        id: 10,
        name: "pinCodeC",
        type: "text",
        label: "Current Pincode",
        placeholder: "e.g 400001",
      },
    ],
    permanentAddress: [
      {
        id: 11,
        name: "permanentAddress",
        type: "text",
        label: "Permanent Address Line 1",
        placeholder: "e.g 456 Main St",
      },
      {
        id: 12,
        name: "permanentAddress1",
        type: "text",
        label: "Permanent Address Line 2",
        placeholder: "Apartment, suite, unit, etc.",
      },
      {
        id: 13,
        name: "permanentAddress2",
        type: "text",
        label: "Permanent Address Line 3",
        placeholder: "Additional address info",
      },
      {
        id: 14,
        name: "countryP",
        type: "text",
        label: "Permanent Country",
        placeholder: "e.g India",
      },
      {
        id: 15,
        name: "cityP",
        type: "text",
        label: "Permanent City",
        placeholder: "e.g Mumbai",
      },
      {
        id: 16,
        name: "stateP",
        type: "text",
        label: "Permanent State",
        placeholder: "e.g Maharashtra",
      },
      {
        id: 17,
        name: "pinCodeP",
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
                value={yourInfo[formField.name]}
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
