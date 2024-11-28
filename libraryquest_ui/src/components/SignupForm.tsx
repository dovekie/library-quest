import { Button } from "./Button";

export const SignupForm = (props: {
  handleUsernameChange: any;
  handlePasswordChange: any;
  handleSignup: any;
  closeSignupWindow: any;
}) => {
  const signupFields = [
    { fieldText: "Name", fieldName: "name", fieldId: 1 },
    { fieldText: "Username", fieldName: "new_username", fieldId: 2 },
    { fieldText: "Email", fieldName: "email", fieldId: 3 },
    { fieldText: "Password", fieldName: "new_password", fieldId: 4 },
    { fieldText: "Re-type password", fieldName: "re_password", fieldId: 5 },
  ];

  return (
    <form  className="modal--form">
      {signupFields.map((field) => (
        <div key={field.fieldId}>
          <label>
            {field.fieldText} <input name={field.fieldName} />
          </label>
        </div>
      ))}
      <Button
        id="submit-signup"
        onClick={props.handleSignup}
        label="Submit"
      />
      <Button
        id="cancel-signup"
        onClick={props.closeSignupWindow}
        label="Cancel"
      />
    </form>
  );
};
