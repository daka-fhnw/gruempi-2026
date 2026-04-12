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
      <div className="row g-2">
        {spiele.map((spiel, index) => (
          <div key={index} className="col-12 col-lg-6">
            <Card className="shadow bg-white">
              <Card.Body>
                <div className="overflow-hidden">
                  <div className="d-flex flex-nowrap gap-2 gap-sm-3">

                    <div className="fw-bold">
                      <div className="spiel-text">Uhrzeit:</div>
                      <div className="spiel-text">Heimteam:</div>
                      <div className="spiel-text">Gastteam:</div>
                      <div className="spiel-text d-block d-sm-none">
                        Schiri:
                      </div>
                      <div className="spiel-text d-none d-sm-block">
                        Schiedsrichter:
                      </div>
                    </div>
                    <div className="flex-fill">
                      <div className="spiel-text">{spiel.zeit} </div>
                      <div className="spiel-text">
                        {resolveName(spiel.team1)}
                      </div>
                      <div className="spiel-text">
                        {resolveName(spiel.team2)}
                      </div>
                      <div className="spiel-text">
                        {resolveName(spiel.schiri)}
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
