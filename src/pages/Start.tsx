import { useState } from "react";
import { Link } from "wouter";
import { Countdown } from "../comps/Countdown";
import { fotos2025 } from "../listen_gallerie";
import { fixpunkte } from "../listen_sponsoren";
import { SponsorGruppe } from "../comps/SponsorGruppe";
import { DateIcon } from "../icons/DateIcon";
import { GeoIcon } from "../icons/GeoIcon";
import { FoodIcon } from "../icons/FoodIcon";
import { FireIcon } from "../icons/FireIcon";
import { ArrowIcon } from "../icons/ArrowIcon";

function randomFoto() {
  return fotos2025[Math.floor(Math.random() * fotos2025.length)];
}

export default function Start() {
  const [foto] = useState(randomFoto());
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
            <a href="/event.ics" title="Zum Kalender hinzufügen">
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
        <span className="me-1">
          <ArrowIcon />
        </span>
        <Link href="/infos">Alle weiteren Infos findest du hier</Link> 😎
      </div>
      <h2>Eindrücke vom Grümpi 2025</h2>
      <div className="mb-3">
        <img src={foto} className="img-fluid border" />
      </div>
      <div className="mb-3">
        <span className="me-1">
          <ArrowIcon />
        </span>
        <Link href="/gallerie">Hier findest du weitere Fotos</Link> 🤩
      </div>
      <h2>Hauptsponsoren</h2>
      <SponsorGruppe list={fixpunkte} size="16rem" />
      <div className="mb-0">
        <span className="me-1">
          <ArrowIcon />
        </span>
        <Link href="/sponsoren">Weitere Sponsoren</Link> 😍
      </div>
    </>
  );
}
