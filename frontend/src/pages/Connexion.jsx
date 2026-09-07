import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Connexion() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");

    try {
      const reponse = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mot_de_passe: motDePasse }),
      });

      if (!reponse.ok) {
        const donneesErreur = await reponse.json();
        setErreur(donneesErreur.message || "Échec de la connexion");
        return;
      }

      const donnees = await reponse.json();

      // On garde le token et les infos du professeur pour les requêtes suivantes
      localStorage.setItem("token", donnees.token);
      localStorage.setItem("utilisateur", JSON.stringify(donnees.professeur));

      navigate("/professeur");
    } catch (err) {
      console.error(err);
      setErreur("Impossible de se connecter au serveur");
    }
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

        {erreur && (
          <p className="mb-4 text-sm text-red-600 text-center">{erreur}</p>
        )}

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
