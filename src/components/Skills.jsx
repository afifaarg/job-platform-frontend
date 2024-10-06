import React, { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";

/**
 * Skills component for collecting user skills through an input field and displaying suggested skills.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.skills - The list of current skills selected by the user.
 * @param {function} props.onChangeSkill - The function to handle changes to the skills list.
 * @param {boolean} props.isSkillsEmpty - Flag to indicate if the skills list is empty.
 * @returns {JSX.Element} The rendered skills input and suggested skills section.
 */
export default function Skills({ skills, onChangeSkill, isSkillsEmpty }) {
  const [inputValue, setInputValue] = useState("");
  const [errorDisplay, setErrorDisplay] = useState("invisible");

  // Sample list of suggested skills
  const suggestedSkills = [
    // Technical Skills
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "SQL",
    "Java",
    "C#",
    "HTML",
    "CSS",
    "Git",
    "Django",
    "AWS",
    "Linux",
    "Docker",
    "Kubernetes",
    "Azure",
    // Design and Creativity
    "Graphic Design",
    "UI/UX Design",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Figma",
    "Sketch",
    "Animation",
    "Video Editing",
    "3D Modeling",
    "Photography",
    // Marketing and Sales
    "SEO",
    "Content Marketing",
    "Social Media Marketing",
    "Google Analytics",
    "Copywriting",
    "Email Marketing",
    "Salesforce",
    "Lead Generation",
    "Customer Relationship Management (CRM)",
    "Advertising",
    "Branding",
    // Soft Skills
    "Communication",
    "Teamwork",
    "Problem-solving",
    "Time Management",
    "Critical Thinking",
    "Adaptability",
    "Emotional Intelligence",
    "Leadership",
    "Conflict Resolution",
    "Collaboration",
    // Management and Leadership
    "Project Management",
    "Agile Methodology",
    "Scrum",
    "Stakeholder Management",
    "Risk Management",
    "Strategic Planning",
    "Budgeting",
    "Team Leadership",
    "Performance Evaluation",
    "Change Management",
    // Education and Training
    "Curriculum Development",
    "Instructional Design",
    "Classroom Management",
    "Educational Technology",
    "Public Speaking",
    "Mentoring",
    "Training and Development",
    "Tutoring",
    "E-Learning",
    "Assessment and Evaluation",
    // Finance and Accounting
    "Financial Analysis",
    "Budgeting",
    "Tax Preparation",
    "Accounting",
    "Bookkeeping",
    "Financial Planning",
    "Auditing",
    "Payroll Management",
    "Investment Management",
    "Risk Assessment",
    // Healthcare
    "Patient Care",
    "Nursing",
    "CPR",
    "Medical Billing",
    "Phlebotomy",
    "Health Education",
    "Clinical Research",
    "Medical Coding",
    "Telemedicine",
    "Nutrition Counseling",
    // Legal
    "Legal Research",
    "Contract Negotiation",
    "Litigation",
    "Mediation",
    "Legal Writing",
    "Compliance",
    "Corporate Law",
    "Intellectual Property",
    "Employment Law",
    "Dispute Resolution",
    // Customer Service
    "Customer Support",
    "Client Relationship Management",
    "Call Center Operations",
    "Problem Resolution",
    "Account Management",
    "Order Processing",
    "Customer Onboarding",
    "Feedback Management",
    "Service Level Agreements (SLA)",
    "Product Support",
    // Languages
    "English",
    "French",
    "Spanish",
    "German",
    "Mandarin",
    "Arabic",
    "Japanese",
    "Portuguese",
    "Russian",
    "Hindi",
  ];

  useEffect(() => {
    if (isSkillsEmpty || skills.length === 0) {
      setErrorDisplay("block");
    } else {
      setErrorDisplay("invisible");
    }
  }, [isSkillsEmpty, skills]);

  /**
   * Handles key down events in the input field to add a skill when Enter is pressed.
   * @param {KeyboardEvent} event - The keydown event.
   */
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      const newSkills = [...skills, inputValue.trim()];
      onChangeSkill(newSkills); // Update skills in the parent component
      setInputValue("");
    }
  };

  /**
   * Adds a suggested skill to the user's skills list if it is not already included.
   * @param {string} skillToAdd - The skill to be added.
   */
  const addSkill = (skillToAdd) => {
    if (!skills.includes(skillToAdd)) {
      const newSkills = [...skills, skillToAdd];
      onChangeSkill(newSkills);
    }
  };

  /**
   * Removes a skill from the user's skills list.
   * @param {string} skillToRemove - The skill to be removed.
   */
  const removeSkill = (skillToRemove) => {
    const newSkills = skills.filter((skill) => skill !== skillToRemove);
    onChangeSkill(newSkills); // Update skills in the parent component
  };

  return (
    <div>
      <SectionHeading
        title="Select your skills"
        desc="Enter your skills below and press Enter."
      />
      <div className="flex flex-col">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Local input state
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter"
          className="border p-2 rounded-lg mb-4"
        />

        {/* Display Selected Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-2 text-white"
              >
                &times;
              </button>
            </span>
          ))}
        </div>

        {/* Suggested Skills Section with Max Height and Scroll */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Suggested Skills:</h3>
          <div
            className="max-h-40 overflow-y-auto border rounded-md p-2 scroll-skills"
            style={{ backgroundColor: "#f8f8f8" }} // Light gray background for better visibility
          >
            <div className="flex flex-wrap gap-2">
              {suggestedSkills.map((suggestedSkill, index) => (
                <div
                  key={index}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full flex items-center cursor-pointer"
                >
                  {suggestedSkill}
                  <a
                    onClick={() => addSkill(suggestedSkill)}
                    className="ml-2 text-blue-600 font-bold cursor-pointer"
                  >
                    +
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div
          className={`${errorDisplay} font-medium text-[#ed3548] mt-5 text-center`}
        >
          Please enter at least one skill!
        </div>
      </div>
    </div>
  );
}
