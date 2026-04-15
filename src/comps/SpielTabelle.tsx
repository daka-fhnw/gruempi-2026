import { Card } from "react-bootstrap";
import { type Spiel } from "../daten_spielplan";
import "./SpielTabelle.scss";

interface SpielTabelleProps {
  spiele: Spiel[];
  resolveName: (kuerzel: string) => string;
}

export function SpielTabelle({ spiele, resolveName }: SpielTabelleProps) {
  return (
    <>
      <Card className="shadow bg-white">
        <Card.Body className="p-0">
          <table className="table table-striped bg-white rounded-3 overflow-hidden spiel-table">
            <thead>
              <tr className="d-none d-md-table-row">
                <th className="d-md-none">Spiele</th>
                <th className="d-none d-md-table-cell">
                  <span className="d-lg-none">Zeit, Platz</span>
                  <span className="d-none d-lg-table-cell">Uhrzeit</span>
                </th>
                <th className="d-none d-lg-table-cell">Platz</th>
                <th className="d-none d-md-table-cell">
                  <span className="d-lg-none">Teams</span>
                  <span className="d-none d-lg-table-cell">Heimteam</span>
                </th>
                <th className="d-none d-lg-table-cell">Gastteam</th>
                <th className="d-none d-md-table-cell">Schiedsrichter</th>
              </tr>
            </thead>
            <tbody>
              {spiele.map((spiel, index) => (
                <tr key={index}>
                  <td className="d-md-none">
                    <div className="spiel-small">
                      <div className="fw-bold">Zeit, Platz:</div>
                      <div>
                        {spiel.zeit}, {spiel.platz}
                      </div>
                      <div className="fw-bold">Heimteam:</div>
                      <div>{resolveName(spiel.team1)}</div>
                      <div className="fw-bold">Gastteam:</div>
                      <div>{resolveName(spiel.team2)}</div>
                      <div className="fw-bold">
                        <span className="d-inline d-sm-none">Schiri:</span>
                        <span className="d-none d-sm-inline">
                          Schiedsrichter:
                        </span>
                      </div>
                      <div>{resolveName(spiel.schiri)}</div>
                    </div>
                  </td>
                  <td className="d-none d-md-table-cell">
                    {spiel.zeit}
                    <div className="d-none d-md-table-cell d-lg-none">
                      {spiel.platz}
                    </div>
                  </td>
                  <td className="d-none d-lg-table-cell">{spiel.platz}</td>
                  <td className="d-none d-md-table-cell">
                    {resolveName(spiel.team1)}
                    <div className="d-none d-md-table-cell d-lg-none">
                      {resolveName(spiel.team2)}
                    </div>
                  </td>
                  <td className="d-none d-lg-table-cell">
                    {resolveName(spiel.team2)}
                  </td>
                  <td className="d-none d-md-table-cell">
                    {resolveName(spiel.schiri)}
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
