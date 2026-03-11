import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Countdown } from "../comps/Countdown";
import { fotos2025 } from "../listen_galerie";
import { loadSponsors, type SponsorLists } from "../listen_sponsoren";
import { SponsorGruppe } from "../comps/SponsorGruppe";
import { DateIcon } from "../icons/DateIcon";
import { GeoIcon } from "../icons/GeoIcon";
import { FoodIcon } from "../icons/FoodIcon";
import { FireIcon } from "../icons/FireIcon";
import { ArrowLink } from "../comps/ArrowLink";
import { Loading } from "../comps/Loading";
import jetztAnmelden from "../assets/jetzt_anmelden.svg";

function randomFoto() {
  return fotos2025[Math.floor(Math.random() * fotos2025.length)];
}

export default function Start() {
  const [foto] = useState(randomFoto());
  const [sponsoren, setSponsoren] = useState<SponsorLists | null>(null);
  useEffect(() => {
    loadSponsors().then((data) => setSponsoren(data));
  }, []);
  return (
    <>
      <h1>Fachhochschule Grümpelturnier</h1>
      <p>
        Das jährliche FHNW Grümpi findet auch dieses Jahr in unmittelbarer Nähe
        zum FHNW Campus in Muttenz statt. Kommt vorbei und erlebt einen
        spannenden Fussballabend. Natürlich geniesst ihr auch als Zuschauer ein
        tolles Angebot inklusive Festwirtschaft und seid herzlich Willkommen.
      </p>
      <div className="mb-2">
        <div className="row gx-2 h5">
          <div className="col-auto">
            <DateIcon />
          </div>
          <div className="col">
            <a href="/fhnw-gruempi.ics" title="Kalendereintrag">
              Donnerstag 30.&nbsp;April&nbsp;2026 ab&nbsp;17:00
            </a>
          </div>
        </div>
        <div className="row gx-2 h5">
          <div className="col-auto">
            <GeoIcon />
          </div>
          <div className="col">
            <Link href="/anreise" title="Karte & Anreise">
              Fussballplatz Kriegacker, Muttenz
            </Link>
          </div>
        </div>
        <div className="row gx-2 h5">
          <div className="col-auto">
            <FoodIcon />
          </div>
          <div className="col">Mit Festwirtschaft zu fairen Preisen</div>
        </div>
        <div className="row gx-2 h5">
          <div className="col-auto">
            <FireIcon />
          </div>
          <div className="col">
            <Countdown />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <Link href="/infos">
          <ArrowLink>Alle weiteren Infos findest du hier</ArrowLink>
        </Link>{" "}
        😎
      </div>
      <h2>Anmeldung ist eröffnet!</h2>
      <div className="mb-3">
        <Link href="/anmelden">
          <img
            style={{ width: "100%", maxWidth: "16rem" }}
            src={jetztAnmelden}
            alt="Jetzt anmelden!"
          />
        </Link>
      </div>
      <div className="mb-3">
        <Link href="/anmelden">
          <ArrowLink>Melde dein Team zum Grümpi an!</ArrowLink>
        </Link>{" "}
        ⚽
      </div>
      <h2>Eindrücke vom Grümpi 2025</h2>
      <div className="mb-3">
        <img src={foto} className="img-fluid border" />
      </div>
      <div className="mb-3">
        <Link href="/galerie">
          <ArrowLink>Hier findest du weitere Fotos</ArrowLink>
        </Link>{" "}
        🤩
      </div>
      <h2>Hauptsponsoren</h2>
      {sponsoren !== null ? (
        <SponsorGruppe list={sponsoren.triangulationspunkte} size="16rem" />
      ) : (
        <Loading />
      )}
      <div className="mb-0">
        <Link href="/sponsoren">
          <ArrowLink>Weitere Sponsoren</ArrowLink>
        </Link>{" "}
        😍
      </div>
    </>
  );
}
