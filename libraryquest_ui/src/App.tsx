import { jwtDecode, JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
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

function App() {
  const [libraries, setLibraries] = useState([] as ILibraryAddress[]);
  const [reader, setReader] = useState<IReader | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getAllLibraries = async () => {
      const data = await fetchLibraries();
      setLibraries(data);
    };
    getAllLibraries();
  }, []);

  useEffect(() => {
    const refreshJwtToken = async () => {
      const refreshToken = await Cookies.get("refreshToken");
      if (refreshToken) {
        const tokenResponse = await fetchRefreshedJwtToken(refreshToken);
        await getAuthedReader(tokenResponse);
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
    await getAuthedReader(tokenResponse);
  };

  const getAuthedReader = async (tokenResponse: {
    access: string;
    refresh?: string;
  }) => {
    const decoded = jwtDecode(tokenResponse.access) as JwtPayload & {
      user_id: string;
    };
    const reader = await fetchReader(decoded.user_id, tokenResponse.access);
    if (tokenResponse.refresh) {
      Cookies.set("refreshToken", tokenResponse.refresh, {
        sameSite: "none",
        secure: true,
      });
    }
    setReader({ ...reader, token: tokenResponse.access });
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

  const handleUpdateMembership = async (event: any) => {
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
    setReader({ ...updateResponse, token: reader.token });
  };

  const handleLogout = () => {
    Cookies.remove("refreshToken");
    setReader(null);
  };

  const handleUsernameChange = (event: { target: any }) => {
    // FIXME any
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: { target: any }) => {
    // FIXME any
    setPassword(event.target.value);
  };

  return (
    <>
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
        <MapBox
          libraries={libraries}
          reader={reader}
          handleUpdateMembership={handleUpdateMembership}
        />
      </main>
    </>
  );
}

export default App;
