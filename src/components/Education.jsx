import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import SectionHeading from "./SectionHeading";

export default function Education({
  educations,
  onChangeEducationInfo,
  addEducationInfo,
  removeEducation,
}) {
  const [educationForms, setEducationForms] = useState(educations);

  useEffect(() => {
    setEducationForms(educations);
  }, [educations]);

  const addEducationForm = () => {
    const newForm = {
      educationLevel: "", // New field for education level
      board: "",
      passingOutYear: "",
      schoolMedium: "",
      gradingSystem: "",
      totalMarks: "",
      course: "",
      courseType: "",
      specialization: "",
      institution: "",
      startDate: "",
      endDate: "",
      stillStudying: false,
    };
    const updatedForms = [...educationForms, newForm];
    setEducationForms(updatedForms);
    onChangeEducationInfo(updatedForms);
  };

  const removeEducationForm = (index) => {
    const updatedForms = educationForms.filter((_, i) => i !== index);
    setEducationForms(updatedForms);
    onChangeEducationInfo(updatedForms);
  };

  const handleEducationChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedForms = [...educationForms];
    updatedForms[index][name] = type === "checkbox" ? checked : value;
    setEducationForms(updatedForms);
    onChangeEducationInfo(updatedForms);
  };

  const educationLevels = [
    { value: "", label: "Select Your Education Level" },
    { value: "class10", label: "Class 10" },
    { value: "class12", label: "Class 12" },
    { value: "diploma", label: "Diploma" },
    { value: "graduate", label: "Graduate" },
    { value: "postGraduate", label: "Post Graduate" },
    { value: "doctorate", label: "Doctorate/PHD" },
  ];

  return (
    <div>
      <SectionHeading
        title="Education Information"
        desc="Please fill in the below form."
      />
      <form>
        <div className="block space-y-4 mb-4 max-h-[450px] overflow-y-auto">
          {educationForms.map((form, index) => (
            <div key={index} className="border-b border-gray-300 pb-4 mb-4">
              {/* Education Level Dropdown - shown initially */}
              <div className="mb-4">
                <FormField
                  name="educationLevel"
                  label="Education Level"
                  value={form.educationLevel}
                  type="select"
                  options={educationLevels}
                  onChangeYourInfo={(e) => handleEducationChange(index, e)}
                />
              </div>
              {/* Conditionally render fields based on selected education level */}
              {form.educationLevel && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["class10", "class12"].includes(form.educationLevel) ? (
                    <>
                      <FormField
                        name="board"
                        label="Board"
                        placeholder="Enter board"
                        value={form.board}
                        type="text"
                        onChangeYourInfo={(e) =>
                          handleEducationChange(index, e)
                        }
                      />

                      <FormField
                        name="passingOutYear"
                        label="Passing Out Year"
                        placeholder="e.g. 2020"
                        type="number"
                        onChangeYourInfo={(e) =>
                          handleEducationChange(index, e)
                        }
                      />
                      <FormField
                        name="schoolMedium"
                        label="School Medium"
                        placeholder="e.g. English"
                        value={form.schoolMedium}
                        type="text"
                        onChangeYourInfo={(e) =>
                          handleEducationChange(index, e)
                        }
                      />
                      <FormField
                        name="gradingSystem"
                        label="Grading System"
                        value={form.gradingSystem}
                        type="dropdown"
                        options={[
                          { value: "percentage", label: "Percentage" },
                          { value: "cgpa", label: "CGPA" },
                          { value: "other", label: "Other" },
                        ]}
                        onChangeYourInfo={(e) =>
                          handleEducationChange(index, e)
                        }
                      />
                      <FormField
                        name="totalMarks"
                        label="Total Marks"
                        placeholder="Enter total marks"
                        value={form.totalMarks}
                        type="number"
                        onChangeYourInfo={(e) =>
                          handleEducationChange(index, e)
                        }
                      />
                    </>
                  ) : (
                    <>
                      <FormField
                        name="course"
                        label="Course"
                        placeholder="e.g. Bachelors"
                        value={form.course}
                        type="text"
                        onChangeYourInfo={(e) =>
                          handleEducationChange(index, e)
                        }
                      />
                      <FormField
                        name="courseType"
                        label="Course Type"
                        placeholder="e.g. Full-time"
                        value={form.courseType}
                        type="text"
                        onChangeYourInfo={(e) =>
                          handleEducationChange(index, e)
                        }
                      />
                      <FormField
                        name="specialization"
                        label="Specialization"
                        placeholder="e.g. Computer Science"
                        value={form.specialization}
                        type="text"
                        onChangeYourInfo={(e) =>
                          handleEducationChange(index, e)
                        }
                      />
                      <FormField
                        name="institution"
                        label="Institution"
                        placeholder="e.g. Oxford"
                        value={form.institution}
                        type="text"
                        onChangeYourInfo={(e) =>
                          handleEducationChange(index, e)
                        }
                      />
                      <FormField
                        name="startDate"
                        label="Start Date"
                        value={form.startDate}
                        type="date"
                        onChangeYourInfo={(e) =>
                          handleEducationChange(index, e)
                        }
                      />
                      <FormField
                        name="endDate"
                        label="End Date"
                        value={form.endDate}
                        type="date"
                        disabled={form.stillStudying}
                        onChangeYourInfo={(e) =>
                          handleEducationChange(index, e)
                        }
                      />
                      <FormField
                        name="gradingSystem"
                        label="Grading System"
                        value={form.gradingSystem}
                        type="dropdown"
                        options={[
                          { value: "percentage", label: "Percentage" },
                          { value: "cgpa", label: "CGPA" },
                          { value: "other", label: "Other" },
                        ]}
                        onChangeYourInfo={(e) =>
                          handleEducationChange(index, e)
                        }
                      />
                      <FormField
                        name="totalMarks"
                        label="Total Marks"
                        placeholder="Enter total marks"
                        value={form.totalMarks}
                        type="number"
                        onChangeYourInfo={(e) =>
                          handleEducationChange(index, e)
                        }
                      />
                    </>
                  )}
                </div>
              )}

              <div className="flex items-center justify-start space-x-4 border-t mt-2 py-2">
                <button
                  type="button"
                  className="text-red-500 bg-red-50 flex items-center space-x-2 p-2 rounded-lg hover:shadow-lg font-bold  "
                  onClick={() => removeEducationForm(index)}
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
                  <span>Remove Education</span>
                </button>
                {educationForms.length == index + 1 && (
                  <button
                    type="button"
                    className=" text-[#000066] flex items-center space-x-2 p-2 rounded-lg hover:shadow-lg bg-blue-50 font-bold"
                    onClick={
                      addEducationInfo ? addEducationInfo : addEducationForm
                    }
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
                    <span>Add Another Education</span>
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
