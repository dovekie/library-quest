import { Button } from "./Button";

export const ForgotPasswordForm = (props: {
  handleForgotPassword: any;
  closeForgotPasswordWindow: any;
}) => {
  return (
    <form className="modal--form" method="post">
      <div>
        <label>
          Send a reset email to{" "}
          <input name="email"/>
        </label>
      </div>
      <Button id="submit-forgot-password" onClick={props.handleForgotPassword} label="Submit" />
      <Button
        id="cancel-forgot-password"
        onClick={props.closeForgotPasswordWindow}
        label="Cancel"
      />
    </form>
  );
};
