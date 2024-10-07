export const Header = (props: { name: string; loggedIn: boolean, handleLogout: any}) => (
  <>
    <header className="header">
      {props.loggedIn && <div><span className="header--welcome-name">Welcome, {props.name}!</span>
      <button className="header--logout" onClick={props.handleLogout}>log out</button></div>}
    </header>
  </>
);
