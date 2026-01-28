import useScrollToTop from "../hooks/useScrollToTop";
import Countdown from "../comps/Countdown";
import Sponsoren from "../comps/Sponsoren";
import start from "../assets/start.webp";

export default function Start() {
  useScrollToTop();
  return (
    <div>
      <h1>Fachhochschule Grümpelturnier</h1>
      <h3>
        Donnerstag 30.&nbsp;April&nbsp;2026 ab&nbsp;17:00, Fussballplatz
        Kriegacker Muttenz
      </h3>
      <div className="fw-bold">
        Mit Festwirtschaft zu fairen Preisen 😋
        <br />
        <Countdown /> ⚽
      </div>
      <div className="my-3">
        <img src={start} className="img-fluid" />
      </div>
      <h2>Sponsoren</h2>
      <Sponsoren />
    </div>
  );
}
