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
  const Infos = React.lazy(() => import("./pages/Infos"));
  const Anreise = React.lazy(() => import("./pages/Anreise"));
  const Galerie = React.lazy(() => import("./pages/Galerie"));
  //const Anmelden = React.lazy(() => import("./pages/Anmelden"));
  const Sponsoren = React.lazy(() => import("./pages/Sponsoren"));
  const Impressum = React.lazy(() => import("./pages/Impressum"));
  const Datenschutz = React.lazy(() => import("./pages/Datenschutz"));
  //const Team = React.lazy(() => import("./pages/Team"));
  //const Teams = React.lazy(() => import("./pages/Teams"));
  const Spielplan = React.lazy(() => import("./pages/Spielplan"));
  return (
    <>
      <Header />
      <ScrollToTop />
      <div className="wrapper d-flex flex-column">
        <main className="container flex-fill">
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/" component={Start} />
              <Route path="/infos" component={Infos} />
              <Route path="/anreise" component={Anreise} />
              <Route path="/galerie" component={Galerie} />
              {/*<Route path="/anmelden" component={Anmelden} />*/}
              <Route path="/sponsoren" component={Sponsoren} />
              <Route path="/impressum" component={Impressum} />
              <Route path="/datenschutz" component={Datenschutz} />
              {/*<Route path="/team/:token" component={Team} />*/}
              {/*<Route path="/teams" component={Teams} />*/}
              <Route path="/spielplan" component={Spielplan} />
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
