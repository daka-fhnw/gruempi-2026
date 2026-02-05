import { useCallback, useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "react-bootstrap";
import MenuIcon from "../icons/MenuIcon";
import Menu from "./Menu";
import logo from "../assets/logo.svg";
import "./Header.scss";

export default function Header() {
  const [isScrolled, setScrolled] = useState<boolean>(false);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const hideMenu = useCallback(() => setMenuOpen(false), [setMenuOpen]);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.pageYOffset > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <header className={`bg-secondary ${isScrolled && "scrolled"}`}>
        <div className="container">
          <div className="row align-items-end flex-nowrap gx-1">
            <div className="col overflow-hidden">
              <Link to="/">
                <img className="logo" src={logo} alt="FHNW Grümpi 2026" />
              </Link>
            </div>
            <div className="col-auto py-1">
              <nav>
                <Button
                  variant="primary"
                  title="Menü"
                  onClick={() => setMenuOpen(true)}
                >
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
