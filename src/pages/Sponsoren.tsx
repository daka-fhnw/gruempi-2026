import { useEffect, useState } from "react";
import { SponsorGruppe } from "../comps/SponsorGruppe";
import { Loading } from "../comps/Loading";
import { MaybeWithUrl } from "../comps/MaybeWithUrl";
import { loadSponsors, type SponsorLists } from "../daten_sponsoren";

export default function Sponsoren() {
  const [sponsoren, setSponsoren] = useState<SponsorLists | null>(null);
  useEffect(() => {
    loadSponsors().then((data) => setSponsoren(data));
  }, []);
  if (sponsoren !== null) {
    return (
      <div className="mb-n3">
        <h1>Sponsoren</h1>
        <h2>Triangulationspunkt (Hauptsponsoren)</h2>
        <SponsorGruppe
          list={sponsoren.triangulationspunkte}
          size="22rem"
          fontSize="1.1rem"
        />
        <h2>Fixpunkt</h2>
        <SponsorGruppe
          list={sponsoren.fixpunkte}
          size="18rem"
          fontSize="1rem"
        />
        <h2>Höhenfixpunkt</h2>
        <SponsorGruppe
          list={sponsoren.hoehenfixpunkte}
          size="14rem"
          fontSize="0.9rem"
        />
        <h2>Passpunkt</h2>
        <SponsorGruppe
          list={sponsoren.passpunkte}
          size="10.8rem"
          fontSize="0.8rem"
        />
        <h2>Grenzpunkt</h2>
        {sponsoren.grenzpunkte.map((sponsor, index) => (
          <span key={index}>
            {index !== 0 ? " | " : ""}
            <MaybeWithUrl url={sponsor.url}>{sponsor.label}</MaybeWithUrl>
          </span>
        ))}
      </div>
    );
  } else {
    return <Loading />;
  }
}
