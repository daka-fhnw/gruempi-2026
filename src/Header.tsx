import { useEffect, useState } from "react";
import logo from "./assets/logo_buffer.svg";
import "./Header.scss";

export default function Header() {
  const [isScrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`bg-primary position-fixed top-0 start-0 end-0 ${isScrolled && "scrolled"}`}
    >
      <div className="text-center py-1">
        <img src={logo} title="FHNW Grümpi 2026" />
        <div className="eventinfo">
          <h5 className="my-0">30. April 2026 ab 17:00</h5>
          <h5 className="my-0">Fussballplatz Kriegacker Muttenz</h5>
        </div>
      </div>
    </header>
  );
}
