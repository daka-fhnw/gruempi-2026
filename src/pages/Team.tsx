import { useEffect, useState } from "react";
import type { DefaultParams, RouteComponentProps } from "wouter";
import type { Team } from "../types";
import { Alert } from "react-bootstrap";
import { Loading } from "../comps/Loading";
import { BackToStart } from "../comps/BackToStart";

interface TeamParams extends DefaultParams {
  token: string;
}

export default function Team({ params }: RouteComponentProps<TeamParams>) {
  const [failed, setFailed] = useState(false);
  const [team, setTeam] = useState<Team | null>(null);
  useEffect(() => {
    fetch("/api/get-team.php?token=" + params.token)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response.status);
        }
      })
      .then((data) => setTeam(data))
      .catch((error) => {
        console.error(error);
        setFailed(true);
      });
  }, [params.token]);
  return (
    <>
      <h1>Team</h1>
      {failed && (
        <>
          <Alert variant="danger">Laden fehlgeschlagen...</Alert>
          <BackToStart />
        </>
      )}
      {!failed && team == null && <Loading />}
      {team !== null && (
        <>
          <div>
            <b>Team Captain:</b> {team.firstname} {team.lastname}
            <br />
            <b>E-Mail:</b> {team.email}
            <br />
            <b>Mobile:</b> {team.mobile}
          </div>
        </>
      )}
    </>
  );
}
