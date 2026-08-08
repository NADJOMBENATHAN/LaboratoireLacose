import { useState } from "react";
import EtudiantLayout from "../layouts/EtudiantLayout";
import {
  HiOutlineBeaker,
  HiOutlineClipboardList,
  HiOutlineAcademicCap,
  HiOutlineDocumentText,
} from "react-icons/hi";
function EspaceEtudiant() {
  const etudiant = {
    nom: "koffi",
    prenom: "Ama",
    email: "ama.koffi@etu.univ-kara.tg",
    matricule: "ETU2024-015",
    filiere: "Genie logiciel",
  };
  const laboratoires = [
    {
      id: 1,
      nom: "Laboratoire de chimie organique ",
      description: "etude des données organiques et de leurs réactions",
      domaine: "chimie organique",
    },
    {
      id: 2,
      nom: "Laboratoire des substances naturelles",
      description: "extraction et analyse de substances issues de plantes",
      domaine: "chimie naturelle",
    },
  ];
  const [laboSelectionneId, setLaboSelectionneId] = useState(null);
  const [inscriptions, setInscriptions] = useState([]);
  const laboSelectionne = laboratoires.find(
    (labo) => labo.id === laboSelectionneId,
  );
  const estInscrit =
    laboSelectionne && inscriptions.includes(laboSelectionne.id);
  const handleInscription = () => {
    setInscriptions([...inscriptions, laboSelectionne.id]);
  };
  const stats = [
    {
      label: "Laboratoires",
      value: inscriptions.length,
      icon: HiOutlineBeaker,
      color: "text-indigo-600",
    },
    {
      label: "Travaux pratiques",
      value: 3,
      icon: HiOutlineClipboardList,
      color: "text-blue-600",
    },
    {
      label: "Soumissions",
      value: 1,
      icon: HiOutlineDocumentText,
      color: "text-amber-600",
    },
    {
      label: "Filière",
      value: etudiant.filiere,
      icon: HiOutlineAcademicCap,
      color: "text-green-600",
    },
  ];

  return (
    <EtudiantLayout>
      <div className="grid grid-cols-4 gap-6 mb-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl p-6 shadow-sm">
            <Icon className={`${color} mb-2`} size={28} />
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-gray-500 text-sm">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Bienvenue, {etudiant.prenom} {etudiant.nom}
        </h2>
        <p className="text-gray-500 text-sm">
          Matricule : {etudiant.matricule}
        </p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Mes laboratoires
        </h2>
        <div className="space-y-2">
          {laboratoires.map((labo) => (
            <div
              key={labo.id}
              onClick={() => setLaboSelectionneId(labo.id)}
              className={`p-4 rounded-lg cursor-pointer border transition-colors ${
                laboSelectionneId === labo.id
                  ? "border-indigo-400 bg-indigo-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <p className="font-medium text-gray-800">{labo.nom}</p>
              <p className="text-sm text-gray-500">{labo.domaine}</p>
            </div>
          ))}
        </div>
        {laboSelectionne && (
          <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
            <h3 className="font-semibold text-gray-800">
              {laboSelectionne.nom}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {laboSelectionne.description}
            </p>
            <button
              onClick={handleInscription}
              disabled={estInscrit}
              className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium ${
                estInscrit
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
              }`}
            >
              {estInscrit ? "Déjà inscrit" : "S'inscrire"}
            </button>
          </div>
        )}
      </div>
    </EtudiantLayout>
  );
}

export default EspaceEtudiant;
