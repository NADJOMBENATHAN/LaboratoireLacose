import { useState, useEffect } from "react";

function MesSoumissions() {
  const [soumissions, setSoumissions] = useState([]);

  useEffect(() => {
    const recupererSoumissions = async () => {
      const reponse = await fetch("http://localhost:5000/api/soumissions");
      const donnees = await reponse.json();
      setSoumissions(donnees);
    };
    recupererSoumissions();
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm page-enter">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Mes soumissions
      </h2>

      {soumissions.length === 0 ? (
        <p className="text-gray-500 text-sm">
          Aucune soumission pour l'instant.
        </p>
      ) : (
        <div className="space-y-2">
          {soumissions.map((s) => (
            <div key={s.id} className="p-4 rounded-lg border border-gray-200">
              <p className="font-medium text-gray-800">{s.titre}</p>
              <p className="text-sm text-gray-500">
                Soumis le {s.dateSoumission}
              </p>
              <span className="inline-block mt-1 text-xs text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                {s.statut}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MesSoumissions;
