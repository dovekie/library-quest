import { LoginForm } from "./LoginForm";

export const Header = (props: {
  name: string | null;
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
        <LoginForm
          handleUsernameChange={props.handleUsernameChange}
          handlePasswordChange={props.handlePasswordChange}
          handleLogin={props.handleLogin}
        />
      )}
      <div className="header--title">
        <h1 className="banner-text">Library Quest</h1>
      </div>
    </header>
  </>
);
