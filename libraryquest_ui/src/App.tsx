import { jwtDecode, JwtPayload } from "jwt-decode";
import { SetStateAction, useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import { MapBox } from "./mapInterface/MapBox";
import { ILibraryAddress } from "./types/ILibraryAddress";
import { Header } from "./components/Header";
import { IReader } from "./types/IReader";
import {
  fetchLibraries,
  fetchNewJwtToken,
  fetchReader,
  fetchRefreshedJwtToken,
  updateReaderMembership,
} from "./api/apiInterface";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  const [libraries, setLibraries] = useState<ILibraryAddress[]>([]);
  const [reader, setReader] = useState<IReader | null>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // called asynchronously after render
  useEffect(() => {
    const getAllLibraries = async () => {
      const response = await fetchLibraries();
      setLibraries(response.data);
    };
    getAllLibraries();
  }, []);

  useEffect(() => {
    const refreshJwtToken = async () => {
      const refreshToken = await Cookies.get("refreshToken");
      if (refreshToken) {
        const tokenResponse = await fetchRefreshedJwtToken(refreshToken);
        if (tokenResponse.error) {
          await Cookies.remove("refreshToken");
          return;
        }
        await getAuthedReader(tokenResponse.data);
      }
    };
    refreshJwtToken();
  }, []);

  const handleLogin = async () => {
    setUsername("");
    setPassword("");
    const tokenResponse = await fetchNewJwtToken({
      username,
      password,
    });
    if (tokenResponse.data) {
      await getAuthedReader(tokenResponse.data);
    }
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
    setReader({ ...response.data, token: tokenResponse.access });
  };

  const generateNewMembershipZoneList = (
    action: "Add" | "Remove",
    membershipZone: string
  ) => {
    const convertedMembershipZone = Number(membershipZone);
    if (!reader) {
      return;
    }
    if (action === "Add") {
      return [...reader.membership_zone, convertedMembershipZone];
    }
    if (action === "Remove") {
      return reader.membership_zone.filter(
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
    if (!reader || !reader.token) {
      return;
    }
    const decoded = jwtDecode(reader.token) as JwtPayload & {
      user_id: string;
    };
    const updateResponse = await updateReaderMembership(
      decoded.user_id,
      generateNewMembershipZoneList(action, membershipZone),
      reader.token
    );
    setReader({ ...updateResponse.data, token: reader.token });
  };

  const handleLogout = () => {
    Cookies.remove("refreshToken");
    setReader(null);
  };

  const handleUsernameChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <ErrorBoundary>
        <Header
          name={reader ? reader.name : null}
          loggedIn={reader ? true : false}
          handleLogout={handleLogout}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
        />
        <main>
          <h1>Library Quest</h1>
          <Toaster />
          <MapBox
            libraries={libraries}
            reader={reader}
            handleUpdateMembership={handleUpdateMembership}
          />
        </main>
      </ErrorBoundary>
    </>
  );
}

export default App;
