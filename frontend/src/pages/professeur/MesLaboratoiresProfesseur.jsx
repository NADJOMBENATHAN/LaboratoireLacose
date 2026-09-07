import { useState, useEffect } from "react";

function MesLaboratoiresProfesseur() {
  // Liste des laboratoires dirigés par ce professeur
  const [laboratoires, setLaboratoires] = useState([]);

  // Champs du formulaire de création
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [domaine, setDomaine] = useState("");
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);

  // Récupère les laboratoires existants depuis le backend
  const recupererLaboratoires = async () => {
    try {
      const token = localStorage.getItem("token");
      const reponse = await fetch("http://localhost:5000/api/laboratoires", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!reponse.ok) throw new Error("Échec de récupération");
      const donnees = await reponse.json();
      setLaboratoires(donnees);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    recupererLaboratoires();
  }, []);

  // Envoie le nouveau laboratoire au backend, puis rafraîchit la liste
  const handleCreation = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const reponse = await fetch("http://localhost:5000/api/laboratoires", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nom, description, domaine }),
      });

      if (!reponse.ok) {
        throw new Error("Échec de la création du laboratoire");
      }

      setNom("");
      setDescription("");
      setDomaine("");
      setAfficherFormulaire(false);
      recupererLaboratoires();
    } catch (err) {
      console.error(err);
      alert("Impossible de créer le laboratoire. Réessaie plus tard.");
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm page-enter">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Mes laboratoires
        </h2>
        <button
          type="button"
          onClick={() => setAfficherFormulaire(!afficherFormulaire)}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
        >
          {afficherFormulaire ? "Annuler" : "+ Nouveau laboratoire"}
        </button>
      </div>

      {afficherFormulaire && (
        <form
          onSubmit={handleCreation}
          className="mb-6 p-4 rounded-lg bg-gray-50 border border-gray-200 page-enter"
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full mb-3 px-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full mb-3 px-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Domaine
          </label>
          <input
            type="text"
            value={domaine}
            onChange={(e) => setDomaine(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />

          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white transition-all duration-200 hover:opacity-90"
          >
            Créer le laboratoire
          </button>
        </form>
      )}

      <div className="space-y-2">
        {laboratoires.map((labo) => (
          <div key={labo.id} className="p-4 rounded-lg border border-gray-200">
            <p className="font-medium text-gray-800">{labo.nom}</p>
            <p className="text-sm text-gray-500">{labo.domaine}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MesLaboratoiresProfesseur;
