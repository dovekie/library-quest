import { jwtDecode, JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { MapBox } from "./mapInterface/MapBox";
import { ILibraryAddress } from "./types/ILibraryAddress";
import { Header } from "./components/Header";
import { IReader } from "./types/IReader";

function App() {
  const [libraries, setLibraries] = useState([] as ILibraryAddress[]);
  const [reader, setReader] = useState<IReader | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getAllLibraries = async () => {
      const res = await axios.get("http://localhost:8000/api/libraries/");
      setLibraries(res.data);
    };
    getAllLibraries();
  }, []);

  const handleLogin = async () => {
    setUsername("");
    setPassword("");
    const tokenResponse = await axios.post(
      "http://localhost:8000/auth/jwt/create",
      {
        username,
        password,
      }
    );
    const decoded = jwtDecode(tokenResponse.data.access) as JwtPayload & {
      user_id: string;
    };
    const readerResponse = await axios.get(
      `http://localhost:8000/api/readers/${decoded.user_id}/`,
      { headers: { Authorization: `JWT ${tokenResponse.data.access}` } }
    );
    setReader({ ...readerResponse.data, token: tokenResponse.data.access });
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
    console.log(generateNewMembershipZoneList(action, membershipZone));
    if (!reader || !reader.token) {
      return;
    }
    const decoded = jwtDecode(reader.token) as JwtPayload & {
      user_id: string;
    };
    const updateResponse = await axios.patch(
      `http://localhost:8000/api/readers/${decoded.user_id}/`,
      {
        membership_zone: generateNewMembershipZoneList(action, membershipZone),
      },
      { headers: { Authorization: `JWT ${reader.token}` } }
    );
    setReader({ ...updateResponse.data, token: reader.token });
  };

  const handleLogout = () => {
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
