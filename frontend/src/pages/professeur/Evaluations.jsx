import { useState, useEffect } from "react";

function Evaluations() {
  const [soumissions, setSoumissions] = useState([]);
  const [soumissionSelectionneeId, setSoumissionSelectionneeId] =
    useState(null);
  const [note, setNote] = useState("");
  const [commentaire, setCommentaire] = useState("");

  const recupererSoumissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const reponse = await fetch(
        "http://localhost:5000/api/professeur/soumissions",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (!reponse.ok) throw new Error("Échec de récupération");
      const donnees = await reponse.json();
      setSoumissions(donnees);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    recupererSoumissions();
  }, []);

  const handleEvaluation = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const reponse = await fetch(
        "http://localhost:5000/api/professeur/evaluations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_soumission: soumissionSelectionneeId,
            note,
            commentaire,
          }),
        },
      );

      if (!reponse.ok) throw new Error("Échec de l'évaluation");

      setNote("");
      setCommentaire("");
      setSoumissionSelectionneeId(null);
      recupererSoumissions();
    } catch (err) {
      console.error(err);
      alert("Impossible d'enregistrer l'évaluation. Réessaie plus tard.");
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm page-enter">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Évaluations</h2>

      <div className="space-y-2">
        {soumissions.map((s) => (
          <div key={s.id} className="p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">{s.titre}</p>
                <p className="text-sm text-gray-500">
                  {s.prenom_etudiant} {s.nom_etudiant} — {s.statut}
                </p>
              </div>
              {s.statut !== "évalué" && (
                <button
                  type="button"
                  onClick={() => setSoumissionSelectionneeId(s.id)}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
                >
                  Évaluer
                </button>
              )}
            </div>

            {soumissionSelectionneeId === s.id && (
              <form
                onSubmit={handleEvaluation}
                className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-200"
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Note (sur 20)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="20"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full mb-3 px-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  required
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commentaire
                </label>
                <textarea
                  value={commentaire}
                  onChange={(e) => setCommentaire(e.target.value)}
                  rows={3}
                  className="w-full mb-4 px-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
                >
                  Valider l'évaluation
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Evaluations;
