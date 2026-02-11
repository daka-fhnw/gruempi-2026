import { useEffect, useState } from "react";
import icon from "../assets/fussball.svg";
import "./Loading.scss";

const showDelay = 300;

export function Loading() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), showDelay);
    return () => clearTimeout(timer);
  }, []);
  if (show) {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <img className="icon" src={icon} alt="Fussball" />
        <div>Lädt gerade...</div>
      </div>
    );
  }
  return null;
}
