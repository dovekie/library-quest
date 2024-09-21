import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { LibraryAddress } from "./components/LibraryAddress";
import { MapBox } from "./mapInterface/MapBox";
import { ILibraryAddress } from "./types/ILibraryAddress";

function App() {
  const [count, setCount] = useState(0);
  const [libraries, setLibraries] = useState([] as ILibraryAddress[]);

  useEffect(() => {
    const getAllLibraries = async () => {
      const res = await axios.get("http://localhost:8000/api/libraries/");
      setLibraries(res.data);
    };
    getAllLibraries();
  }, [] );

  return (
    <>
      <h1>Library Quest</h1>
      {libraries.map(LibraryAddress)}
      <MapBox libraries={libraries} />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
