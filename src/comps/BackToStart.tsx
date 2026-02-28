import { Link } from "wouter";
import { ArrowLink } from "./ArrowLink";

export function BackToStart() {
  return (
    <Link href="~/">
      <ArrowLink>Zur Startseite</ArrowLink>
    </Link>
  );
}
