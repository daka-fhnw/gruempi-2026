import { type PropsWithChildren } from "react";
import { Link } from "wouter";
import Button from "react-bootstrap/Button";
import { CloseIcon } from "../icons/CloseIcon";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import logo from "../assets/logo.svg";
import "./Menu.scss";

interface MenuProps {
  hideMenu: () => void;
}

export function Menu({ hideMenu }: MenuProps) {
  useLockBodyScroll();
  useEscapeKey(hideMenu);
  return (
    <nav className="app-menu bg-secondary">
      <div className="container">
        <div className="row align-items-center flex-nowrap gx-1">
          <div className="col overflow-hidden">
            <Link to="/" onClick={hideMenu}>
              <img className="logo" src={logo} alt="FHNW Grümpi 2026" />
            </Link>
          </div>
          <div className="col-auto py-1">
            <Button
              variant="primary"
              title="Menü schliessen"
              onClick={hideMenu}
            >
              <span className="d-none d-md-inline">Schliessen </span>
              <CloseIcon />
            </Button>
          </div>
        </div>
        <div className="row justify-content-start mt-3 mt-lg-5">
          <MenuItem linkTo="/" hideMenu={hideMenu}>
            Startseite
          </MenuItem>
          <MenuItem linkTo="/gallerie" hideMenu={hideMenu}>
            Rückblick
          </MenuItem>
          <MenuItem linkTo="/regeln" hideMenu={hideMenu}>
            Spielregeln
          </MenuItem>
          <MenuItem linkTo="/anreise" hideMenu={hideMenu}>
            Anreise
          </MenuItem>
          <MenuItem linkTo="/impressum" hideMenu={hideMenu}>
            Kontakt
          </MenuItem>
        </div>
      </div>
    </nav>
  );
}

interface MenuItemProps {
  linkTo: string;
  hideMenu: () => void;
}

function MenuItem({
  linkTo,
  hideMenu,
  children,
}: PropsWithChildren<MenuItemProps>) {
  return (
    <div className="col-12 col-md-6 col-xl-4 text-center">
      <h1>
        <Link to={linkTo} onClick={hideMenu}>
          {children}
        </Link>
      </h1>
    </div>
  );
}
