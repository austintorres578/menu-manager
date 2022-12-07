import "./App.css";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  const [unformatted, setUnformatted] = useState("");
  const [formatted, setFormatted] = useState("");
  const [update, setUpdate] = useState(false);
  const [formatter, setFormatter] = useState(
    "<p><b>[name]</b>[price]<br>[description]</p>\n"
  );

  const [optionsMenu, toggleOptions] = useState(false);

  const format = () => {
    console.log("FORMATTING");
    // console.log("un" + unformatted);
    let lines = unformatted.split("\n");
    console.log(lines.length);
    let final = {
      heading: "",
      items: "",
    };
    let sections = [];
    let heading = "";
    let name = "";
    let description = "";
    let price = "";
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].length > 0) {
        lines[i] = lines[i].trim();
        // Heading
        if (lines[i].toUpperCase() === lines[i] && !lines[i].includes("$")) {
          heading = lines[i];
          console.log(final);
          if (final.heading.length > 0) {
            sections.push({ heading: final.heading, items: final.items });
          }
          final.items = "";
          final.heading = heading;
          name = "";
          price = "";
          description = "";
          // Check if the heading has a description
          continue;
        }
        // Name
        if (name === "" && !lines[i].includes("$")) {
          name = lines[i];
          continue;
        }
        // Description
        if (description === "" && !lines[i].includes("$")) {
          description = lines[i];
          continue;
        }
        if (lines[i].includes("$")) {
          price += lines[i];
          final.items += formatter
            .replace("[name]", name)
            .replace("[price]", price)
            .replace("[description]", description);
          name = "";
          price = "";
          description = "";
        }
      }
    }
    sections.push({ heading: final.heading, items: final.items });
    console.log(sections);
    setFormatted(sections);
    setUpdate(!update);
  };

  const updateUnformatted = (event) => {
    setUnformatted(event.target.value);
  };

  const updateFormatter = (event) => {
    setFormatter(event.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row mt-5">
          <div className="col-1">
            <button
              className="btn btn-primary"
              onClick={() => {
                toggleOptions(!optionsMenu);
              }}
            >
              {optionsMenu ? <>&#x25B2;</> : <>&#x25BC;</>}
            </button>
          </div>
          {optionsMenu && (
            <div className="col-11">
              <div className="col-6">
                <label>Formatter Output:</label>
                <br />
                <textarea row="3" value={formatter} disabled className="m-1" />
                <textarea
                  id="output"
                  rows="10"
                  className="form-control"
                  onKeyUp={updateFormatter}
                />
              </div>
              <div className="col-6"></div>
            </div>
          )}
        </div>
        <div className="m-1">
          <label>Unformatted Menu</label>
          <textarea
            id="input"
            rows="10"
            style={{ height: "100%" }}
            className="form-control"
            onKeyUp={updateUnformatted}
          />
          <button className="btn btn-primary" onClick={format}>
            Format!
          </button>
        </div>
        <div className="m-1">
          <label>Formatted Menus</label>
          {formatted &&
            formatted.map((section) => {
              return (
                <div key={section.heading}>
                  <h6>{section.heading}</h6>
                  <textarea
                    id="output"
                    rows="10"
                    style={{ height: "100%" }}
                    className="form-control"
                    value={section.items}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
