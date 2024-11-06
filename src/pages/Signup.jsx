import React, { useEffect, useState } from "react";
import YourInfo from "../components/YourInfo";
import Skills from "../components/Skills";
import Education from "../components/Education";
import Experience from "../components/Experience";
import Step from "../components/Step";
import Thankyou from "../components/Thankyou";
import LoginInformations from "../components/Logininformations";
import { Link } from "react-router-dom";
import axios from "axios";
import PersonalInfo from "../components/PersonalInfo";
import ProfessionalInfo from "../components/ProfessionalInfo";

export default function Signup() {
  // States
  const [stepNumber, setStepNumber] = useState(1);
  const [goBackVisible, setGoBackVisible] = useState("invisible");

  const [steps, setSteps] = useState([
    { id: 1, title: "General Info", active: true },
    { id: 2, title: "Education", active: false },
    { id: 3, title: "Skills", active: false },
    { id: 4, title: "Experience", active: false },
    { id: 5, title: "Projects", active: false },
    { id: 6, title: "Extra Info", active: false },
    { id: 7, title: "Login Informations", active: false },
  ]);

  // State management for forms
  const [yourInfo, setYourInfo] = useState({
    name: "",
    email: "",
    phone: "",
    currentAddress: "",
    currentAddress1: "",
    currentAddress2: "",
    countryC: "",
    cityC: "",
    stateC: "",
    pinCodeC: "",
    permanentAddress: "",
    permanentAddress1: "",
    permanentAddress2: "",
    countryP: "",
    pinCodeP: "",
    cityP: "",
    stateP: "",
    profile_pic: "",
    gender: "",
    birth_Date: "",
  });

  const [isEmpty, setIsEmpty] = useState(false);
  const [yourPersonalInfo, setYourPersonalInfo] = useState({});

  const [professionalInfo, setProfessionalInfo] = useState({
    github_link: "",
    linkedin_link: "",
    portfolio_link: "",
    resume_file: "",
    proficiency: "",
  });
  const [isPersonalEmpty, setIsPersonalEmpty] = useState(false);
  const [isProfessionalEmpty, setIsProfessionalEmpty] = useState(false);

  const [skills, setSkills] = useState([]);
  const [isSkillsEmpty, setIsSkillsEmpty] = useState(false);

  const [educations, setEducations] = useState([
    {
      name: "",
      degree: "",
      field: "",
      start_date: "",
      description: "",
      end_date: "",
    },
  ]);
  const [isEducationsEmpty, setIsEducationsEmpty] = useState(false);

  const [experiences, setExperiences] = useState([
    {
      job_title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      responsibilities: "",
    },
  ]);

  const [isExperiencesEmpty, setIsExperiencesEmpty] = useState(false);

  const [loginInfomations, setloginInfomations] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });
  const [isLoginInfoEmpty, setIsLoginInfoEmpty] = useState(false);

  const [displayThankyou, setDisplayThankyou] = useState(false);

  useEffect(() => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => ({ ...step, active: step.id === stepNumber }))
    );
    setGoBackVisible(stepNumber > 1 ? "visible" : "invisible");
  }, [stepNumber]);

  const submitForm = async () => {
    try {
      const payload = {
        username: loginInfomations.username,
        password: loginInfomations.password,
        name: yourInfo.name,
        email: yourInfo.email,
        phone: yourInfo.phone,
        country: yourInfo.country,
        city: yourInfo.city,
        description: yourPersonalInfo.description,
        github_link: professionalInfo.github_link,
        linkedin_link: professionalInfo.linkedin_link,
        portfolio_link: professionalInfo.portfolio_link,
        resume_file: professionalInfo.resume_file,
        proficiency: professionalInfo.proficiency,
        profile_pic: yourPersonalInfo.profile_pic,
        gender: yourPersonalInfo.gender,
        birth_Date: yourPersonalInfo.birth_Date,
        skills: skills, // Assuming each skill is a string
        educations: educations.map((education) => ({
          degree: education.degree,
          field: education.field,
          institution: education.institution,
          start_date: education.start_date,
          end_date: education.end_date,
          description: education.description,
        })), // Ensure educations is an array of objects with correct fields
        experiences: experiences.map((experience) => ({
          job_title: experience.job_title,
          company: experience.company,
          location: experience.location,
          start_date: experience.start_date,
          end_date: experience.end_date,
          responsibilities: experience.responsibilities,
        })), // Ensure experiences is an array of objects with correct fields
      };

      // Axios POST request to the Django backend
      const response = await axios.post(
        "https://job-platform-api-1.onrender.com/backendAPI/users/",
        payload, // Send the payload as is, no need to stringify
        {
          headers: {
            "Content-Type": "application/json", // Set content type for Django
          },
        }
      );

      // Handle success
      if (response.status === 201) {
        setDisplayThankyou(true);
      } else {
        alert("Error submitting form:", response.status, response.data);
      }
    } catch (error) {
      // Detailed error handling
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error response:", error.response.data);
        alert(
          `Error: ${error.response.data.detail || "Something went wrong!"}`
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response from server:", error.request);
      } else {
        // Something else happened
        console.error("Error:", error.message);
      }
    }
  };

  const nextStep = () => {
    // if (
    //   stepNumber === 1 &&
    //   Object.values(yourInfo).some((value) => value.length === 0)
    // ) {
    //   // setIsEmpty(true);
    //   return;
    // }
    // setIsEmpty(false);

    // if (stepNumber === 2 && yourPersonalInfo.length === 0) {
    //   setIsSkillsEmpty(true);
    //   return;
    // }
    // if (stepNumber === 3 && professionalInfo.length === 0) {
    //   setIsSkillsEmpty(true);
    //   return;
    // }
    // if (stepNumber === 4 && skills.length === 0) {
    //   setIsSkillsEmpty(true);
    //   return;
    // }
    // setIsSkillsEmpty(false);

    // if (stepNumber === 5 && educations.length === 0) {
    //   setIsEducationsEmpty(true);
    //   return;
    // }
    // setIsEducationsEmpty(false);

    // if (stepNumber === 6 && experiences.length === 0) {
    //   setIsExperiencesEmpty(true);
    //   return;
    // }
    // setIsExperiencesEmpty(false);

    // if (
    //   (stepNumber === 7 &&
    //     Object.values(loginInfomations).some((value) => value.length === 0)) ||
    //   loginInfomations.password !== loginInfomations.confirm_password // Check if passwords match
    // ) {
    //   setIsLoginInfoEmpty(true);
    //   return;
    // }
    // setIsLoginInfoEmpty(false);
    console.log(stepNumber);
    // Submit form on the last step
    if (stepNumber === 7) {
      submitForm();
    } else {
      setStepNumber((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    setStepNumber((prevStep) => prevStep - 1);
  };

  const changeYourInfo = (event) => {
    const { name, value } = event.target;
    setYourInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };
  const changeYourPersonalInfo = (event) => {
    const { name, value } = event.target;
    setYourPersonalInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };
  const changeYourProfessionalInfo = (event) => {
    const { name, value } = event.target;
    setProfessionalInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSkillChange = (newSkills) => {
    setSkills(newSkills);
  };

  const handleEducationChange = (newEducation) => {
    setEducations(newEducation);
  };

  const handleExperienceChange = (newExperience) => {
    setExperiences(newExperience);
  };

  const handleLoginInfoChange = (event) => {
    const { name, value } = event.target;
    setloginInfomations((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  return (
    <div className="container my-4 mx-auto shadow-lg rounded-xl">
      <div className="rounded-xl p-0 md:p-3 flex flex-col md:flex-row justify-between ">
        {/* Sidebar with Steps */}
        <div className="bg-[#F7FBFF] md:w-1/4 flex flex-col justify-between  p-4 py-6 border rounded-lg shadow-lg">
          <div className="flex flex-col space-y-12 items-center ">
            <div className="bg-[#000066] rounded-lg px-2 flex items-center justify-center">
              <span className="text-lg text-white font-bold">Employee ID</span>
            </div>

            <div className="grid gap-2 ">
              {steps.map((step) => (
                <Step
                  key={step.id}
                  number={step.id}
                  title={step.title}
                  active={step.active}
                />
              ))}
            </div>
          </div>
          <div className=" ">
            <Link
              to="/"
              className="bg-[#000066] text-center font-bold inline-block w-full border hover:border-[#000066] hover:bg-white hover:text-[#000066]  text-white px-6 py-2 rounded-full"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Main Form Area */}
        <div className="flex flex-col justify-between w-full bg-white py-10 px-8 rounded-r-lg">
          {displayThankyou ? (
            <Thankyou />
          ) : (
            <>
              <div>
                {stepNumber === 1 && (
                  <YourInfo
                    onChangeYourInfo={changeYourInfo}
                    yourInfo={yourInfo}
                    currentStep={stepNumber}
                    isEmpty={isEmpty}
                  />
                )}
                {stepNumber === 2 && (
                  <Education
                    currentStep={stepNumber}
                    educations={educations}
                    isEducationEmpty={isEducationsEmpty}
                    onChangeEducationInfo={handleEducationChange}
                  />
                )}
                {/* {stepNumber === 3 && (
                  <ProfessionalInfo
                    onChangeYourInfo={changeYourProfessionalInfo}
                    yourInfo={professionalInfo}
                    currentStep={stepNumber}
                    isEmpty={isProfessionalEmpty}
                  />
                )} */}
                {stepNumber === 3 && (
                  <Skills
                    currentStep={stepNumber}
                    skills={skills}
                    isSkillsEmpty={isSkillsEmpty}
                    onChangeSkill={handleSkillChange}
                  />
                )}
                {/* {stepNumber === 5 && (
                 
                )} */}
                {stepNumber === 4 && (
                  <Experience
                    currentStep={stepNumber}
                    experiences={experiences}
                    isExperienceEmpty={isExperiencesEmpty}
                    onChangeExperienceInfo={handleExperienceChange}
                  />
                )}
                {stepNumber === 5 && <p>Projects section ongoing ...</p>}
                {stepNumber === 6 && <p>Social & Extra section ongoing ...</p>}
                {stepNumber === 7 && (
                  <LoginInformations
                    currentStep={stepNumber}
                    loginDetails={loginInfomations}
                    isLoginEmpty={isLoginInfoEmpty}
                    onChangeLoginDetails={handleLoginInfoChange}
                  />
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-center w-1/2 mx-auto gap-2 items-center mt-10 border-t border-gray-200 pt-4">
                <button
                  className="flex   items-center text-center text-[#000066] font-bold w-36 hover:text-white  bg-white hover:bg-[#000066] border border-[#000066] px-8 py-2 rounded-md shadow-sm"
                  onClick={prevStep}
                >
                  <span className="mr-2">
                    {" "}
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                    >
                      <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" />
                    </svg>
                  </span>{" "}
                  <span>Back</span>
                </button>
                <button
                  className="flex items-center justify-center text-white bg-[#000066]  text-center font-bold   w-36 border hover:border-[#000066] hover:bg-white hover:text-[#000066]  px-8 py-2 rounded-md  shadow-lg"
                  onClick={nextStep}
                  disabled={isLoginInfoEmpty}
                >
                  Continue{" "}
                  <span className="ml-2">
                    {" "}
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                    >
                      <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" />
                    </svg>
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
