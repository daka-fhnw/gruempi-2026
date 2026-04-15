import { Card } from "react-bootstrap";
import { type SpielGruppe } from "../daten_spielplan";
import "./SpielGruppen.scss";

interface SpielGruppenProps {
  gruppen: SpielGruppe[];
  resolveName: (kuerzel: string) => string;
}

export function SpielGruppen({ gruppen, resolveName }: SpielGruppenProps) {
  return (
    <>
      <div className="row justify-content-start g-2">
        {gruppen.map((gruppe, gidx) => (
          <div key={gidx} className="col-12 col-sm-6 col-lg-3">
            <Card className="shadow">
              <Card.Header>
                <b>{gruppe.name}</b>
              </Card.Header>
              <Card.Body>
                {gruppe.teams.map((team, tidx) => (
                  <div key={tidx} className="group-card">
                    {resolveName(team)}
                  </div>
                ))}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
