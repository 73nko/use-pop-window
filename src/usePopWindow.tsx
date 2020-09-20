import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";

import { copyStyles } from "./copyStyles";

interface IWidowProps {
  width: number;
  height: number;
  left: number;
  top: number;
  name: string;
}

export enum WindowState {
  Closed = "closed",
  Opened = "opened",
}

type windowPortalAction = () => void;

const WindowPortal = (
  closeWindowPortal: windowPortalAction,
  { width, height, left, top, name }: IWidowProps
) => {
  const PopWindow: React.FC<{}> = ({ children }) => {
    const externalWindow = React.useRef(
      global.open(
        "",
        name.trim(),
        `width=${width},height=${height},left=${left},top=${top}`
      )
    );

    const containerEl = externalWindow.current?.document.createElement("body");

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

export const usePopWindow = (
  widowProps: IWidowProps = {
    width: 800,
    height: 600,
    left: 200,
    top: 200,
    name: "",
  }
): IPopWindow => {
  const [viewState, setviewState] = useState<WindowState>(WindowState.Closed);

  const openWindowPortal = useCallback(() => {
    setviewState(WindowState.Opened);
  }, []);

  const closeWindowPortal = useCallback(() => {
    setviewState(WindowState.Closed);
  }, []);

  const PopWindow = WindowPortal(closeWindowPortal, widowProps);

  return {
    closeWindowPortal,
    openWindowPortal,
    viewState,
    PopWindow,
  };
};
