import { Link } from "wouter";
import { ArrowIcon } from "../icons/ArrowIcon";

export function BackToStart() {
  return (
    <div>
      <span className="me-1">
        <ArrowIcon />
      </span>
      <Link to="~/">Zur Startseite</Link>
    </div>
  );
}
