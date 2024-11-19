import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import SectionHeading from "./SectionHeading";
import Select from "react-select"; // Import react-select

/**
 * Experience component allows users to input and manage their work experience.
 * It renders a form that can dynamically add or remove experience entries.
 * Each experience entry includes fields based on the provided template.
 */
export default function Experience({
  experiences,
  onChangeExperienceInfo,
  isExperienceEmpty,
  addExperienceInfo,
}) {
  // Initialize the local state with experiences prop
  const [experienceForms, setExperienceForms] = useState(experiences);

  // Synchronize the local state with the parent experiences when the component mounts or experiences prop changes
  useEffect(() => {
    setExperienceForms(experiences);
  }, [experiences]);

  // Function to add a new experience form to the list
  const addExperienceForm = () => {
    const newForm = {
      employment_type: "",
      company: "",
      job_title: "",
      responsibilities: "",
      start_date: "",
      end_date: "",
      job_summary: "",
      primary_skills: [],
      tools_technologies: [],
      domain_knowledge: "",
      annual_salary: "",
      fixed_salary: "",
      variable_salary: "",
      currentlyWorking: false,
    };
    const updatedForms = [...experienceForms, newForm];
    setExperienceForms(updatedForms);
    onChangeExperienceInfo(updatedForms); // Update parent state
  };

  // Function to remove an experience form from the list
  const removeExperienceForm = (index) => {
    const updatedForms = experienceForms.filter((_, i) => i !== index);
    setExperienceForms(updatedForms);
    onChangeExperienceInfo(updatedForms); // Update parent state
  };

  // Function to handle changes in the experience form fields
  const handleExperienceChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedForms = [...experienceForms];
    updatedForms[index][name] = type === "checkbox" ? checked : value;
    setExperienceForms(updatedForms);
    onChangeExperienceInfo(updatedForms); // Update parent state
  };

  const employmentTypeOptions = [
    { value: "fulltime", label: "Full-Time" },
    { value: "parttime", label: "Contract-Based" },
    { value: "internShip", label: "Internship" },
  ];

  const skillsOptions = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "Docker", label: "Docker" },
    { value: "Git", label: "Git" },
    { value: "Python", label: "Python" },
  ];

  const toolsOptions = [
    { value: "VSCode", label: "VSCode" },
    { value: "GitHub", label: "GitHub" },
    { value: "Jira", label: "Jira" },
    { value: "Postman", label: "Postman" },
    { value: "Figma", label: "Figma" },
  ];

  const handleMultiSelectChange = (index, field, selectedOptions) => {
    const updatedForms = [...experienceForms];
    updatedForms[index][field] = selectedOptions
      ? selectedOptions.map((opt) => opt.value)
      : [];
    setExperienceForms(updatedForms);
    onChangeExperienceInfo(updatedForms);
  };

  return (
    <div>
      <SectionHeading
        title="Experience Information"
        desc="Please fill in the below form."
      />
      <form>
        <div className="block space-y-4 mb-6 max-h-[450px] overflow-y-scroll">
          {experienceForms.map((form, index) => (
            <div key={index} className="border-b border-gray-300 pb-4 mb-4">
              <div>
                <label htmlFor="">Employment Type</label>
                <select
                  name="employment_type"
                  value={form.employment_type}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="font-medium w-full mt-1 p-2 pl-3 rounded-lg border text-[#02295a] text-[15px]"
                >
                  {employmentTypeOptions.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2 mt-2">
                {[
                  {
                    name: "company",
                    label: "Name of the Company",
                    placeholder: "e.g Google",
                    type: "text",
                  },
                  {
                    name: "job_title",
                    label: "Designation",
                    placeholder: "e.g Software Engineer",
                    type: "text",
                  },
                  {
                    name: "start_date",
                    label: "Joining Date",
                    placeholder: "e.g 01/09/2021",
                    type: "date",
                  },
                  {
                    name: "end_date",
                    label: "End Date",
                    placeholder: "e.g 01/09/2022",
                    type: "date",
                  },
                  {
                    name: "domain_knowledge",
                    label: "Domain/Industry Knowledge",
                    placeholder: "e.g FinTech, Healthcare",
                    type: "text",
                  },
                  {
                    name: "annual_salary",
                    label: "Annual Salary",
                    placeholder: "e.g 50000",
                    type: "number",
                  },
                  {
                    name: "fixed_salary",
                    label: "Fixed Salary",
                    placeholder: "e.g 40000",
                    type: "number",
                  },
                  {
                    name: "variable_salary",
                    label: "Variable Salary",
                    placeholder: "e.g 10000",
                    type: "number",
                  },
                ].map((field) => (
                  <FormField
                    key={field.name}
                    onChangeYourInfo={(e) => handleExperienceChange(index, e)}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    isEmpty={isExperienceEmpty}
                    type={field.type}
                  />
                ))}
              </div>
              <div className="mt-2">
                <label htmlFor="">Primary Skills</label>
                <Select
                  isMulti
                  options={skillsOptions}
                  value={skillsOptions.filter((opt) =>
                    form.primary_skills.includes(opt.value)
                  )}
                  onChange={(selectedOptions) =>
                    handleMultiSelectChange(
                      index,
                      "primary_skills",
                      selectedOptions
                    )
                  }
                  className="text-[15px] mt-1"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="">Tools and Technologies</label>
                <Select
                  isMulti
                  options={toolsOptions}
                  value={toolsOptions.filter((opt) =>
                    form.tools_technologies.includes(opt.value)
                  )}
                  onChange={(selectedOptions) =>
                    handleMultiSelectChange(
                      index,
                      "tools_technologies",
                      selectedOptions
                    )
                  }
                  className="text-[15px] mt-1"
                />
              </div>
              <FormField
                onChangeYourInfo={(e) => handleExperienceChange(index, e)}
                name="job_summary"
                label="Job Summary"
                placeholder="Brief summary of job"
                value={form.job_summary}
                isEmpty={isExperienceEmpty}
                type="long"
              />
              <FormField
                onChangeYourInfo={(e) => handleExperienceChange(index, e)}
                name="responsibilities"
                label="Responsibilities"
                placeholder="Describe your role and achievements"
                value={form.responsibilities}
                isEmpty={isExperienceEmpty}
                type="long"
              />
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  name="currentlyWorking"
                  checked={form.currentlyWorking}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="mr-2"
                />
                <label className="text-sm">Currently working here</label>
              </div>
              <div className="flex items-center justify-start space-x-4 border-t mt-2 py-2">
                {experienceForms.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500 bg-red-50 flex items-center space-x-2 p-2 rounded-lg hover:shadow-lg font-bold"
                    onClick={() => removeExperienceForm(index)}
                  >
                    <svg
                      viewBox="0 0 64 64"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      className="font-bold text-red-500"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        strokeWidth={2}
                        d="M18.947 17.153l26.098 25.903M19.045 43.153l25.902-26.097"
                      />
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        strokeWidth={2}
                        d="M62.998999999999995 32 A30.999 30.999 0 0 1 32 62.999 A30.999 30.999 0 0 1 1.0010000000000012 32 A30.999 30.999 0 0 1 62.998999999999995 32 z"
                      />
                    </svg>
                    <span>Remove Experience</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-4 mt-2 border-t pt-2">
          <button
            type="button"
            className=" text-[#000066] flex items-center space-x-2 p-2 rounded-lg hover:shadow-lg bg-blue-50 font-bold"
            onClick={addExperienceForm}
          >
            <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-8a8 8 0 100 16 8 8 0 000-16z"
                clipRule="evenodd"
              />
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13 7a1 1 0 10-2 0v4H7a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V7z"
                clipRule="evenodd"
              />
            </svg>
            <span>Add Experience</span>
          </button>
        </div>
      </form>
    </div>
  );
}
