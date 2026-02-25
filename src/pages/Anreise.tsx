import { Karte } from "../comps/Karte";

export default function Anreise() {
  return (
    <>
      <h1>Fussballplatz Kriegacker</h1>
      <p>
        In unmittelbarer Nähe zum FHNW Campus in Muttenz: <br />
        Gründenstrasse 32, 4132 Muttenz
      </p>
      <p>
        Für die Anreise bieten sich die Bushaltestellen Kriegacker und
        Fachhochschule an, aber auch der Bahnhof Muttenz ist in Gehdistanz.
      </p>
      <div className="border">
        <Karte />
      </div>
    </>
  );
}
