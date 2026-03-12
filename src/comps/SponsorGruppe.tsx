import { Card } from "react-bootstrap";
import type { Sponsor } from "../listen_sponsoren";
import { MaybeWithUrl } from "./MaybeWithUrl";
import "./SponsorGruppe.scss";

interface SponsorGruppeProps {
  size: string;
  fontSize: string;
  list: Sponsor[];
}

export function SponsorGruppe({ size, fontSize, list }: SponsorGruppeProps) {
  return (
    <div className="row g-2 g-md-3 mb-3">
      {list.map((sponsor, index) => (
        <Sponsor
          key={index}
          sponsor={sponsor}
          size={size}
          fontSize={fontSize}
        />
      ))}
    </div>
  );
}

interface SponsorProps {
  sponsor: Sponsor;
  size: string;
  fontSize: string;
}

function Sponsor({ sponsor, size, fontSize }: SponsorProps) {
  return (
    <div className="col-auto">
      <Card className="shadow bg-white" style={{ width: size }}>
        <MaybeWithUrl url={sponsor.url}>
          <Card.Img variant="top" src={sponsor.imgPath} title={sponsor.label} />
        </MaybeWithUrl>
        <Card.Body className="text-center p-1">
          <div className="sponsor-label" style={{ fontSize: fontSize }}>
            <MaybeWithUrl url={sponsor.url}>{sponsor.label}</MaybeWithUrl>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
