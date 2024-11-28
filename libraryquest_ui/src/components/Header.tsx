import { Button } from "./Button";

export const Header = (props: {
  name: string | null;
  loggedIn: boolean;
  handleLogout: any;
  openLoginWindow: any;
  openSignupWindow: any;
}) => (
  <header className="header">
    {props.loggedIn && (
      <div className="header--welcome">
        <span className="header--welcome-name">Welcome, {props.name}!</span>
        <Button
          id="logout-button"
          onClick={props.handleLogout}
          label="Log Out"
        />
      </div>
    )}
    {!props.loggedIn && (
      <div className="header--buttons">
        <div>
          <Button
            id="login-button"
            onClick={props.openLoginWindow}
            label="Log In"
          />
        </div>
        <div>
          <Button
            id="signup-button"
            onClick={props.openSignupWindow}
            label="Sign Up"
          />
        </div>
      </div>
    )}
    <div className="header--title">
      <h1>Library Quest</h1>
    </div>
  </header>
);
