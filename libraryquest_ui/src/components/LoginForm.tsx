export const LoginForm = (props: {
  handleUsernameChange: any;
  handlePasswordChange: any;
  handleLogin: any;
  closeLoginWindow: any;
}) => (
  <form className="login-form">
    <div>
      <label className="login--label">
        Username <input name="username" onInput={props.handleUsernameChange} />
      </label>
    </div>
    <div>
      <label className="login--label">
        Password <input name="password" onInput={props.handlePasswordChange} />
      </label>
    </div>
    <button
      className="login-button submit"
      type="button"
      onClick={props.handleLogin}
    >
      Submit
    </button>
    <button
      className="login-button cancel"
      type="button"
      onClick={props.closeLoginWindow}
    >
      Cancel
    </button>
  </form>
);
