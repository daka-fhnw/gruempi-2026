import { useCallback, useEffect, useState } from "react";
import { Loading } from "../comps/Loading";
import {
  loadSpielplanData,
  type GruppeDetail,
  type Spiel,
  type SpielDetail,
  type SpielplanDetail,
  type TeamDetail,
} from "../daten_spielplan";
import { SpielGruppen } from "../comps/SpielGruppen";
import { SpielTabelle } from "../comps/SpielTabelle";
import { Button } from "react-bootstrap";
import { CloseIcon } from "../icons/CloseIcon";
import { ArrowLink } from "../comps/ArrowLink";

export default function Sponsoren() {
  const [spielplan, setSpielplan] = useState<SpielplanDetail | null>(null);
  const [teamKuerzel, setTeamKuerzel] = useState<string>("");
  const filterSpiel = useCallback(
    (spiel: SpielDetail) => {
      return (
        spiel.team1.platzhalter ||
        spiel.team2.platzhalter ||
        teamKuerzel === "" ||
        spiel.team1.kuerzel === teamKuerzel ||
        spiel.team2.kuerzel === teamKuerzel ||
        spiel.schiri.kuerzel === teamKuerzel
      );
    },
    [teamKuerzel],
  );
  useEffect(() => {
    loadSpielplanData().then((data) => {
      const teams: TeamDetail[] = Object.entries(data.kuerzel).map(
        (entry, idx) => ({
          id: idx + 1,
          name: entry[1],
          kuerzel: entry[0],
          platzhalter: !entry[0].startsWith("t"),
        }),
      );
      teams.sort((a, b) => a.name.localeCompare(b.name));
      const teamMap = new Map<string, TeamDetail>(
        teams.map((team) => [team.kuerzel, team]),
      );
      const gruppen: GruppeDetail[] = data.gruppen.map((gruppe, idx) => ({
        id: idx + 1,
        name: gruppe.name,
        teams: gruppe.teams.map((team) => teamMap.get(team)!),
      }));
      const toSpielDetail = (spiele: Spiel[]): SpielDetail[] =>
        spiele.map((spiel, idx) => ({
          id: idx + 1,
          zeit: spiel.zeit,
          feld: spiel.feld,
          team1: teamMap.get(spiel.team1)!,
          team2: teamMap.get(spiel.team2)!,
          schiri: teamMap.get(spiel.schiri)!,
        }));
      const spielplan: SpielplanDetail = {
        teams,
        gruppen,
        gruppenphase: toSpielDetail(data.gruppenphase),
        viertelfinal: toSpielDetail(data.viertelfinal),
        halbfinal: toSpielDetail(data.halbfinal),
        final: toSpielDetail(data.final),
      };
      setSpielplan(spielplan);
    });
  }, []);
  if (spielplan !== null) {
    return (
      <>
        <h1>Spielplan</h1>
        <h2>Ergebnisse</h2>
        <div className="mb-3">
          <a
            href="https://www.sofascore.com/de/minifootball/tournament/switzerland/fhnw-grumpi/33877"
            target="_blank"
          >
            <ArrowLink>Spielergebnisse auf Sofascore</ArrowLink>
          </a>{" "}
          🏆
        </div>
        <h2>Gruppen</h2>
        <SpielGruppen gruppen={spielplan.gruppen} />
        <div className="row align-items-end g-2 mt-3 mb-3">
          <div className="col-12 col-sm-auto">
            <h2 className="m-0">Spiele</h2>
          </div>
          <div className="col-auto">
            <div className="fw-bold">Filtern nach Team:</div>
            <select
              value={teamKuerzel}
              className="form-select form-select"
              onChange={(event) => setTeamKuerzel(event.target.value)}
            >
              <option value="">(nicht filtern)</option>
              {spielplan.teams
                .filter((team) => !team.platzhalter)
                .map((team) => (
                  <option key={team.id} value={team.kuerzel}>
                    {team.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-auto">
            <Button
              onClick={() => setTeamKuerzel("")}
              title="Filter zurücksetzen"
            >
              <CloseIcon />
            </Button>
          </div>
        </div>
        <h4>Gruppenphase</h4>
        <SpielTabelle
          spiele={spielplan.gruppenphase}
          filterSpiel={filterSpiel}
        />
        <h4 className="mt-3">Viertelfinal</h4>
        <SpielTabelle
          spiele={spielplan.viertelfinal}
          filterSpiel={filterSpiel}
        />
        <h4 className="mt-3">Halbfinal</h4>
        <SpielTabelle spiele={spielplan.halbfinal} filterSpiel={filterSpiel} />
        <h4 className="mt-3">Final</h4>
        <SpielTabelle spiele={spielplan.final} filterSpiel={filterSpiel} />
      </>
    );
  } else {
    return <Loading />;
  }
}
