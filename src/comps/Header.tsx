import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import MenuIcon from "../icons/MenuIcon";
import Menu from "./Menu";
import logo from "../assets/logo.svg";
import "./Header.scss";

export default function Header() {
  const [isScrolled, setScrolled] = useState<boolean>(false);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const showMenu = useCallback(() => setMenuOpen(true), [setMenuOpen]);
  const hideMenu = useCallback(() => setMenuOpen(false), [setMenuOpen]);
  useEffect(() => {
    const handleScroll = () =>
      window.pageYOffset > 100 ? setScrolled(true) : setScrolled(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <header className={`bg-secondary ${isScrolled && "scrolled"}`}>
        <div className="container">
          <div className="row align-items-end flex-nowrap gx-0">
            <div className="col overflow-hidden">
              <Link to="/">
                <img className="logo" src={logo} title="FHNW Grümpi 2026" />
              </Link>
            </div>
            <div className="col-auto p-1">
              <nav>
                <Button variant="primary" title="Menü" onClick={showMenu}>
                  <span className="d-none d-md-inline">Menü </span>
                  <MenuIcon />
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </header>
      {isMenuOpen && <Menu hideMenu={hideMenu} />}
    </>
  );
}
