import { useEffect, useState } from "react";
import { SponsorGruppe } from "../comps/SponsorGruppe";
import { Loading } from "../comps/Loading";
import { MaybeWithUrl } from "../comps/MaybeWithUrl";
import { loadSponsors, type SponsorLists } from "../listen_sponsoren";

export default function Sponsoren() {
  const [sponsoren, setSponsoren] = useState<SponsorLists | null>(null);
  useEffect(() => {
    loadSponsors().then((data) => setSponsoren(data));
  }, []);
  if (sponsoren !== null) {
    return (
      <div className="mb-n3">
        <h1>Sponsoren</h1>
        <h2>Triangulationspunkte (Hauptsponsoren)</h2>
        <SponsorGruppe
          list={sponsoren.triangulationspunkte}
          size="20rem"
          fontSize="1.1rem"
        />
        <h2>Fixpunkte</h2>
        <SponsorGruppe
          list={sponsoren.fixpunkte}
          size="16rem"
          fontSize="1rem"
        />
        <h2>Höhenfixpunkte</h2>
        <SponsorGruppe
          list={sponsoren.hoehenfixpunkte}
          size="11rem"
          fontSize="0.9rem"
        />
        <h2>Passpunkte</h2>
        <SponsorGruppe
          list={sponsoren.passpunkte}
          size="8rem"
          fontSize="0.8rem"
        />
        <h2>Grenzpunkte</h2>
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
