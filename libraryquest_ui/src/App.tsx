import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { MapBox } from "./mapInterface/MapBox";
import { ILibraryAddress } from "./types/ILibraryAddress";
import { IReader } from "./types/IReader";

function App() {
  const [count, setCount] = useState(0);
  const [libraries, setLibraries] = useState([] as ILibraryAddress[]);
  const [reader, setReader] = useState({} as IReader); 

  useEffect(() => {
    const getAllLibraries = async () => {
      const res = await axios.get("http://localhost:8000/api/libraries/");
      setLibraries(res.data);
    };
    getAllLibraries();
  }, [] );

  useEffect(() => {
    const getFirstReader = async () => {
      const res = await axios.get("http://localhost:8000/api/readers/");
      setReader(res.data[0]);
    };
    getFirstReader();
  }, [] );

  return (
    <>
      <h1>Library Quest</h1>
      <div>Welcome, {reader.name}</div>
      <MapBox libraries={libraries} reader={reader} />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
