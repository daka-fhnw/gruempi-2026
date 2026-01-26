import { useCallback, type PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import CloseIcon from "../icons/CloseIcon";
import useEscapeKey from "../hooks/useEscapeKey";
import useLockBodyScroll from "../hooks/useLockBodyScroll";
import "./Menu.scss";

type MenuProps = {
  hideMenu: () => void;
};

export default function Menu({ hideMenu }: MenuProps) {
  const hideMenuDelay = useCallback(() => setTimeout(hideMenu), [hideMenu]);
  useEscapeKey(hideMenu);
  useLockBodyScroll();
  return (
    <nav className="app-menu bg-secondary">
      <div className="container">
        <div className="text-end my-3">
          <Button variant="primary" title="Menü" onClick={hideMenu}>
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
          <MenuItem linkTo="/impressum" hideMenu={hideMenuDelay}>
            Impressum
          </MenuItem>
          <MenuItem linkTo="/datenschutz" hideMenu={hideMenuDelay}>
            Datenschutz
          </MenuItem>
        </div>
      </div>
    </nav>
  );
}

type MenuItemProps = PropsWithChildren<{
  linkTo: string;
  hideMenu: () => void;
}>;

function MenuItem({ linkTo, hideMenu, children }: MenuItemProps) {
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
