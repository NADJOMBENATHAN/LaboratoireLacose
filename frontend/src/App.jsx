import { BrowserRouter, Routes, Route } from "react-router-dom";
import EtudiantLayout from "./layouts/EtudiantLayout";
import MesLaboratoires from "./pages/etudiant/MesLaboratoires";
import TableauBordEtudiant from "./pages/etudiant/TableauBordEtudiant";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import TravauxPratiques from "./pages/etudiant/TravauxPratiques";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/etudiant" element={<EtudiantLayout />}>
          <Route index element={<TableauBordEtudiant />} />
          <Route path="laboratoires" element={<MesLaboratoires />} />
          <Route path="travaux" element={<TravauxPratiques />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
