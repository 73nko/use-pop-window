import React, { useEffect, useState } from "react";

import { ExampleComponent } from "./ExampleComponent";

import { usePopWindow, WindowState } from "./usePopWindow";
import "./App.css";

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
        {viewState === WindowState.Opened && (
          <PopWindow>
            <button onClick={closeWindowPortal}>Close Window</button>
            <ExampleComponent />
          </PopWindow>
        )}
        <ExampleComponent />
      </section>
    </div>
  );
}

export default App;
