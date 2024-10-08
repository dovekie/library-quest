export const Header = (props: {
  name: string;
  loggedIn: boolean;
  handleLogout: any;
  handleUsernameChange: any;
  handlePasswordChange: any;
  handleLogin: any;
}) => (
  <>
    <header className="header">
      {props.loggedIn && (
        <div>
          <span className="header--welcome-name">Welcome, {props.name}!</span>
          <button className="header--logout" onClick={props.handleLogout}>
            log out
          </button>
        </div>
      )}
      {!props.loggedIn && (
        <form>
          <label>
            Username: <input name="username" onInput={props.handleUsernameChange} />
          </label>
          <label>
            Password: <input name="password" onInput={props.handlePasswordChange} />
          </label>
          <button type="button" onClick={props.handleLogin}>
            Submit
          </button>
        </form>
      )}
    </header>
  </>
);
