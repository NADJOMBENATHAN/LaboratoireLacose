import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MesLaboratoires() {
  // Liste vide au départ — sera remplie par la réponse du backend
  const [laboratoires, setLaboratoires] = useState([]);

  // useEffect s'exécute automatiquement une fois, au chargement de la page
  // (le tableau vide [] à la fin veut dire "seulement au premier affichage")
  useEffect(() => {
    const recupererLaboratoires = async () => {
      const reponse = await fetch("http://localhost:5000/api/laboratoires");
      const donnees = await reponse.json();
      setLaboratoires(donnees);
    };
    recupererLaboratoires();
  }, []);

  const [laboSelectionneId, setLaboSelectionneId] = useState(null);
  const laboSelectionne = laboratoires.find(
    (labo) => labo.id === laboSelectionneId,
  );

  const navigate = useNavigate();

  const handleInscription = () => {
    navigate("/inscription");
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm page-enter">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Mes laboratoires
      </h2>

      <div className="space-y-2">
        {laboratoires.map((labo) => (
          <div
            key={labo.id}
            onClick={() => setLaboSelectionneId(labo.id)}
            className={`p-4 rounded-lg cursor-pointer border transition-all duration-200 ${
              laboSelectionneId === labo.id
                ? "border-indigo-400 bg-indigo-50 scale-[1.02]"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <p className="font-medium text-gray-800">{labo.nom}</p>
            <p className="text-sm text-gray-500">{labo.domaine}</p>
          </div>
        ))}
      </div>

      {laboSelectionne && (
        <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200 page-enter">
          <h3 className="font-semibold text-gray-800">{laboSelectionne.nom}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {laboSelectionne.description}
          </p>
          <button
            type="button"
            onClick={handleInscription}
            className="mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 hover:scale-105 active:scale-95"
          >
            S'inscrire
          </button>
        </div>
      )}
    </div>
  );
}

export default MesLaboratoires;
