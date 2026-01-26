import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Regeln from "./pages/Regeln";
import Header from "./comps/Header";
import "./App.scss";

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/regeln" element={<Regeln />} />
        </Routes>
      </main>
    </>
  );
}
