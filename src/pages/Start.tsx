import useScrollToTop from "../hooks/useScrollToTop";
import Countdown from "../comps/Countdown";
import start from "../assets/start.webp";

export default function Start() {
  useScrollToTop();
  return (
    <div>
      <h1>Fachhochschule Grümpelturnier</h1>
      <h2>
        Donnerstag 30.&nbsp;April&nbsp;2026 ab&nbsp;17:00, Fussballplatz
        Kriegacker Muttenz
      </h2>
      <div className="fw-bold mb-2">
        Mit Festwirtschaft zu fairen Preisen 😋
      </div>
      <div className="fw-bold mb-2">
        ⚽ <Countdown /> ⚽
      </div>
      <img src={start} className="img-fluid" />
    </div>
  );
}
