import { useCallback, useState } from "react";
import { Link } from "wouter";
import { Alert } from "react-bootstrap";
import { BackToStart } from "../comps/BackToStart";
import { TeamForm, type TeamValues } from "../comps/TeamForm";

export default function Anmelden() {
  const [success, setSuccess] = useState(false);
  const onSubmit = useCallback((values: TeamValues) => {
    return fetch("/api/add-team.php", {
      method: "POST",
      body: JSON.stringify(values),
    }).then((response) => {
      if (response.ok) {
        setSuccess(true);
      } else {
        const defaultError = "HTTP status code " + response.status;
        return response
          .json()
          .catch((error) => {
            console.error(error);
            return Promise.reject(defaultError);
          })
          .then((data) => {
            return Promise.reject(data?.errorId ?? defaultError);
          });
      }
    });
  }, []);
  return (
    <>
      <h1>Team anmelden</h1>
      {success ? (
        <>
          <Alert variant="success">
            Es freut uns sehr, dass du beim FHNW Grümpi 2026 dabei bist. Du
            solltest in den nächsten Minuten eine{" "}
            <b>E-Mail mit einem Bestätigungslink</b> erhalten. Deine Anmeldung
            ist erst gültig, wenn du <b>innerhalb von 24 Stunden</b> auf diesen
            Link klickst. Bitte schau auch im Spam-Ordner nach.
          </Alert>
          <BackToStart />
        </>
      ) : (
        <>
          <Alert variant="info">
            Bitte lies die{" "}
            <Link href="/infos" target="_blank">
              Teilnahmebedingungen und Spielregeln
            </Link>{" "}
            und denk daran: Jedes Team stellt einen Schiedsrichter für Spiele
            anderer Teams.
          </Alert>
          <TeamForm submitLabel="Abschicken" onSubmit={onSubmit} />
        </>
      )}
    </>
  );
}
