import { ILibraryAddress } from "./ILibraryAddress";
import { IReader } from "./IReader";

export interface IState {
  /** All library addresses */
  libraries: ILibraryAddress[];
  /** the current reader */
  reader: IReader | null;
  /** username and password, for login purposes */
  username: string;
  password: string;
  /** show or hide the login window  */
  modalShown: boolean;
  /** show or hide the signup window  */
  signupModalShown: boolean;
  /** show or hide the reset password window  */
  resetModalShown: boolean;
  /** ids of libraries matching the user's search string */
  searchResults: string[] | null;
}
