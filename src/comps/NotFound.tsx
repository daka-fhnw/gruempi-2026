import { BackToStart } from "./BackToStart";
import cat404 from "../assets/cat404.svg";

export function NotFound() {
  return (
    <>
      <h1>Seite nicht gefunden!</h1>
      <div className="mb-3">
        <img
          style={{ width: "100%", maxWidth: "350px" }}
          src={cat404}
          alt="404"
        />
      </div>
      <BackToStart />
    </>
  );
}
