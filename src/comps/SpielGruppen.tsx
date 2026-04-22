import { Card } from "react-bootstrap";
import { type GruppeDetail } from "../daten_spielplan";
import "./SpielGruppen.scss";

interface SpielGruppenProps {
  gruppen: GruppeDetail[];
}

export function SpielGruppen({ gruppen }: SpielGruppenProps) {
  return (
    <>
      <div className="row justify-content-start g-2">
        {gruppen.map((gruppe) => (
          <div key={gruppe.id} className="col-12 col-sm-6 col-lg-3">
            <Card className="shadow">
              <Card.Header>
                <b>{gruppe.name}</b>
              </Card.Header>
              <Card.Body>
                {gruppe.teams.map((team, tidx) => (
                  <div key={tidx} className="group-card">
                    {team.name}
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
