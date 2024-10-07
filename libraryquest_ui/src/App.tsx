import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { MapBox } from "./mapInterface/MapBox";
import { ILibraryAddress } from "./types/ILibraryAddress";
import { IReader } from "./types/IReader";
import { Header } from "./components/Header";

function App() {
  const [libraries, setLibraries] = useState([] as ILibraryAddress[]);
  const [reader, setReader] = useState({} as IReader);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const getAllLibraries = async () => {
      const res = await axios.get("http://localhost:8000/api/libraries/");
      setLibraries(res.data);
    };
    getAllLibraries();
  }, []);

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:8000/auth/jwt/create", {
      username,
      password,
    });
    setToken(res.data.access);
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
      <Header name={reader?.name} loggedIn={reader.name ? true : false} />
      <main>
        <h1>Library Quest</h1>
        <form>
          <input name="username" onInput={handleUsernameChange}></input>
          <input name="password" onInput={handlePasswordChange}></input>
          <button type="button" onClick={handleLogin}>
            Submit
          </button>
        </form>
        <MapBox libraries={libraries} reader={reader} />
      </main>
    </>
  );
}

export default App;
