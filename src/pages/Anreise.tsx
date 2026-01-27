import Karte from "../comps/Karte";
import useScrollToTop from "../hooks/useScrollToTop";

export default function Anreise() {
  useScrollToTop();
  return (
    <>
      <h1>Anreise</h1>
      <Karte />
    </>
  );
}
