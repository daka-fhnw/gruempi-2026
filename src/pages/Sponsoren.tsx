import { useEffect, useState } from "react";
import { SponsorGruppe } from "../comps/SponsorGruppe";
import { Loading } from "../comps/Loading";
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
        <h2>Fixpunkte (Hauptsponsoren)</h2>
        <SponsorGruppe list={sponsoren.fixpunkte} size="16rem" />
        <h2>Höhenfixpunkte</h2>
        <SponsorGruppe list={sponsoren.hoehenfixpunkte} size="13rem" />
        <h2>Passpunkte</h2>
        <SponsorGruppe list={sponsoren.passpunkte} size="10rem" />
        <h2>Grenzpunkte</h2>
        <SponsorGruppe list={sponsoren.grenzpunkte} size="8rem" />
        <h2>Rüebli</h2>
        <ul>
          {sponsoren.ruebli.map((sponsor, index) => (
            <li key={index}>{sponsor}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <Loading />;
  }
}
