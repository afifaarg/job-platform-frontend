import React, { useState, useEffect } from "react"; // Import React library and useState
import FormField from "./FormField"; // Reusing the FormField component for consistency in input fields
import SectionHeading from "./SectionHeading"; // Importing SectionHeading component for section titles

/**
 * LoginInformations component renders a form for user login information.
 * It includes fields for username, password, and password confirmation.
 * The component utilizes FormField for each input field to ensure consistency
 * and validation handling.
 *
 * @param {Object} loginDetails - The current state of login details including username, password, and confirm password.
 * @param {function} onChangeLoginDetails - Callback function to handle changes in login fields.
 * @param {boolean} isLoginEmpty - Indicates if any required login field is empty, used for validation.
 */
export default function LoginInformations({
  loginDetails,
  onChangeLoginDetails,
  isLoginEmpty,
}) {
  const [passwordError, setPasswordError] = useState(""); // State to hold password error message

  // Effect to validate password and confirm password
  useEffect(() => {
    if (loginDetails.password && loginDetails.confirm_password) {
      if (loginDetails.password !== loginDetails.confirm_password) {
        setPasswordError("Passwords do not match."); // Set error message if passwords do not match
      } else {
        setPasswordError(""); // Clear error message if passwords match
      }
    } else {
      setPasswordError(""); // Clear error message if fields are empty
    }
  }, [loginDetails.password, loginDetails.confirm_password]);

  return (
    <div>
      {/* Section heading for the login information */}
      <SectionHeading
        title="Login Information"
        desc="Please provide your login credentials."
      />
      {/* Form for capturing login credentials */}
      <form className="space-y-4 p-4">
        {/* Grid layout for input fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Input field for username */}
          <FormField
            onChangeYourInfo={onChangeLoginDetails} // Handler for input changes
            name="username" // Name attribute for username input
            label="Username" // Label for the username input
            placeholder="e.g. john_doe" // Placeholder text for the username input
            value={loginDetails.username} // Current value of the username
            isEmpty={isLoginEmpty} // Indicates if the field is empty for validation
            type="text" // Type of input
          />

          {/* Input field for password */}
          <FormField
            onChangeYourInfo={onChangeLoginDetails} // Handler for input changes
            name="password" // Name attribute for password input
            label="Password" // Label for the password input
            placeholder="Enter your password" // Placeholder text for the password input
            value={loginDetails.password} // Current value of the password
            isEmpty={isLoginEmpty} // Indicates if the field is empty for validation
            type="password" // Type of input (password)
          />

          {/* Input field for confirming password */}
          <FormField
            onChangeYourInfo={onChangeLoginDetails} // Handler for input changes
            name="confirm_password" // Name attribute for confirm password input
            label="Confirm Password" // Label for the confirm password input
            placeholder="Re-enter your password" // Placeholder text for the confirm password input
            value={loginDetails.confirm_password} // Current value of the confirm password
            isEmpty={isLoginEmpty} // Indicates if the field is empty for validation
            type="password" // Type of input (password)
          />
        </div>
        {/* Error message for password mismatch */}
        {passwordError && <p className="text-red-500">{passwordError}</p>}
      </form>
    </div>
  );
}
