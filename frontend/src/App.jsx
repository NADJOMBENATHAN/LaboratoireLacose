import { BrowserRouter, Routes, Route } from "react-router-dom";
import EtudiantLayout from "./layouts/EtudiantLayout";
import MesLaboratoires from "./pages/etudiant/MesLaboratoires";
import TableauBordEtudiant from "./pages/etudiant/TableauBordEtudiant";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import TravauxPratiques from "./pages/etudiant/TravauxPratiques";
import MesSoumissions from "./pages/etudiant/MesSoumissions";
import Parametres from "./pages/etudiant/Parametres";
import ProfesseurLayout from "./layouts/ProfesseurLayout";
import TableauBordProfesseur from "./pages/professeur/TableauBordProfesseur";
import MesLaboratoiresProfesseur from "./pages/professeur/MesLaboratoiresProfesseur";
import RouteProtegee from "./components/RouteProtegee";
import MesTravauxProfesseur from "./pages/professeur/MesTravauxProfesseur";
import MesArticlesProfesseur from "./pages/professeur/MesArticlesProfesseur";
import Evaluations from "./pages/professeur/Evaluations";
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
          <Route path="soumissions" element={<MesSoumissions />} />
          <Route path="parametres" element={<Parametres />} />
        </Route>

        <Route
          path="/professeur"
          element={
            <RouteProtegee>
              <ProfesseurLayout />
            </RouteProtegee>
          }
        >
          <Route index element={<TableauBordProfesseur />} />
          <Route path="laboratoires" element={<MesLaboratoiresProfesseur />} />
          <Route path="laboratoires" element={<MesLaboratoiresProfesseur />} />
          <Route path="travaux" element={<MesTravauxProfesseur />} />
          <Route path="articles" element={<MesArticlesProfesseur />} />
          <Route path="evaluations" element={<Evaluations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
