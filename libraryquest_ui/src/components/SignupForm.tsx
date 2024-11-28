export const SignupForm = (props: {
  handleUsernameChange: any;
  handlePasswordChange: any;
  handleSignup: any;
  closeSignupWindow: any;
}) => (
  <form className="signup-form">
    <div>
      <label className="signup--label">
        Name <input name="name" />
      </label>
    </div>
    <div>
      <label className="signup--label">
        Username <input name="new_username" />
      </label>
    </div>
    <div>
      <label className="signup--label">
        Email <input name="email" />
      </label>
    </div>
    <div>
      <label className="signup--label">
        Password <input name="new_password" />
      </label>
    </div>
    <div>
      <label className="signup--label">
        Re-type password <input name="re_password" />
      </label>
    </div>
    <button className="submit_new_user" type="button" onClick={props.handleSignup}>
      Submit
    </button>
    <button className="cancel" type="button" onClick={props.closeSignupWindow}>
      Cancel
    </button>
  </form>
);
