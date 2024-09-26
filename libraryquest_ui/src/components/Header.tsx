export const Header = (props: { name: string; loggedIn: boolean }) => (
  <>
    <header className="header">
      {props.loggedIn && <div><span className="header--welcome-name">Welcome, {props.name}!</span>
      <span className="header--logout">log out</span></div>}
      {!props.loggedIn && (
        <form method="POST">
          <span>Enter your email to log in: </span>
          <input name="email" type="text" />
        </form>
      )}
    </header>
  </>
);
