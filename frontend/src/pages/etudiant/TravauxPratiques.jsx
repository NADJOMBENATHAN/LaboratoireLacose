import { useState, useEffect } from "react";

function TravauxPratiques() {
  // Liste vide au départ — remplie par la réponse du backend
  const [travaux, setTravaux] = useState([]);

  // useEffect s'exécute une seule fois, au chargement de la page
  useEffect(() => {
    const recupererTravaux = async () => {
      const reponse = await fetch("http://localhost:5000/api/travaux");
      const donnees = await reponse.json();
      setTravaux(donnees);
    };
    recupererTravaux();
  }, []);

  const [travailSelectionneId, setTravailSelectionneId] = useState(null);
  const [contenu, setContenu] = useState("");
  const [soumissions, setSoumissions] = useState([]);

  const travailSelectionne = travaux.find(
    (tp) => tp.id === travailSelectionneId,
  );
  const dejaSoumis =
    travailSelectionne &&
    soumissions.some((s) => s.travailId === travailSelectionne.id);

  const handleSoumission = (e) => {
    e.preventDefault();
    setSoumissions([
      ...soumissions,
      { travailId: travailSelectionne.id, contenu },
    ]);
    setContenu("");
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm page-enter">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Travaux pratiques
      </h2>

      <div className="space-y-2">
        {travaux.map((tp) => (
          <div
            key={tp.id}
            onClick={() => setTravailSelectionneId(tp.id)}
            className={`p-4 rounded-lg cursor-pointer border transition-all duration-200 ${
              travailSelectionneId === tp.id
                ? "border-indigo-400 bg-indigo-50 scale-[1.02]"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <p className="font-medium text-gray-800">{tp.titre}</p>
            <p className="text-sm text-gray-500">
              Date limite : {tp.dateLimite}
            </p>
            {soumissions.some((s) => s.travailId === tp.id) && (
              <span className="inline-block mt-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                Soumis
              </span>
            )}
          </div>
        ))}
      </div>

      {travailSelectionne && (
        <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200 page-enter">
          <h3 className="font-semibold text-gray-800">
            {travailSelectionne.titre}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {travailSelectionne.description}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Date limite : {travailSelectionne.dateLimite}
          </p>

          {dejaSoumis ? (
            <p className="mt-4 text-sm text-green-700 font-medium">
              Travail déjà soumis ✓
            </p>
          ) : (
            <form onSubmit={handleSoumission} className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Votre soumission
              </label>
              <textarea
                value={contenu}
                onChange={(e) => setContenu(e.target.value)}
                rows={4}
                placeholder="Décrivez votre travail, vos résultats..."
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              />
              <button
                type="submit"
                className="mt-3 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
              >
                Soumettre
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default TravauxPratiques;
