import { Button } from "./Button";

export const LoginForm = (props: {
  handleUsernameChange: any;
  handlePasswordChange: any;
  handleLogin: any;
  closeLoginWindow: any;
}) => (
  <form className="modal--form">
    <div>
      <label>
        Username <input name="username" onInput={props.handleUsernameChange} />
      </label>
    </div>
    <div>
      <label>
        Password <input name="password" onInput={props.handlePasswordChange} />
      </label>
    </div>
    <Button id="submit-login" onClick={props.handleLogin} label="Submit" />
    <Button id="cancel-login" onClick={props.closeLoginWindow} label="Cancel" />
  </form>
);
