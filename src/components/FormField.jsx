import React, { useMemo, useEffect, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function FormField({
  name,
  label,
  placeholder,
  onChangeYourInfo,
  type,
  value,
  isEmpty,
  options = [],
  disabled = false,
}) {
  const [displayRequired, setDisplayRequired] = useState("hidden");
  const [redBorder, setRedBorder] = useState("border-[#d6d9e6]");
  const optionsCountries = useMemo(() => countryList().getData(), []);

  const changeHandler = (selectedOption) => {
    onChangeYourInfo({ target: { name, value: selectedOption.label } });
  };

  const phoneChangeHandler = (phoneValue) => {
    onChangeYourInfo({ target: { name, value: phoneValue } });
  };

  useEffect(() => {
    if (isEmpty) {
      setDisplayRequired("block");
      setRedBorder("border-[#ed3548]");
    } else {
      setDisplayRequired("hidden");
      setRedBorder("border-[#d6d9e6]");
    }
  }, [isEmpty]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <label>{label}</label>
        <p
          className={`${displayRequired} font-medium text-[14px] text-[#ed3548]`}
        >
          This field is required
        </p>
      </div>
      <div>
        {type === "long" ? (
          <textarea
            rows="5"
            cols="30"
            onChange={onChangeYourInfo}
            name={name}
            placeholder={placeholder}
            value={value}
            className={`font-medium w-full mt-1 p-2 pl-3 rounded-lg border ${redBorder} text-[#02295a] text-[15px]`}
          ></textarea>
        ) : type === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChangeYourInfo}
            className={`font-medium w-full mt-1 p-2 pl-3 rounded-lg border ${redBorder} text-[#02295a] text-[15px]`}
            disabled={disabled}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "country" ? (
          <Select
            options={optionsCountries}
            value={optionsCountries.find((option) => option.value === value)}
            onChange={changeHandler}
            isDisabled={disabled}
          />
        ) : type === "phone" ? (
          <PhoneInput
            country={"in"} // Set a default country
            value={value}
            onChange={phoneChangeHandler}
            disabled={disabled}
            inputClass={`font-medium max-w-full mt-1 py-4 p-2 pl-3 rounded-lg border ${redBorder} text-[#02295a] text-[15px]`}
          />
        ) : (
          <input
            onChange={onChangeYourInfo}
            name={name}
            className={`font-medium w-full mt-1 p-2 pl-3 rounded-lg border ${redBorder} text-[#02295a] text-[15px]`}
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
}
