import React from "react";
import logo from "./logo.svg";

import { usePopWindow, WindowState } from "./usePopWindow";
import "./App.css";

const ExampleComponent: React.FC<{}> = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.tsx</code> and save to reload.
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>
);

function App() {
  const {
    closeWindowPortal,
    openWindowPortal,
    viewState,
    PopWindow,
  } = usePopWindow();

  return (
    <div className="App">
      <header>
        <button onClick={closeWindowPortal}>Close Window</button>
        <button onClick={openWindowPortal}>Open Window</button>
      </header>
      <section>
        {viewState === WindowState.Opened ? (
          <PopWindow>
            <button onClick={closeWindowPortal}>Close Window</button>
            <ExampleComponent />
          </PopWindow>
        ) : (
          <ExampleComponent />
        )}
      </section>
    </div>
  );
}

export default App;
