import useScrollToTop from "../hooks/useScrollToTop";

export default function Impressum() {
  useScrollToTop();
  return (
    <>
      <h1>Impressum</h1>
      <p>
        Unter dem Namen "G2024" besteht ein Verein im Sinne von Art. 60 ff. ZGB.
        Sitz des Vereins ist in Muttenz BL. Der Verein bezweckt, sportliche und
        soziale Anlässe für Studierende der Fachhochschule Nordwestschweiz
        (FHNW) zu organisieren und durchzuführen.
      </p>
      <h2>Kontakt</h2>
      <p>
        <a href="mailto:info@grümpi.ch">info@grümpi.ch</a>
      </p>
    </>
  );
}
