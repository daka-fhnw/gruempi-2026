import icon from "../assets/fussball.svg";
import "./Loading.scss";

import { useEffect, useState } from "react";
export default function Loading() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {show && (
        <div className="d-flex align-items-center justify-content-center">
          <img className="icon" src={icon} alt="Fussball" />
          <div>Lädt gerade...</div>
        </div>
      )}
    </>
  );
}
