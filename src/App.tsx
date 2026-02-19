import React, { Suspense } from "react";
import { Link, Route, Switch } from "wouter";
import { Header } from "./comps/Header";
import { ScrollToTop } from "./comps/ScrollToTop";
import { Loading } from "./comps/Loading";
import { NotFound } from "./comps/NotFound";
import { InstaIcon } from "./icons/InstaIcon";
import "./App.scss";

export function App() {
  const Start = React.lazy(() => import("./pages/Start"));
  const Regeln = React.lazy(() => import("./pages/Regeln"));
  const Anreise = React.lazy(() => import("./pages/Anreise"));
  const Gallerie = React.lazy(() => import("./pages/Gallerie"));
  const Anmelden = React.lazy(() => import("./pages/Anmelden"));
  const Sponsoren = React.lazy(() => import("./pages/Sponsoren"));
  const Impressum = React.lazy(() => import("./pages/Impressum"));
  const Datenschutz = React.lazy(() => import("./pages/Datenschutz"));
  return (
    <>
      <Header />
      <ScrollToTop />
      <div className="wrapper d-flex flex-column">
        <main className="container flex-fill">
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/" component={Start} />
              <Route path="/regeln" component={Regeln} />
              <Route path="/anreise" component={Anreise} />
              <Route path="/gallerie" component={Gallerie} />
              <Route path="/anmelden" component={Anmelden} />
              <Route path="/sponsoren" component={Sponsoren} />
              <Route path="/impressum" component={Impressum} />
              <Route path="/datenschutz" component={Datenschutz} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </main>
        <footer className="bg-primary flex-grow-0">
          <div className="container text-light">
            <div className="row justify-content-between">
              <div className="col-auto">
                <a href="https://instagram.com/fhnwgruempi" target="_blank">
                  <span className="me-1">
                    <InstaIcon />
                  </span>
                  Instagram
                </a>
              </div>
              <div className="col-auto">
                <Link to="/impressum">Impressum</Link>
                {" | "}
                <Link to="/datenschutz">Datenschutz</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
