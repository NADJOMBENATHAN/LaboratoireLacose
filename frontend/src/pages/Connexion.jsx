import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Connexion() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Version temporaire : pas encore de vraie vérification côté backend
    // On redirige simplement vers l'espace Étudiant pour pouvoir tester
    navigate("/etudiant");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-indigo-600 text-center mb-6">
          Connexion
        </h1>

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
          className="w-full mb-6 px-4 py-2 rounded-lg bg-indigo-50 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:opacity-90"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Connexion;
