import { SponsorGruppe } from "../comps/SponsorGruppe";
import {
  fixpunkte,
  hoehenfixpunkte,
  passpunkte,
  grenzpunkte,
  ruebli,
} from "../listen_sponsoren";

export default function Sponsoren() {
  return (
    <div className="mb-n3">
      <h1>Sponsoren</h1>
      <h2>Fixpunkte (Hauptsponsoren)</h2>
      <SponsorGruppe list={fixpunkte} size="16rem" />
      <h2>Höhenfixpunkte</h2>
      <SponsorGruppe list={hoehenfixpunkte} size="14rem" />
      <h2>Passpunkte</h2>
      <SponsorGruppe list={passpunkte} size="12rem" />
      <h2>Grenzpunkte</h2>
      <SponsorGruppe list={grenzpunkte} size="10rem" />
      <h2>Rüebli</h2>
      <SponsorGruppe list={ruebli} size="8rem" />
    </div>
  );
}
