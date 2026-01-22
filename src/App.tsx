import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Start from "./pages/Start";
import Regeln from "./pages/Regeln";

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
