import { useState } from "react";

function MesLaboratoires() {
  // Données simulées pour l'instant — seront remplacées par un appel à l'API
  // (GET /api/laboratoires) une fois le backend connecté
  const laboratoires = [
    {
      id: 1,
      nom: "Laboratoire de Chimie Organique",
      description: "Étude des composés organiques et de leurs réactions.",
      domaine: "Chimie organique",
    },
    {
      id: 2,
      nom: "Laboratoire des Substances Naturelles",
      description: "Extraction et analyse de substances issues de plantes.",
      domaine: "Chimie naturelle",
    },
  ];

  // useState garde en mémoire l'id du laboratoire actuellement sélectionné.
  // null = aucun laboratoire sélectionné au départ.
  const [laboSelectionneId, setLaboSelectionneId] = useState(null);
  // useState garde en mémoire la liste des id des laboratoires
  // auxquels l'étudiant s'est déjà inscrit (liste vide au départ)

  const [inscriptions, setInscriptions] = useState([]);
  // On retrouve l'objet laboratoire complet à partir de l'id sélectionné,
  // pour pouvoir afficher ses détails

  const laboSelectionne = laboratoires.find(
    (labo) => labo.id === laboSelectionneId,
  );
  // Vérifie si l'étudiant est déjà inscrit au labo actuellement sélectionné

  const estInscrit =
    laboSelectionne && inscriptions.includes(laboSelectionne.id);
  // Gère le clic sur "S'inscrire" :
  // on ajoute l'id du labo à la liste des inscriptions, sans jamais modifier
  // la liste existante directement (règle React : toujours créer une nouvelle
  // version du state, jamais la modifier en place)

  const handleInscription = () => {
    setInscriptions([...inscriptions, laboSelectionne.id]);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Mes laboratoires
      </h2>

      <div className="space-y-2">
        {/* .map() transforme chaque laboratoire de la liste en un bloc affiché */}
        {laboratoires.map((labo) => (
          <div
            key={labo.id}
            onClick={() => setLaboSelectionneId(labo.id)}
            className={`p-4 rounded-lg cursor-pointer border transition-colors ${
              // Style différent selon si ce labo est le sélectionné ou non
              laboSelectionneId === labo.id
                ? "border-indigo-400 bg-indigo-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <p className="font-medium text-gray-800">{labo.nom}</p>
            <p className="text-sm text-gray-500">{labo.domaine}</p>
            {/* Badge "Inscrit" affiché seulement si l'étudiant est déjà inscrit à CE labo */}
            {inscriptions.includes(labo.id) && (
              <span className="inline-block mt-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                Inscrit
              </span>
            )}
          </div>
        ))}
      </div>
      {/* Ce bloc de détails ne s'affiche que si un laboratoire est sélectionné
          (rendu conditionnel avec &&) */}
      {laboSelectionne && (
        <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
          <h3 className="font-semibold text-gray-800">{laboSelectionne.nom}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {laboSelectionne.description}
          </p>
          <button
            onClick={handleInscription}
            disabled={estInscrit} // bouton désactivé si déjà inscrit
            className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium ${
              estInscrit
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
            }`}
          >
            {/* Le texte du bouton change selon l'état d'inscription (opérateur ternaire) */}
            {estInscrit ? "Déjà inscrit" : "S'inscrire"}
          </button>
        </div>
      )}
    </div>
  );
}

export default MesLaboratoires;
