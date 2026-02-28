import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Loading } from "../comps/Loading";

interface TeamLists {
  confirmed: string[];
  waitinglist: string[];
}

type TeamsViewState = "loading" | "failed" | "loaded";

export default function Teams() {
  const [teamLists, setTeamLists] = useState<TeamLists | null>(null);
  const [viewState, setViewState] = useState<TeamsViewState>("loading");
  useEffect(() => {
    fetch("/api/list-teams.php")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject("HTTP status code " + response.status);
        }
      })
      .then((data) => {
        setTeamLists(data);
        setViewState("loaded");
      })
      .catch((error) => {
        console.error(error);
        setViewState("failed");
      });
  }, []);
  return (
    <>
      <h1>Angemeldete Teams</h1>
      {viewState === "loading" && <Loading />}
      {viewState === "failed" && (
        <Alert variant="danger">
          Da ist etwas schief gegangen, versuch es doch bitte später nochmals 😕
        </Alert>
      )}
      {viewState === "loaded" && teamLists !== null && (
        <>
          <h2>Bestätigt</h2>
          <ul>
            {teamLists.confirmed.map((team, index) => (
              <li key={index}>{team}</li>
            ))}
          </ul>
          <h2>Warteliste</h2>
          <ol>
            {teamLists.waitinglist.map((team, index) => (
              <li key={index}>{team}</li>
            ))}
          </ol>
        </>
      )}
    </>
  );
}
