import { jwtDecode, JwtPayload } from "jwt-decode";
import { useEffect, useReducer } from "react";
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
  updateReaderMembership,
} from "./api/apiInterface";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Modal } from "./components/Modal";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import { IState } from "./types/IState";
import { reducer } from "./reducer";

function App() {

  const initialState: IState = {
    libraries: [],
    reader: null,
    username: "",
    password: "",
    modalShown: false,
    signupModalShown: false,
    resetModalShown: false,
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

  const resetForm = (event?: any) => {
    if (event) {
      event.target.form.reset();
    }
  };

  const handleLogin = async (event?: any) => {
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

  const handleSignup = async (event: { target: any }) => {
    const { target } = event;
    const response = await createUser({
      username: target.form.new_username.value,
      password: target.form.new_password.value,
      re_password: target.form.re_password.value,
      name: target.form.name.value,
      email: target.form.email.value,
    });
    if (response.data) {
      dispatch({ type: "show-signup-modal" });
      const tokenResponse = await fetchNewJwtToken({
        username: target.form.new_username.value,
        password: target.form.new_password.value,
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
    }
  };

  const generateNewMembershipZoneList = (
    action: "Add" | "Remove",
    membershipZone: string
  ) => {
    const convertedMembershipZone = Number(membershipZone);
    if (!state.reader) {
      return;
    }
    if (action === "Add") {
      return [...state.reader.membership_zone, convertedMembershipZone];
    }
    if (action === "Remove") {
      return state.reader.membership_zone.filter(
        (zone) => zone !== convertedMembershipZone
      );
    }
  };

  const handleUpdateMembership = async (event: {
    preventDefault: () => void;
    target: { value: any }[]; // FIXME any
  }) => {
    event.preventDefault();
    const membershipZone = event.target[0].value;
    const action = event.target[1].value;
    if (!state.reader || !state.reader.token) {
      return;
    }
    const decoded = jwtDecode(state.reader.token) as JwtPayload & {
      user_id: string;
    };
    const updateResponse = await updateReaderMembership(
      decoded.user_id,
      generateNewMembershipZoneList(action, membershipZone),
      state.reader.token
    );
    if (updateResponse.data) {
      dispatch({
        type: "set-reader",
        payload: { ...updateResponse.data, token: state.reader.token },
      });
    }
  };

  const handleLogout = () => {
    Cookies.remove("refreshToken");
    dispatch({ type: "set-reader", payload: null });
  };

  const handleUsernameChange = (event: { target: { value: string } }) => {
    dispatch({ type: "set-username", payload: event.target.value });
  };

  const handlePasswordChange = (event: { target: { value: string } }) => {
    dispatch({ type: "set-password", payload: event.target.value });
  };

  const openLoginWindow = () => {
    dispatch({ type: "show-login-modal" });
  };

  const openSignupWindow = () => {
    dispatch({ type: "show-signup-modal" });
  };

  const closeAllModals = (event?: any) => {
    resetForm(event);
    dispatch({ type: "hide-modals" });
  };

  const openPasswordResetForm = (event?: any) => {
    if (event?.target?.form) {
      resetForm(event);
    }
    dispatch({ type: "hide-modals" });
    dispatch({ type: "show-reset-modal" });
  };

  const handleForgotPassword = async (event: { target: any }) => {
    const { target } = event;
    resetPassword(target.form.email.value);
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
          <MapBox
            libraries={state.libraries}
            membershipZones={state.reader?.membership_zone}
            handleUpdateMembership={handleUpdateMembership}
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
