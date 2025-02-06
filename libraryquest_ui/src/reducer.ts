import { IState } from "./types/IState";
import { TAction } from "./types/TAction";

export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {
    case "load-libraries": {
      return {...state, libraries: action.payload};
    }
    case "set-reader": {
      return {...state, reader: action.payload};
    }
    case "set-username": {
      return {...state, username: action.payload};
    }
    case "set-password": {
      return {...state, password: action.payload};
    }
    case "show-login-modal": {
      return {...state, modalShown: !state.modalShown};
    }
    case "show-signup-modal": {
        return {...state, signupModalShown: !state.signupModalShown};
    }
    case "show-reset-modal": {
        return {...state, resetModalShown: !state.resetModalShown};
    }
    case "hide-modals": {
        return {...state, modalShown: false, signupModalShown: false, resetModalShown: false };
    }
    case "reset-login": {
        return {...state, username: "", password: ""}
    }
  }
};
