import { useState, useEffect } from "react";

function Parametres() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [messageConfirmation, setMessageConfirmation] = useState("");

  // Au chargement, on récupère le profil actuel depuis le backend
  useEffect(() => {
    const recupererProfil = async () => {
      const reponse = await fetch("http://localhost:5000/api/profil");
      const donnees = await reponse.json();
      setNom(donnees.nom);
      setPrenom(donnees.prenom);
      setEmail(donnees.email);
    };
    recupererProfil();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // On envoie les nouvelles valeurs au backend avec une requête PUT
    await fetch("http://localhost:5000/api/profil", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, prenom, email }),
    });

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
