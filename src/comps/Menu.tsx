import { type PropsWithChildren } from "react";
import { Link } from "wouter";
import Button from "react-bootstrap/Button";
import { CloseIcon } from "../icons/CloseIcon";
import { InstaIcon } from "../icons/InstaIcon";
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
          <MenuItem href="/" hideMenu={hideMenu}>
            Startseite
          </MenuItem>
          <MenuItem href="/gallerie" hideMenu={hideMenu}>
            Rückblick
          </MenuItem>
          <MenuItem href="/sponsoren" hideMenu={hideMenu}>
            Sponsoren
          </MenuItem>
          <MenuItem href="/regeln" hideMenu={hideMenu}>
            Spielregeln
          </MenuItem>
          <MenuItem href="/anreise" hideMenu={hideMenu}>
            Anreise
          </MenuItem>
          <MenuItem href="/impressum" hideMenu={hideMenu}>
            Kontakt
          </MenuItem>
          <MenuItem
            href="https://instagram.com/fhnwgruempi"
            external={true}
            hideMenu={hideMenu}
          >
            <span className="me-1">
              <InstaIcon />
            </span>
            Instagram
          </MenuItem>
        </div>
      </div>
    </nav>
  );
}

interface MenuItemProps {
  href: string;
  external?: boolean;
  hideMenu: () => void;
}

function MenuItem({
  href,
  external,
  hideMenu,
  children,
}: PropsWithChildren<MenuItemProps>) {
  return (
    <div className="col-12 col-md-6 col-xl-4 text-center">
      <h1>
        {external ? (
          <a href={href} target="_blank" onClick={hideMenu}>
            {children}
          </a>
        ) : (
          <Link href={href} onClick={hideMenu}>
            {children}
          </Link>
        )}
      </h1>
    </div>
  );
}
