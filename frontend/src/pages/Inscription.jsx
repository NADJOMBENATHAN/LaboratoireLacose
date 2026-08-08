import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Inscription() {
  // Champs contrôlés du formulaire
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");
  // Garde en mémoire un message d'erreur à afficher si la validation échoue
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérification simple avant l'envoi : les deux mots de passe doivent correspondre.
    // Si ce n'est pas le cas, on affiche une erreur et on arrête la fonction avec return
    if (motDePasse !== confirmation) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }

    setErreur("");
    // Version temporaire : pas encore de vraie création de compte côté backend
    // (à remplacer par un appel API type POST /api/auth/register)
    navigate("/etudiant");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-indigo-600 text-center mb-6">
          Inscription
        </h1>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom complet
        </label>
        <input
          type="text"
          placeholder="Votre nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-indigo-50 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mot de passe
        </label>
        <input
          type="password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-indigo-50 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirmer le mot de passe
        </label>
        <input
          type="password"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          className="w-full mb-2 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />
        {/* Affiché seulement si erreur n'est pas une chaîne vide (rendu conditionnel) */}
        {erreur && <p className="text-red-500 text-sm mb-4">{erreur}</p>}

        <button
          type="submit"
          className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:opacity-90"
        >
          S'inscrire
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Vous avez déjà un compte ?{" "}
          <a href="/connexion" className="text-indigo-600 hover:underline">
            Se connecter
          </a>
        </p>
      </form>
    </div>
  );
}

export default Inscription;
