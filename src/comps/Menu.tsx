import { useCallback, type PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import CloseIcon from "../icons/CloseIcon";
import useEscapeKey from "../hooks/useEscapeKey";
import useLockBodyScroll from "../hooks/useLockBodyScroll";
import "./Menu.scss";

interface MenuProps {
  hideMenu: () => void;
}

export default function Menu({ hideMenu }: MenuProps) {
  useLockBodyScroll();
  useEscapeKey(hideMenu);
  const hideMenuDelay = useCallback(() => setTimeout(hideMenu), [hideMenu]);
  return (
    <nav className="app-menu bg-secondary">
      <div className="container">
        <div className="text-end my-3">
          <Button variant="primary" title="Menü schliessen" onClick={hideMenu}>
            <CloseIcon />
          </Button>
        </div>
        <div className="row justify-content-end">
          <MenuItem linkTo="/" hideMenu={hideMenuDelay}>
            Start
          </MenuItem>
          <MenuItem linkTo="/regeln" hideMenu={hideMenuDelay}>
            Regeln
          </MenuItem>
          <MenuItem linkTo="/anreise" hideMenu={hideMenuDelay}>
            Anreise
          </MenuItem>
          <MenuItem linkTo="/impressum" hideMenu={hideMenuDelay}>
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
    <div className="col12 col-md-6 col-lg-4 col-xxl-3 text-end">
      <h1>
        <Link to={linkTo} onClick={hideMenu}>
          {children}
        </Link>
      </h1>
    </div>
  );
}
