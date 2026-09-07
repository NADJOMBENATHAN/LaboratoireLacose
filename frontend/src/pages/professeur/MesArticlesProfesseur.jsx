import { useState, useEffect } from "react";

function MesArticlesProfesseur() {
  const [articles, setArticles] = useState([]);

  const [titre, setTitre] = useState("");
  const [resume, setResume] = useState("");
  const [contenu, setContenu] = useState("");
  const [categorie, setCategorie] = useState("");
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);

  const recupererArticles = async () => {
    try {
      const token = localStorage.getItem("token");
      const reponse = await fetch(
        "http://localhost:5000/api/professeur/articles",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (!reponse.ok) throw new Error("Échec de récupération");
      const donnees = await reponse.json();
      setArticles(donnees);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    recupererArticles();
  }, []);

  const handleCreation = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const reponse = await fetch(
        "http://localhost:5000/api/professeur/articles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ titre, resume, contenu, categorie }),
        },
      );

      if (!reponse.ok) throw new Error("Échec de la création");

      setTitre("");
      setResume("");
      setContenu("");
      setCategorie("");
      setAfficherFormulaire(false);
      recupererArticles();
    } catch (err) {
      console.error(err);
      alert("Impossible de créer l'article. Réessaie plus tard.");
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm page-enter">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Mes articles</h2>
        <button
          type="button"
          onClick={() => setAfficherFormulaire(!afficherFormulaire)}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
        >
          {afficherFormulaire ? "Annuler" : "+ Nouvel article"}
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
            Résumé
          </label>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            rows={2}
            className="w-full mb-3 px-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contenu
          </label>
          <textarea
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            rows={5}
            className="w-full mb-3 px-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Catégorie
          </label>
          <input
            type="text"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />

          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white transition-all duration-200 hover:opacity-90"
          >
            Publier l'article
          </button>
        </form>
      )}

      <div className="space-y-2">
        {articles.map((article) => (
          <div
            key={article.id}
            className="p-4 rounded-lg border border-gray-200"
          >
            <p className="font-medium text-gray-800">{article.titre}</p>
            <p className="text-sm text-gray-500">{article.categorie}</p>
            <p className="text-sm text-gray-600 mt-1">{article.resume}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MesArticlesProfesseur;
