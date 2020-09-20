import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";

import { copyStyles } from "./copyStyles";

export enum WindowState {
  Closed = "closed",
  Opened = "opened",
}

type windowPortalAction = () => void;

const WindowPortal = (closeWindowPortal: windowPortalAction) => {
  const PopWindow: React.FC<{}> = ({ children }) => {
    const externalWindow = React.useRef(
      window.open("", "", "width=800,height=600,left=200,top=200")
    );

    const containerEl = externalWindow.current?.document.createElement("div");

    useEffect(() => {
      const currentWindow = externalWindow.current;

      if (currentWindow && containerEl) {
        currentWindow.document.body.appendChild(containerEl);
        copyStyles(document, currentWindow.document);
        currentWindow.addEventListener("beforeunload", closeWindowPortal);
      }

      return () => {
        currentWindow?.removeEventListener("beforeunload", closeWindowPortal);
        currentWindow?.close();
      };
    }, [externalWindow, containerEl]);

    if (!containerEl) {
      return null;
    }

    return ReactDOM.createPortal(children, containerEl);
  };

  return PopWindow;
};

interface IPopWindow {
  closeWindowPortal: windowPortalAction;
  openWindowPortal: windowPortalAction;
  viewState: WindowState;
  PopWindow: React.FC;
}

export const usePopWindow = (): IPopWindow => {
  const [viewState, setviewState] = useState<WindowState>(WindowState.Closed);

  const openWindowPortal = useCallback(() => {
    setviewState(WindowState.Opened);
  }, []);

  const closeWindowPortal = useCallback(() => {
    setviewState(WindowState.Closed);
  }, []);

  useEffect(() => {
    global.addEventListener("beforeunload", closeWindowPortal);

    return () => {
      global.removeEventListener("beforeunload", closeWindowPortal);
    };
  }, [closeWindowPortal]);

  const PopWindow = WindowPortal(closeWindowPortal) as React.FC;

  return {
    closeWindowPortal,
    openWindowPortal,
    viewState,
    PopWindow,
  };
};
