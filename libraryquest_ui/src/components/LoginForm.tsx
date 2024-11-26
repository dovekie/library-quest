export const LoginForm = (props: {
  handleUsernameChange: any;
  handlePasswordChange: any;
  handleLogin: any;
}) => (
  <form className="login-form">
    <label>
      Username: <input name="username" onInput={props.handleUsernameChange} />
    </label>
    <label>
      Password: <input name="password" onInput={props.handlePasswordChange} />
    </label>
    <button className="login-button" type="button" onClick={props.handleLogin}>
      Submit
    </button>
  </form>
);
