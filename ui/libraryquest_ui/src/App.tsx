import { jwtDecode, JwtPayload } from "jwt-decode";
import { FormEvent, useEffect, useReducer } from "react";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { MapBox } from "./mapInterface/MapBox";
import { Header } from "./components/Header";
import {
  createUser,
  fetchLibraries,
  fetchNewJwtToken,
  fetchReader,
  fetchRefreshedJwtToken,
  resetPassword,
  searchForLibrary,
  updateReaderMembership,
} from "./api/apiInterface";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Modal } from "./components/Modal";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import { IState } from "./types/IState";
import { reducer } from "./reducer";
import { EMembershipAction } from "./types/EMembershipAction";
import { getFormValue } from "./util/getFormValue";
import { Button } from "./components/Button";

function App() {
  const initialState: IState = {
    libraries: [],
    membershipZones: [],
    reader: null,
    username: "",
    password: "",
    modalShown: false,
    signupModalShown: false,
    resetModalShown: false,
    searchResults: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // called asynchronously after render
  useEffect(() => {
    const getAllLibraries = async () => {
      const response = await fetchLibraries();
      if (response.data) {
        dispatch({ type: "load-libraries", payload: response.data });
      }
    };
    getAllLibraries();
  }, []);

  useEffect(() => {
    const refreshJwtToken = async () => {
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        const tokenResponse = await fetchRefreshedJwtToken(refreshToken);
        if (tokenResponse.error) {
          Cookies.remove("refreshToken");
          return;
        }
        if (tokenResponse.data) {
          await getAuthedReader(tokenResponse.data);
        }
      }
    };
    refreshJwtToken();
  }, []);

  const resetForm = (event?: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.currentTarget.form.reset();
    }
  };

  const handleLogin = async (event?: FormEvent<HTMLFormElement>) => {
    dispatch({ type: "reset-login" });
    const tokenResponse = await fetchNewJwtToken({
      username: state.username,
      password: state.password,
    });
    if (tokenResponse.data) {
      closeAllModals();
      await getAuthedReader(tokenResponse.data);
    }
    resetForm(event);
  };

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    const { currentTarget } = event;
    const response = await createUser({
      username: currentTarget.form.new_username.value,
      password: currentTarget.form.new_password.value,
      re_password: currentTarget.form.re_password.value,
      name: currentTarget.form.name.value,
      email: currentTarget.form.email.value,
    });
    if (response.data) {
      dispatch({ type: "show-signup-modal" });
      const tokenResponse = await fetchNewJwtToken({
        username: currentTarget.form.new_username.value,
        password: currentTarget.form.new_password.value,
      });
      if (tokenResponse.data) {
        await getAuthedReader(tokenResponse.data);
      }
    }
    resetForm(event);
  };

  const getAuthedReader = async (tokenResponse: {
    access: string;
    refresh?: string;
  }) => {
    const decoded = jwtDecode(tokenResponse.access) as JwtPayload & {
      user_id: string;
    };
    const response = await fetchReader(decoded.user_id, tokenResponse.access);
    if (tokenResponse.refresh) {
      Cookies.set("refreshToken", tokenResponse.refresh, {
        sameSite: "none",
        secure: true,
      });
    }
    if (response.data) {
      dispatch({
        type: "set-reader",
        payload: { ...response.data, token: tokenResponse.access },
      });
      dispatch({
        type: "set-membership-zones",
        payload: response.data.membership_zone,
      });
    }
  };

  const generateNewMembershipZoneList = (
    action: EMembershipAction,
    membershipZone: string
  ) => {
    const convertedMembershipZone = Number(membershipZone);
    if (action === "Add") {
      return [...state.membershipZones, convertedMembershipZone];
    }
    // else "Remove"
    return state.membershipZones.filter(
      (zone) => zone !== convertedMembershipZone
    );
  };

  const handleUpdateMembership = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const membershipZone = getFormValue<string>(event, "membershipZone");
    const action = getFormValue<EMembershipAction>(event, "actionType");
    const newMembershipZoneList = generateNewMembershipZoneList(
      action,
      membershipZone
    );
    dispatch({ type: "set-membership-zones", payload: newMembershipZoneList });
    if (state.reader && state.reader.token) {
      const decoded = jwtDecode(state.reader.token) as JwtPayload & {
        user_id: string;
      };
      const updateResponse = await updateReaderMembership(
        decoded.user_id,
        newMembershipZoneList,
        state.reader.token
      );
      if (updateResponse.data) {
        dispatch({
          type: "set-reader",
          payload: { ...updateResponse.data, token: state.reader.token },
        });
      }
    }
  };

  const handleSearch = async (event: any) => {
    event.preventDefault();
    const searchTerm = event.currentTarget.form
      ? event.currentTarget.form.search_input.value
      : event.target[0].value;
    if (searchTerm === "") {
      dispatch({ type: "update-search", payload: null });
    }
    const response = await searchForLibrary(searchTerm);
    if (response.data) {
      const searchResults = response.data.map((result) => result.id);
      dispatch({ type: "update-search", payload: searchResults });
    }
  };

  const clearSearch = (event: any) => {
    resetForm(event);
    dispatch({ type: "update-search", payload: null });
  };

  const handleLogout = () => {
    Cookies.remove("refreshToken");
    dispatch({ type: "set-reader", payload: null });
  };

  const handleUsernameChange = (event: FormEvent<HTMLFormElement>) => {
    dispatch({
      type: "set-username",
      payload: event.currentTarget.value,
    });
  };

  const handlePasswordChange = (event: FormEvent<HTMLFormElement>) => {
    dispatch({
      type: "set-password",
      payload: event.currentTarget.value,
    });
  };

  const openLoginWindow = () => {
    dispatch({ type: "show-login-modal" });
  };

  const openSignupWindow = () => {
    dispatch({ type: "show-signup-modal" });
  };

  const closeAllModals = (event?: FormEvent<HTMLFormElement>) => {
    resetForm(event);
    dispatch({ type: "hide-modals" });
  };

  const openPasswordResetForm = (event?: FormEvent<HTMLFormElement>) => {
    resetForm(event);
    dispatch({ type: "hide-modals" });
    dispatch({ type: "show-reset-modal" });
  };

  const handleForgotPassword = async (event: FormEvent<HTMLFormElement>) => {
    const { currentTarget } = event;
    resetPassword(currentTarget.form.email.value);
    closeAllModals();
  };

  return (
    <>
      <ErrorBoundary>
        <Header
          name={state.reader ? state.reader.name : null}
          loggedIn={state.reader ? true : false}
          handleLogout={handleLogout}
          openLoginWindow={openLoginWindow}
          openSignupWindow={openSignupWindow}
        />
        <main>
          <Toaster />
          <div>
            <form onSubmit={handleSearch}>
              <label>Search for a library</label>
              <input type="text" name="search_input"></input>
              <Button
                id="submit-library-search"
                onClick={handleSearch}
                label="Search"
              />
              <Button
                id="clear-library-search"
                onClick={clearSearch}
                label="Clear"
              />
            </form>
          </div>
          <MapBox
            libraries={state.libraries}
            membershipZones={state.membershipZones}
            handleUpdateMembership={handleUpdateMembership}
            searchResults={state.searchResults}
          />
          <Modal
            show={state.modalShown}
            children={
              <LoginForm
                closeLoginWindow={closeAllModals}
                handleUsernameChange={handleUsernameChange}
                handlePasswordChange={handlePasswordChange}
                handleLogin={handleLogin}
                openPasswordResetForm={openPasswordResetForm}
              />
            }
          />
          <Modal
            show={state.signupModalShown}
            children={
              <SignupForm
                closeSignupWindow={closeAllModals}
                handleUsernameChange={handleUsernameChange}
                handlePasswordChange={handlePasswordChange}
                handleSignup={handleSignup}
              />
            }
          />
          <Modal
            show={state.resetModalShown}
            children={
              <ForgotPasswordForm
                handleForgotPassword={handleForgotPassword}
                closeForgotPasswordWindow={closeAllModals}
              />
            }
          />
        </main>
      </ErrorBoundary>
    </>
  );
}

export default App;
