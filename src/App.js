import logo from "./logo.svg";
import "./App.css";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  const [unformatted, setUnformatted] = useState("");
  const [formatted, setFormatted] = useState("");

  const format = () => {
    console.log("FORMATTING");
    console.log("un" + unformatted);
    setFormatted(unformatted);
  };

  const updateUnformatted = (event) => {
    setUnformatted(event.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="m-5">
          <label>Unformatted Menu</label>
          <textarea
            id="input"
            className="form-control"
            onKeyUp={updateUnformatted}
          />
          <button className="btn btn-primary" onClick={format}>
            Format!
          </button>
        </div>
        <div className="m-5">
          <label>Formatted Menu</label>
          <textarea id="output" className="form-control" value={formatted} />
        </div>
      </div>
    </div>
  );
}

export default App;
