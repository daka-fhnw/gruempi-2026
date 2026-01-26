import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import MenuIcon from "./icons/MenuIcon";
import logo from "./assets/logo.svg";
import "./Header.scss";

export default function Header() {
  const [isScrolled, setScrolled] = useState<boolean>(false);
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
      className={`bg-secondary position-fixed top-0 start-0 end-0 ${isScrolled && "scrolled"}`}
    >
      <div className="container">
        <div className="row gx-0 align-items-end flex-nowrap">
          <div className="col overflow-hidden">
            <img className="logo" src={logo} title="FHNW Grümpi 2026" />
          </div>
          <div className="col-auto p-1">
            <nav>
              <Button variant="primary" title="Menü">
                <MenuIcon />
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
