import Card from "react-bootstrap/Card";
import { type Sponsor } from "../listen_sponsoren";
import type { PropsWithChildren } from "react";

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
        <MaybeWithUrl sponsor={sponsor}>
          <Card.Img variant="top" src={sponsor.imgPath} title={sponsor.label} />
        </MaybeWithUrl>
        <Card.Body className="text-center p-1">
          <MaybeWithUrl sponsor={sponsor}>{sponsor.label}</MaybeWithUrl>
        </Card.Body>
      </Card>
    </div>
  );
}

interface MaybeWithUrlProps {
  sponsor: Sponsor;
}

function MaybeWithUrl({
  sponsor,
  children,
}: PropsWithChildren<MaybeWithUrlProps>) {
  if (sponsor.url) {
    const isMailto = sponsor.url.startsWith("mailto:");
    return (
      <a href={sponsor.url} target={isMailto ? undefined : "_blank"}>
        {children}
      </a>
    );
  }
  return children;
}
