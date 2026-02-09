import { useState, type FormEvent } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const maxTeamNameLen = 40;

type TeamFormStates = "initial" | "invalid" | "pending" | "failed";

interface TeamFormProps {
  submitLabel: string;
  onSubmit: (formData: TeamFormValues) => Promise<void>;
}

export interface TeamFormValues {
  team: string;
  email: string;
}

export default function TeamForm({ submitLabel, onSubmit }: TeamFormProps) {
  const [formState, setFormState] = useState<TeamFormStates>("initial");
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (form.checkValidity()) {
      setFormState("pending");
      const formData = new FormData(form);
      const team = formData.get("team") as string;
      const email = formData.get("email") as string;
      onSubmit({ team, email }).catch((error) => {
        console.log(`TeamForm: ${error}`);
        setFormState("failed");
      });
    } else {
      setFormState("invalid");
    }
  };
  return (
    <Form
      noValidate
      validated={formState !== "initial"}
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3" controlId="form-team">
        <Form.Label className="h3">Teamname</Form.Label>
        <Form.Control
          className="bg-white"
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
      <Form.Group className="mb-3" controlId="form-email">
        <Form.Label className="h3">E-Mail</Form.Label>
        <Form.Control
          className="bg-white"
          type="email"
          name="email"
          required
          disabled={formState === "pending"}
        />
        <Form.Text className="text-muted">
          Für das Bestätigungsmail und falls wir dich kontaktieren müssen.
        </Form.Text>
      </Form.Group>
      {formState === "invalid" && (
        <Alert variant="danger">
          Bitte fülle das Formular vollständig und korrekt aus.
        </Alert>
      )}
      {formState === "failed" && (
        <Alert variant="danger">
          Da ist etwas schief gegangen 😕. Bitte versuche es später nochmals.
        </Alert>
      )}
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
