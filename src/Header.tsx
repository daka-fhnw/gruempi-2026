import logo from "./assets/logo_buffer.svg";

export default function Header() {
  return (
    <header className="bg-primary">
      <div className="container text-center py-2">
        <div className="row gy-2 justify-content-center align-items-center">
          <div className="col-7 col-md-5 col-lg-4 col-xl-3">
            <img src={logo} width="100%" title="FHNW Grümpi 2026" />
          </div>
          <div className="col-12 col-md-7 col-lg-8 col-xl-9">
            <h2 className="my-0">
              30.&nbsp;April&nbsp;2026 ab&nbsp;17:00
              <br />
              Fussballplatz Kriegacker Muttenz
            </h2>
          </div>
        </div>
      </div>
    </header>
  );
}
