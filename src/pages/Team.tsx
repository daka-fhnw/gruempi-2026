import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { Link, type DefaultParams, type RouteComponentProps } from "wouter";
import { Alert, Button } from "react-bootstrap";
import { Loading } from "../comps/Loading";
import { BackToStart } from "../comps/BackToStart";
import { TeamForm, type TeamValues } from "../comps/TeamForm";
import { ArrowLink } from "../comps/ArrowLink";

type MainViewStates =
  | "loading"
  | "failed"
  | "verify"
  | "overview"
  | "edit"
  | "delete"
  | "deleted";

interface TeamParams extends DefaultParams {
  token: string;
}

interface TeamResponse extends TeamValues {
  verified: boolean;
  waitinglist: boolean;
}

interface TeamViewProps {
  token: string;
  values: TeamResponse;
  setMainViewState: (state: MainViewStates) => void;
  triggerUpdate: () => void;
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
  const [values, setValues] = useState<TeamResponse | null>(null);
  const [viewState, setViewState] = useState<MainViewStates>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [version, setVersion] = useState(1);
  const setMainViewState = useCallback(
    (state: MainViewStates) => {
      setViewState(state);
      window.scrollTo(0, 0);
    },
    [setViewState],
  );
  const triggerUpdate = useCallback(() => {
    setMainViewState("loading");
    setVersion(version + 1);
  }, [setMainViewState, version, setVersion]);
  useEffect(() => {
    fetch("/api/get-team.php?token=" + params.token)
      .then((response) => {
        if (response.ok) {
          return response.json() as Promise<TeamResponse>;
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
        if (data.verified) {
          setMainViewState("overview");
        } else {
          setMainViewState("verify");
        }
      })
      .catch((error) => {
        setMainViewState("failed");
        setErrorMessage(getErrorMsg(error));
      });
  }, [params.token, setMainViewState, version]);
  switch (viewState) {
    case "verify":
      return (
        <TeamVerify
          values={values!}
          token={params.token}
          setMainViewState={setMainViewState}
          triggerUpdate={triggerUpdate}
        />
      );
    case "overview":
      return (
        <TeamOverview
          values={values!}
          token={params.token}
          setMainViewState={setMainViewState}
          triggerUpdate={triggerUpdate}
        />
      );
    case "edit":
      return (
        <TeamEdit
          values={values!}
          token={params.token}
          setMainViewState={setMainViewState}
          triggerUpdate={triggerUpdate}
        />
      );
    case "delete":
      return (
        <TeamDelete
          values={values!}
          token={params.token}
          setMainViewState={setMainViewState}
          triggerUpdate={triggerUpdate}
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

type VerifyViewStates = "initial" | "pending" | "failed";

function TeamVerify({ token, values, triggerUpdate }: TeamViewProps) {
  const [viewState, setViewState] = useState<VerifyViewStates>("initial");
  const handleVerify = () => {
    setViewState("pending");
    fetch("/api/verify-team.php", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
      .then((response) => {
        if (response.ok) {
          triggerUpdate();
        } else {
          Promise.reject("HTTP status code " + response.status);
        }
      })
      .catch((error) => {
        console.error(error);
        setViewState("failed");
      });
  };
  return (
    <>
      <h1>Team anmelden</h1>
      <Alert variant="info">
        Bitte bestätige die Anmeldung deines Teams "{values.team}".
      </Alert>
      {viewState === "failed" && (
        <Alert variant="danger">{getErrorMsg("failed")}</Alert>
      )}
      <div>
        <Button
          variant="primary"
          onClick={handleVerify}
          disabled={viewState === "pending"}
        >
          {viewState === "pending" && (
            <span className="spinner-border spinner-border-sm" />
          )}{" "}
          Anmeldung Bestätigen
        </Button>
      </div>
    </>
  );
}

function nonBreakingText(text: string) {
  return text.replaceAll(" ", "\u00a0");
}

function TeamOverview({ values, setMainViewState }: TeamViewProps) {
  const teamListLink = (
    <Link href="/teams">
      <ArrowLink>Liste der angemeldeten Teams</ArrowLink>
    </Link>
  );
  return (
    <>
      <h1>Dein Team</h1>
      {values.waitinglist ? (
        <Alert variant="danger">
          Dein Team steht auf der Warteliste, da bereits 20&nbsp;Teams
          angemeldet sind. Schau doch ab und zu vorbei, vielleicht wird ein
          Platz frei.
          <br />
          {teamListLink}
        </Alert>
      ) : (
        <Alert variant="success">
          Dein Team ist bestätigt (nicht auf der Warteliste).
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
        <Button variant="primary me-2" onClick={() => setMainViewState("edit")}>
          Team bearbeiten
        </Button>
        <Button variant="primary" onClick={() => setMainViewState("delete")}>
          Team löschen
        </Button>
      </div>
    </>
  );
}

function TeamEdit({
  token,
  values,
  setMainViewState,
  triggerUpdate,
}: TeamViewProps) {
  const onSubmitEdit = useCallback(
    (newValues: TeamValues) => {
      return fetch("/api/edit-team.php", {
        method: "POST",
        body: JSON.stringify({ token, ...newValues }),
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
  const onCancel = useCallback(
    () => setMainViewState("overview"),
    [setMainViewState],
  );
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

type DeleteViewStates = "initial" | "pending" | "failed";

function TeamDelete({ token, values, setMainViewState }: TeamViewProps) {
  const [viewState, setViewState] = useState<DeleteViewStates>("initial");
  const handleDelete = () => {
    setViewState("pending");
    fetch("/api/delete-team.php", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
      .then((response) => {
        if (response.ok) {
          setMainViewState("deleted");
        } else {
          Promise.reject("HTTP status code " + response.status);
        }
      })
      .catch((error) => {
        console.error(error);
        setViewState("failed");
      });
  };
  const handleCancel = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMainViewState("overview");
  };
  return (
    <>
      <h1>Team löschen</h1>
      <Alert variant="danger">
        Willst du das Team "{values.team}" wirklich löschen? Dieser Schritt kann
        nicht rückgängig gemacht werden.
      </Alert>
      {viewState === "failed" && (
        <Alert variant="danger">{getErrorMsg("failed")}</Alert>
      )}
      <div>
        <Button
          variant="primary"
          onClick={handleDelete}
          disabled={viewState === "pending"}
        >
          {viewState === "pending" && (
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
