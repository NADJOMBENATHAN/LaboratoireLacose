import { useState } from "react";

function TravauxPratiques() {
  // Données simulées — seront remplacées par un appel API
  // (GET /api/laboratoires/:id/travaux) une fois le backend connecté
  const travaux = [
    {
      id: 1,
      titre: "Dosage acido-basique",
      description:
        "Réaliser un dosage pour déterminer la concentration d'une solution acide.",
      dateLimite: "15/09/2026",
    },
    {
      id: 2,
      titre: "Mesure du pH",
      description:
        "Mesurer le pH de différentes solutions et interpréter les résultats.",
      dateLimite: "22/09/2026",
    },
    {
      id: 3,
      titre: "Préparation d'une solution",
      description:
        "Préparer une solution à une concentration donnée par dilution.",
      dateLimite: "29/09/2026",
    },
  ];
  // Garde en mémoire l'id du travail pratique actuellement sélectionné
  const [travailSelectionneId, setTravailSelectionneId] = useState(null);
  // Garde en mémoire ce que l'étudiant est en train de taper dans le champ de soumission
  const [contenu, setContenu] = useState("");
  // Garde en mémoire la liste des soumissions déjà faites :
  // chaque élément associe un travailId à son contenu soumis
  const [soumissions, setSoumissions] = useState([]);
  // Retrouve l'objet travail complet à partir de l'id sélectionné

  const travailSelectionne = travaux.find(
    (tp) => tp.id === travailSelectionneId,
  );
  // Vérifie si le travail actuellement sélectionné a déjà été soumis
  const dejaSoumis =
    travailSelectionne &&
    soumissions.some((s) => s.travailId === travailSelectionne.id);
  // Gère l'envoi du formulaire de soumission :
  // on ajoute la soumission à la liste, puis on vide le champ de texte
  const handleSoumission = (e) => {
    e.preventDefault();// empêche le rechargement automatique de la page
    setSoumissions([

      { travailId: travailSelectionne.id, contenu },
    ]);
    setContenu("");
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Travaux pratiques
      </h2>

      <div className="space-y-2">
        {travaux.map((tp) => (
          <div
            key={tp.id}
            onClick={() => setTravailSelectionneId(tp.id)}
            className={`p-4 rounded-lg cursor-pointer border transition-colors ${
              travailSelectionneId === tp.id
                ? "border-indigo-400 bg-indigo-50"
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
        <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
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
                className="mt-3 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
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
