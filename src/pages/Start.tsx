import { useState } from "react";
import { Link } from "wouter";
import { Countdown } from "../comps/Countdown";
import { fotos2025 } from "../listen_gallerie";
import { fixpunkte } from "../listen_sponsoren";
import { SponsorGruppe } from "../comps/SponsorGruppe";

function randomFoto() {
  return fotos2025[Math.floor(Math.random() * fotos2025.length)];
}

export default function Start() {
  const [foto] = useState(randomFoto());
  return (
    <>
      <h1>Fachhochschule Grümpelturnier</h1>
      <h3>
        Donnerstag 30.&nbsp;April&nbsp;2026 ab&nbsp;17:00, Fussballplatz
        Kriegacker Muttenz
      </h3>
      <div className="mb-3">
        Mit Festwirtschaft zu fairen Preisen 😋
        <br />
        <Countdown /> ⚽
      </div>
      <h2>Eindrücke vom Grümpi 2025</h2>
      <div className="mb-3">
        <img src={foto} className="img-fluid border" />
      </div>
      <div className="mb-3">
        <Link href="/gallerie">Hier findest du weitere Fotos</Link> 🤩
      </div>
      <h2>Hauptsponsoren</h2>
      <SponsorGruppe list={fixpunkte} size="16rem" />
      <Link href="/sponsoren">Weitere Sponsoren</Link> 😍
    </>
  );
}
