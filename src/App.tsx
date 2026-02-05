import React, { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Header from "./comps/Header";
import Loading from "./comps/Loading";
import "./App.scss";

export default function App() {
  const Start = React.lazy(() => import("./pages/Start"));
  const Regeln = React.lazy(() => import("./pages/Regeln"));
  const Anreise = React.lazy(() => import("./pages/Anreise"));
  const Impressum = React.lazy(() => import("./pages/Impressum"));
  const Datenschutz = React.lazy(() => import("./pages/Datenschutz"));
  return (
    <>
      <Header />
      <div className="wrapper d-flex flex-column">
        <main className="container flex-fill">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/regeln" element={<Regeln />} />
              <Route path="/anreise" element={<Anreise />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
            </Routes>
          </Suspense>
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
