export const Header = (props: {
  name: string | null;
  loggedIn: boolean;
  handleLogout: any;
  openLoginWindow: any;
}) => (
  <>
    <header className="header">
      {props.loggedIn && (
        <div className="header--welcome">
          <span className="header--welcome-name">Welcome, {props.name}!</span>
          <button type="button" className="header--logout" onClick={props.handleLogout}>
            log out
          </button>
        </div>
      )}
      {!props.loggedIn && (
        <div className="header--login">
          <button type="button" name="login-button" onClick={props.openLoginWindow}>
            Log In
          </button>
        </div>
      )}
      <div className="header--title">
        <h1 className="banner-text">Library Quest</h1>
      </div>
    </header>
  </>
);
