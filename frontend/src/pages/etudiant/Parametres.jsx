import { useState } from "react";

function Parametres() {
  // Champs contrôlés pour modifier le profil (correspond à modifierProfil()
  // dans la classe Utilisateur du diagramme UML)
  const [nom, setNom] = useState("Koffi");
  const [prenom, setPrenom] = useState("Ama");
  const [email, setEmail] = useState("ama.koffi@etu.univ-kara.tg");
  const [messageConfirmation, setMessageConfirmation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Version temporaire : pas encore d'appel API (à remplacer par PUT /api/utilisateurs/:id)
    setMessageConfirmation("Profil mis à jour avec succès.");
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm page-enter max-w-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Paramètres</h2>

      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom
        </label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Prénom
        </label>
        <input
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        {messageConfirmation && (
          <p className="text-green-600 text-sm mb-4">{messageConfirmation}</p>
        )}

        <button
          type="submit"
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 hover:scale-105 active:scale-95"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}

export default Parametres;
