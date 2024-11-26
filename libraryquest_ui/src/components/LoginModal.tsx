import { LoginForm } from "./LoginForm";

export const LoginModal = (props: {
  handleUsernameChange: any;
  handlePasswordChange: any;
  handleLogin: any;
  closeLoginWindow: any;
  show: boolean;
}) => {
  const showHideClassName = props.show
    ? "modal display-block"
    : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="login-modal">
        <LoginForm
          handleUsernameChange={props.handleUsernameChange}
          handlePasswordChange={props.handlePasswordChange}
          handleLogin={props.handleLogin}
          closeLoginWindow={props.closeLoginWindow}
        />
      </section>
    </div>
  );
};
