import { useCallback, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { BackToStart } from "../comps/BackToStart";
import { TeamForm } from "../comps/TeamForm";
import type { TeamFormValues } from "../comps/TeamForm";

const mainMessage =
  "Die Anmeldung ist erst vollständig, nachdem du den Bestätigungslink aufgerufen hast. " +
  "Mit dem Link im E-Mail kannst du dein Team auch später noch anpassen oder wieder abmelden. " +
  "Bewahre die E-Mail also unbedingt auf.";

export default function Anmelden() {
  const [success, setSuccess] = useState(false);
  const onSubmit = useCallback((values: TeamFormValues) => {
    return fetch("/add-team.php", {
      method: "POST",
      body: JSON.stringify(values),
    }).then((response) => {
      if (response.ok) {
        setSuccess(true);
      } else {
        throw new Error("HTTP status code: " + response.status);
      }
    });
  }, []);
  return (
    <>
      <h1>Team anmelden</h1>
      {success ? (
        <>
          <Alert variant="success">
            Du solltest in den nächsten Minuten eine E-Mail erhalten.{" "}
            {mainMessage}
          </Alert>
          <BackToStart />
        </>
      ) : (
        <>
          <Alert variant="info">
            Du erhälst nach dem Abschicken des Formulars eine E-Mail.{" "}
            {mainMessage}
          </Alert>
          <TeamForm submitLabel="Abschicken" onSubmit={onSubmit} />
        </>
      )}
    </>
  );
}
