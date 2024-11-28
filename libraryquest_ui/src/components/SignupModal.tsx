import { SignupForm } from "./SignupForm";

export const SignupModal = (props: {
  handleUsernameChange: any;
  handlePasswordChange: any;
  handleSignup: any;
  closeSignupWindow: any;
  show: boolean;
}) => {
  const showHideClassName = props.show
    ? "modal display-block"
    : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="login-modal">
        <SignupForm
          handleUsernameChange={props.handleUsernameChange}
          handlePasswordChange={props.handlePasswordChange}
          handleSignup={props.handleSignup}
          closeSignupWindow={props.closeSignupWindow}
        />
      </section>
    </div>
  );
};
