import { Link, Route, Routes } from "react-router-dom";
import Header from "./comps/Header";
import Start from "./pages/Start";
import Regeln from "./pages/Regeln";
import Anreise from "./pages/Anreise";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import "./App.scss";

export default function App() {
  return (
    <>
      <Header />
      <div className="wrapper d-flex flex-column">
        <main className="container flex-fill">
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/regeln" element={<Regeln />} />
            <Route path="/anreise" element={<Anreise />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
          </Routes>
        </main>
        <footer className="bg-primary flex-grow-0">
          <div className="container text-light text-end">
            <Link to="/impressum">Impressum</Link>
            <Link to="/datenschutz">Datenschutz</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
