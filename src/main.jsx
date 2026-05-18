import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
//import Study from "./StudyMode.jsx";
class Study extends React.Component {}

class ModeManager extends React.Component {
  state = {
    studyMode: false,
  };
  render() {
    return (
      <>
        <button
          onClick={() => {
            this.setState({ studyMode: !this.state.studyMode });
          }}
        >
          Go to {this.state.studyMode ? "Create" : "Study"} mode
        </button>
        {this.state.studyMode ? <Study /> : <App />}
      </>
    );
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModeManager />
  </StrictMode>,
);
