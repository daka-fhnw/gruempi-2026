import { Card } from "react-bootstrap";
import type { Sponsor } from "../listen_sponsoren";
import { MaybeWithUrl } from "./MaybeWithUrl";
import "./SponsorGruppe.scss";

interface SponsorGruppeProps {
  size: string;
  list: Sponsor[];
}

export function SponsorGruppe({ size, list }: SponsorGruppeProps) {
  return (
    <div className="row g-3 mb-3">
      {list.map((sponsor, index) => (
        <Sponsor key={index} sponsor={sponsor} size={size} />
      ))}
    </div>
  );
}

interface SponsorProps {
  sponsor: Sponsor;
  size: string;
}

function Sponsor({ sponsor, size }: SponsorProps) {
  return (
    <div className="col-auto">
      <Card className="shadow bg-white" style={{ width: size }}>
        <MaybeWithUrl url={sponsor.url}>
          <Card.Img variant="top" src={sponsor.imgPath} title={sponsor.label} />
        </MaybeWithUrl>
        <Card.Body className="text-center p-1">
          <MaybeWithUrl url={sponsor.url}>
            <span className="sponsor-label">{sponsor.label}</span>
          </MaybeWithUrl>
        </Card.Body>
      </Card>
    </div>
  );
}
