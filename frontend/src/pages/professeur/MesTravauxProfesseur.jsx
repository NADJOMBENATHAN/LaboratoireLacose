import { useState, useEffect } from "react";

function MesTravauxProfesseur() {
  const [travaux, setTravaux] = useState([]);

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [dateLimite, setDateLimite] = useState("");
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);

  const recupererTravaux = async () => {
    try {
      const token = localStorage.getItem("token");
      const reponse = await fetch(
        "http://localhost:5000/api/professeur/travaux",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (!reponse.ok) throw new Error("Échec de récupération");
      const donnees = await reponse.json();
      setTravaux(donnees);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    recupererTravaux();
  }, []);

  const handleCreation = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const reponse = await fetch(
        "http://localhost:5000/api/professeur/travaux",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            titre,
            description,
            date_limite: dateLimite,
          }),
        },
      );

      if (!reponse.ok) throw new Error("Échec de la création");

      setTitre("");
      setDescription("");
      setDateLimite("");
      setAfficherFormulaire(false);
      recupererTravaux();
    } catch (err) {
      console.error(err);
      alert("Impossible de créer le travail pratique. Réessaie plus tard.");
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm page-enter">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Travaux pratiques
        </h2>
        <button
          type="button"
          onClick={() => setAfficherFormulaire(!afficherFormulaire)}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
        >
          {afficherFormulaire ? "Annuler" : "+ Nouveau travail"}
        </button>
      </div>

      {afficherFormulaire && (
        <form
          onSubmit={handleCreation}
          className="mb-6 p-4 rounded-lg bg-gray-50 border border-gray-200 page-enter"
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titre
          </label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
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
            Date limite
          </label>
          <input
            type="date"
            value={dateLimite}
            onChange={(e) => setDateLimite(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />

          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white transition-all duration-200 hover:opacity-90"
          >
            Créer le travail pratique
          </button>
        </form>
      )}

      <div className="space-y-2">
        {travaux.map((tp) => (
          <div key={tp.id} className="p-4 rounded-lg border border-gray-200">
            <p className="font-medium text-gray-800">{tp.titre}</p>
            <p className="text-sm text-gray-500">
              Date limite : {tp.date_limite}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MesTravauxProfesseur;
