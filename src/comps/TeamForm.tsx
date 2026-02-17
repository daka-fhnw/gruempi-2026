import { useState, type SubmitEvent } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./TeamForm.scss";

const maxTeamNameLen = 40;
const errorIdInvalid = "invalid";
const errorIdExistingTeam = "existingTeam";
const errorIdExistingEmail = "existingEmail";

type TeamFormStates = "initial" | "pending" | "failed";

export interface TeamFormValues {
  team: string;
  email: string;
  firstname: string;
  lastname: string;
  mobile: string;
}

interface TeamFormProps {
  submitLabel: string;
  onSubmit: (formData: TeamFormValues) => Promise<void>;
}

function getErrorMsg(error: unknown) {
  if (error === errorIdInvalid) {
    return "Bitte fülle das Formular vollständig und korrekt aus.";
  } else if (error === errorIdExistingTeam) {
    return "Der Teamname ist leider bereits vergeben, sorry 😕";
  } else if (error === errorIdExistingEmail) {
    return "Mit der E-Mail-Adresse wurde bereits ein Team angemeldet, sorry 😕";
  } else {
    console.error(error);
    return "Da ist etwas schief gegangen, versuch es doch bitte später nochmals 😕";
  }
}

export function TeamForm({ submitLabel, onSubmit }: TeamFormProps) {
  const [formState, setFormState] = useState<TeamFormStates>("initial");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      setFormState("pending");
      const formData = new FormData(form);
      const team = formData.get("team") as string;
      const firstname = formData.get("firstname") as string;
      const lastname = formData.get("lastname") as string;
      const email = formData.get("email") as string;
      const mobile = formData.get("mobile") as string;
      onSubmit({ team, firstname, lastname, email, mobile }).catch((error) => {
        setFormState("failed");
        setErrorMessage(getErrorMsg(error));
      });
    } else {
      setFormState("failed");
      setErrorMessage(getErrorMsg(errorIdInvalid));
    }
  };
  return (
    <Form
      noValidate
      validated={formState !== "initial"}
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3" controlId="form-team">
        <Form.Label className="h3 m-0">Teamname</Form.Label>
        <Form.Control
          type="text"
          name="team"
          required
          maxLength={maxTeamNameLen}
          disabled={formState === "pending"}
        />
        <Form.Text className="text-muted">
          Deiner Kreativität sind (fast) keine Grenzen gesetzt 😉
        </Form.Text>
      </Form.Group>
      <div className="h3 mb-1">Team Captain</div>
      <div className="row gx-3 gy-2 mb-3">
        <Form.Group className="col-12 col-lg-6" controlId="form-firstname">
          <Form.Label className="h5 m-0">Vorname</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            required
            disabled={formState === "pending"}
          />
        </Form.Group>
        <Form.Group className="col-12 col-lg-6" controlId="form-lastname">
          <Form.Label className="h5 m-0">Nachname</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            required
            disabled={formState === "pending"}
          />
        </Form.Group>
        <Form.Group className="col-12 col-lg-6" controlId="form-email">
          <Form.Label className="h5 m-0">E-Mail</Form.Label>
          <Form.Control
            type="email"
            name="email"
            required
            disabled={formState === "pending"}
          />
          <Form.Text className="text-muted">
            Für das Bestätigungsmail und für weitere Infos.
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-12 col-lg-6" controlId="form-mobile">
          <Form.Label className="h5 m-0">Mobile</Form.Label>
          <Form.Control
            type="text"
            name="mobile"
            disabled={formState === "pending"}
          />
          <Form.Text className="text-muted">
            Optional, falls wir dich kurzfristig erreichen müssen.
          </Form.Text>
        </Form.Group>
      </div>
      <div className="mb-2">
        <Form.Check id="form-rules">
          <Form.Check.Input type="checkbox" required />
          <Form.Check.Label>
            Hiermit bestätige ich, dass ich mit den{" "}
            <a href="/regeln" target="_blank">
              Teilnahmebedingungen
            </a>{" "}
            einverstanden bin.
          </Form.Check.Label>
        </Form.Check>
      </div>
      <div className="mb-3">
        <Form.Check id="form-referee">
          <Form.Check.Input type="checkbox" required />
          <Form.Check.Label>
            Ich habe verstanden, dass wir einen Schiedsrichter bereitstellen
            müssen (nicht während eigenen Spielen).
          </Form.Check.Label>
        </Form.Check>
      </div>
      {formState === "failed" && <Alert variant="danger">{errorMessage}</Alert>}
      <Button
        variant="primary"
        type="submit"
        disabled={formState === "pending"}
      >
        {formState === "pending" && (
          <span className="spinner-border spinner-border-sm" />
        )}{" "}
        {submitLabel}
      </Button>
    </Form>
  );
}
