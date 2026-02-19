import type { PropsWithChildren } from "react";
import Card from "react-bootstrap/Card";
import placeholder from "../assets/sponsorp.webp";

const label = "Sponsor werden!";
const url = "mailto:info@grümpi.ch";

export function Sponsoren() {
  return (
    <div className="mb-n3">
      <Group label="Platin">
        <Sponsor imgPath={placeholder} label={label} url={url} />
      </Group>
      <Group label="Gold">
        <Sponsor imgPath={placeholder} label={label} url={url} />
      </Group>
      <Group label="Silber">
        <Sponsor imgPath={placeholder} label={label} url={url} />
      </Group>
      <Group label="Bronze">
        <Sponsor imgPath={placeholder} label={label} url={url} />
      </Group>
    </div>
  );
}

interface GroupProps {
  label: string;
}

function Group({ label, children }: PropsWithChildren<GroupProps>) {
  return (
    <div className="mb-3">
      <h3>{label}</h3>
      <div className="row g-1 g-sm-4">{children}</div>
    </div>
  );
}

interface SponsorProps {
  imgPath: string;
  label: string;
  url?: string;
}

function Sponsor({ imgPath, label, url }: SponsorProps) {
  return (
    <div className="col-6 col-md-4 col-lg-3">
      <Card className="shadow bg-white">
        <a href={url} title={label}>
          <Card.Img
            className="pt-2 px-1 px-sm-4 px-md-2 px-xl-4 px-xxl-5"
            variant="top"
            src={imgPath}
          />
        </a>
        <Card.Body className="p-2 text-center fw-bold">
          {url ? <a href={url}>{label}</a> : label}
        </Card.Body>
      </Card>
    </div>
  );
}
