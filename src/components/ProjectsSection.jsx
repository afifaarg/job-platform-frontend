import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import SectionHeading from "./SectionHeading";

/**
 * Projects component allows users to input and manage their project details.
 * It renders a form that can dynamically add or remove project entries.
 * Each project entry includes fields for title, summary, and an optional link.
 */
export default function ProjectsSection({
  projects,
  onChangeProjectInfo,
  isProjectEmpty,
  addProjectInfo,
}) {
  // Initialize the local state with projects prop
  const [projectForms, setProjectForms] = useState(projects || []);

  // Synchronize the local state with the parent projects when the component mounts or projects prop changes
  useEffect(() => {
    setProjectForms(projects);
  }, [projects]);
  console.log("hiiiiiii" + projects);
  // Function to add a new project form to the list
  const addProjectForm = () => {
    const newForm = {
      title: "",
      summary: "",
      link: "",
    };
    const updatedForms = [...projectForms, newForm];
    setProjectForms(updatedForms);
    onChangeProjectInfo(updatedForms); // Update parent state
  };

  // Function to remove a project form from the list
  const removeProjectForm = (index) => {
    const updatedForms = projectForms.filter((_, i) => i !== index);
    setProjectForms(updatedForms);
    onChangeProjectInfo(updatedForms); // Update parent state
  };

  // Function to handle changes in the project form fields
  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...projectForms];
    updatedForms[index][name] = value;
    setProjectForms(updatedForms);
    onChangeProjectInfo(updatedForms); // Update parent state
  };

  return (
    <div>
      <SectionHeading
        title="Project Information"
        desc="Please fill in the details of your projects."
      />
      <form>
        <div className="block space-y-4 mb-6 max-h-[450px] overflow-y-scroll">
          {projectForms.map((form, index) => (
            <div key={index} className="border-b border-gray-300 pb-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  onChangeYourInfo={(e) => handleProjectChange(index, e)}
                  name="title"
                  label="Project Title"
                  placeholder="e.g Portfolio Website"
                  value={form.title}
                  isEmpty={isProjectEmpty}
                  type="text"
                />
                <FormField
                  onChangeYourInfo={(e) => handleProjectChange(index, e)}
                  name="link"
                  label="Project Link (optional)"
                  placeholder="e.g https://github.com/username/project"
                  value={form.link}
                  isEmpty={isProjectEmpty}
                  type="url"
                />
              </div>
              <FormField
                onChangeYourInfo={(e) => handleProjectChange(index, e)}
                name="summary"
                label="Project Summary"
                placeholder="Brief description of the project"
                value={form.summary}
                isEmpty={isProjectEmpty}
                type="long"
              />

              <div className="flex items-center justify-start space-x-4 border-t mt-2 py-2">
                <button
                  type="button"
                  className="text-red-500 bg-red-50 flex items-center space-x-2 p-2 rounded-lg hover:shadow-lg font-bold"
                  onClick={() => removeProjectForm(index)}
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
                      d="M62.998999999999995 32 A30.999 30.999 0 0 1 32 62.998999999999995 A30.999 30.999 0 0 1 1.0010000000000012 32 A30.999 30.999 0 0 1 62.998999999999995 32 z"
                    />
                  </svg>
                  <span>Remove Project</span>
                </button>
                {projectForms.length == index + 1 && (
                  <button
                    type="button"
                    className=" text-[#000066] flex items-center space-x-2 p-2 rounded-lg hover:shadow-lg bg-blue-50 font-bold"
                    onClick={addProjectInfo ? addProjectInfo : addProjectForm}
                  >
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                    >
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
                    <span>Add Another Project</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
