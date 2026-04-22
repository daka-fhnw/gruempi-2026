import { Card } from "react-bootstrap";
import { type SpielDetail } from "../daten_spielplan";
import "./SpielTabelle.scss";

interface SpielTabelleProps {
  spiele: SpielDetail[];
  filterSpiel: (spiel: SpielDetail) => boolean;
}

export function SpielTabelle({ spiele, filterSpiel }: SpielTabelleProps) {
  return (
    <>
      <Card className="shadow">
        <Card.Body className="p-0">
          <table className="table table-striped rounded overflow-hidden spiel-table">
            <thead>
              <tr className="d-none d-md-table-row">
                <th className="d-md-none">Spiele</th>
                <th className="d-none d-md-table-cell">
                  <span className="d-lg-none">Zeit, Feld</span>
                  <span className="d-none d-lg-table-cell">Uhrzeit</span>
                </th>
                <th className="d-none d-lg-table-cell">Feld</th>
                <th className="d-none d-md-table-cell">
                  <span className="d-lg-none">Teams</span>
                  <span className="d-none d-lg-table-cell">Heimteam</span>
                </th>
                <th className="d-none d-lg-table-cell">Gastteam</th>
                <th className="d-none d-md-table-cell">Schiedsrichter</th>
              </tr>
            </thead>
            <tbody>
              {spiele.filter(filterSpiel).map((spiel) => (
                <tr key={spiel.id}>
                  <td className="d-md-none">
                    <div className="spiel-small">
                      <div className="fw-bold">Zeit, Feld:</div>
                      <div>
                        {spiel.zeit}, {spiel.feld}
                      </div>
                      <div className="fw-bold">Heimteam:</div>
                      <div>{spiel.team1.name}</div>
                      <div className="fw-bold">Gastteam:</div>
                      <div>{spiel.team2.name}</div>
                      <div className="fw-bold">
                        <span className="d-inline d-sm-none">Schiri:</span>
                        <span className="d-none d-sm-inline">
                          Schiedsrichter:
                        </span>
                      </div>
                      <div>{spiel.schiri.name}</div>
                    </div>
                  </td>
                  <td className="d-none d-md-table-cell">
                    {spiel.zeit}
                    <div className="d-none d-md-table-cell d-lg-none">
                      {spiel.feld}
                    </div>
                  </td>
                  <td className="d-none d-lg-table-cell">{spiel.feld}</td>
                  <td className="d-none d-md-table-cell">
                    {spiel.team1.name}
                    <div className="d-none d-md-table-cell d-lg-none">
                      {spiel.team2.name}
                    </div>
                  </td>
                  <td className="d-none d-lg-table-cell">{spiel.team2.name}</td>
                  <td className="d-none d-md-table-cell">
                    {spiel.schiri.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </>
  );
}
