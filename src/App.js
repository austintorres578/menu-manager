import "./App.css";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { findByAltText } from "@testing-library/react";

function App() {
  const [unformatted, setUnformatted] = useState("");
  const [formatted, setFormatted] = useState("");
  const [update, setUpdate] = useState(false);

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
          final.items +=
            "<p><b>" +
            name +
            "</b> " +
            price +
            "<br>" +
            (description ? description + "</p>\n" : "</p>\n");
          name = "";
          price = "";
          description = "";
        }
      }
    }
    console.log(sections);
    setFormatted(sections);
    setUpdate(!update);
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
            className="form-control p-5"
            onKeyUp={updateUnformatted}
          />
          <button className="btn btn-primary" onClick={format}>
            Format!
          </button>
        </div>
        <div className="m-5">
          <label>Formatted Menus</label>
          {formatted &&
            formatted.map((section) => {
              return (
                <div key={section.heading}>
                  <h6>{section.heading}</h6>
                  <textarea
                    id="output"
                    className="form-control p-5"
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
