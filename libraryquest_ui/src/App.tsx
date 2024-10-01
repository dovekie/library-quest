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

  useEffect(() => {
    const getAllLibraries = async () => {
      const res = await axios.get("http://localhost:8000/api/libraries/");
      setLibraries(res.data);
    };
    getAllLibraries();
  }, []);

  useEffect(() => {
    const getFirstReader = async () => {
      const res = await axios.get("http://localhost:8000/api/readers/");
      setReader(res.data[0]);
    };
    getFirstReader();
  }, []);

  return (
    <>
      <Header name={reader?.name} loggedIn={reader ? true : false} />
      <main>
        <h1>Library Quest</h1>
        <MapBox libraries={libraries} reader={reader} />
      </main>
    </>
  );
}

export default App;
