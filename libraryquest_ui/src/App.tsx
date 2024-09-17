import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [libraries, setLibraries] = useState([]);

  useEffect(() => {
    const getAllLibraries = async () => {
      const res = await axios.get("http://localhost:8000/api/libraries/");
      setLibraries(res.data);
    };
    getAllLibraries();
  }, []);

  const LibraryAddress = (props) => {
    return (
      <div key={props.id} className="library">
        <div className="library-address">{props.address}</div>
        <div className="library-latlon">{props.lat}, {props.lon}</div>
      </div>
    )
  }

  return (
    <>
      <h1>Library Quest</h1>
      {
        libraries.map(LibraryAddress)
      }
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
