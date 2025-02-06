import { ILibraryAddress } from "./ILibraryAddress";
import { IReader } from "./IReader";

export type TAction =
  | { type: "load-libraries"; payload: ILibraryAddress[] }
  | { type: "set-reader"; payload: IReader | null }
  | { type: "set-username"; payload: string }
  | { type: "set-password"; payload: string }
  | { type: "show-login-modal" }
  | { type: "show-signup-modal" }
  | { type: "show-reset-modal" }
  | { type: "hide-modals" }
  | { type: "reset-login" };
