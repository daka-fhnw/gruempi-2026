import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { Link, type DefaultParams, type RouteComponentProps } from "wouter";
import { Alert, Button } from "react-bootstrap";
import { Loading } from "../comps/Loading";
import { BackToStart } from "../comps/BackToStart";
import { TeamForm, type Team } from "../comps/TeamForm";
import { ArrowLink } from "../comps/ArrowLink";

type TeamViewStates =
  | "loading"
  | "failed"
  | "overview"
  | "edit"
  | "delete"
  | "deleted";

interface TeamParams extends DefaultParams {
  token: string;
}

function getErrorMsg(error: unknown) {
  if (error === "invalid") {
    return "Der Link ist ungültig oder abgelaufen 😕";
  } else {
    console.error(error);
    return "Da ist etwas schief gegangen, versuch es doch bitte später nochmals 😕";
  }
}

export default function Team({ params }: RouteComponentProps<TeamParams>) {
  const [values, setValues] = useState<Team | null>(null);
  const [viewState, setViewState] = useState<TeamViewStates>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [version, setVersion] = useState(1);
  const triggerUpdate = useCallback(() => {
    setViewState("loading");
    setVersion(version + 1);
  }, [version, setVersion]);
  useEffect(() => {
    fetch("/api/get-team.php?token=" + params.token)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          if (response.status === 400) {
            return Promise.reject("invalid");
          } else {
            return Promise.reject("HTTP status code " + response.status);
          }
        }
      })
      .then((data) => {
        setValues(data);
        setViewState("overview");
      })
      .catch((error) => {
        setViewState("failed");
        setErrorMessage(getErrorMsg(error));
      });
  }, [params.token, version]);
  switch (viewState) {
    case "overview":
      return <TeamOverview values={values!} setViewState={setViewState} />;
    case "edit":
      return (
        <TeamEdit
          values={values!}
          token={params.token}
          setViewState={setViewState}
          triggerUpdate={triggerUpdate}
        />
      );
    case "delete":
      return (
        <TeamDelete
          token={params.token}
          values={values!}
          setViewState={setViewState}
        />
      );
    case "deleted":
      return (
        <>
          <Alert variant="info">Team wurde gelöscht 😕</Alert>
          <BackToStart />
        </>
      );
    case "failed":
      return (
        <>
          <Alert variant="danger">{errorMessage}</Alert>
          <BackToStart />
        </>
      );
    default:
      return <Loading />;
  }
}

interface TeamOverviewProps {
  values: Team;
  setViewState: (state: TeamViewStates) => void;
}

function nonBreakingText(text: string) {
  return text.replaceAll(" ", "\u00a0");
}

function TeamOverview({ values, setViewState }: TeamOverviewProps) {
  const teamListLink = (
    <Link href="/teams">
      <ArrowLink>Liste der angemeldeten Teams</ArrowLink>
    </Link>
  );
  return (
    <>
      <h1>Dein Team</h1>
      {values.waitinglist === false ? (
        <Alert variant="success">
          Dein Team ist bestätigt (nicht auf der Warteliste).
          <br />
          {teamListLink}
        </Alert>
      ) : (
        <Alert variant="danger">
          Dein Team steht auf der Warteliste, da bereits 20&nbsp;Teams
          angemeldet sind. Schau doch ab und zu vorbei, vielleicht wird ein
          Platz frei.
          <br />
          {teamListLink}
        </Alert>
      )}
      <h3>Teamname</h3>
      <p>{values.team}</p>
      <h3>Team Captain</h3>
      <p>
        {values.firstname} {values.lastname}, {values.email}
        {values.mobile ? ` / ${nonBreakingText(values.mobile)}` : ""}
      </p>
      <div>
        <Button variant="primary me-2" onClick={() => setViewState("edit")}>
          Team bearbeiten
        </Button>
        <Button variant="primary" onClick={() => setViewState("delete")}>
          Team löschen
        </Button>
      </div>
    </>
  );
}

interface TeamEditProps {
  token: string;
  values: Team;
  setViewState: (state: TeamViewStates) => void;
  triggerUpdate: () => void;
}

function TeamEdit({
  token,
  values,
  setViewState,
  triggerUpdate,
}: TeamEditProps) {
  const onSubmitEdit = useCallback(
    (values: Team) => {
      return fetch("/api/edit-team.php", {
        method: "POST",
        body: JSON.stringify({ token, ...values }),
      }).then((response) => {
        if (response.ok) {
          triggerUpdate();
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
    },
    [token, triggerUpdate],
  );
  const onCancel = useCallback(() => setViewState("overview"), [setViewState]);
  return (
    <>
      <h1>Team bearbeiten</h1>
      <TeamForm
        values={values}
        submitLabel="Speichern"
        onSubmit={onSubmitEdit}
        onCancel={onCancel}
      />
    </>
  );
}

interface TeamDeleteProps {
  token: string;
  values: Team;
  setViewState: (state: TeamViewStates) => void;
}

type DeleteState = "initial" | "pending" | "failed";

function TeamDelete({ token, values, setViewState }: TeamDeleteProps) {
  const [deleteState, setDeleteState] = useState<DeleteState>("initial");
  const handleDelete = () => {
    setDeleteState("pending");
    fetch("/api/delete-team.php", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
      .then((response) => {
        if (response.ok) {
          setViewState("deleted");
        } else {
          Promise.reject("HTTP status code " + response.status);
        }
      })
      .catch((error) => {
        console.error(error);
        setDeleteState("failed");
      });
  };
  const handleCancel = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setViewState("overview");
  };
  return (
    <>
      <h1>Team löschen</h1>
      <Alert variant="danger">
        Willst du das Team "{values.team}" wirklich löschen? Dieser Schritt kann
        nicht rückgängig gemacht werden.
      </Alert>
      {deleteState === "failed" && (
        <Alert variant="danger">{getErrorMsg("failed")}</Alert>
      )}
      <div>
        <Button
          variant="primary"
          onClick={handleDelete}
          disabled={deleteState === "pending"}
        >
          {deleteState === "pending" && (
            <span className="spinner-border spinner-border-sm" />
          )}{" "}
          Bestätigen
        </Button>
        <span className="ms-3">
          <a href="#" onClick={handleCancel}>
            Abbrechen
          </a>
        </span>
      </div>
    </>
  );
}
