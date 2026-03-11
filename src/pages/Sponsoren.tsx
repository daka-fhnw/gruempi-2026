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
        <SponsorGruppe list={sponsoren.triangulationspunkte} size="16rem" />
        <h2>Fixpunkte</h2>
        <SponsorGruppe list={sponsoren.fixpunkte} size="13rem" />
        <h2>Höhenfixpunkte</h2>
        <SponsorGruppe list={sponsoren.hoehenfixpunkte} size="10rem" />
        <h2>Passpunkte</h2>
        <SponsorGruppe list={sponsoren.passpunkte} size="8rem" />
        <h2>Grenzpunkte</h2>
        <ul>
          {sponsoren.grenzpunkte.map((sponsor, index) => (
            <li key={index}>
              <MaybeWithUrl url={sponsor.url}>{sponsor.label}</MaybeWithUrl>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <Loading />;
  }
}
