import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import SimpleReactLightbox from "simple-react-lightbox";
import ThemeContext from "./../src/main/webapp/context/ThemeContext";

ReactDOM.render(
  <React.StrictMode>
    <SimpleReactLightbox>
      <ThemeContext>
        <App />
      </ThemeContext>
    </SimpleReactLightbox>
  </React.StrictMode>,
  document.getElementById("root")
);
