import {
  HiOutlineBeaker,
  HiOutlineClipboardList,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
} from "react-icons/hi";

function TableauBordProfesseur() {
  // Donnée simulée — sera remplacée par les infos du professeur connecté
  const professeur = {
    nom: "SALIFOU",
    prenom: " Docteur",
    grade: "Maître de conférences",
    departement: "Chimie",
  };

  const stats = [
    {
      label: "Laboratoires dirigés",
      value: 2,
      icon: HiOutlineBeaker,
      color: "text-indigo-600",
    },
    {
      label: "Travaux publiés",
      value: 3,
      icon: HiOutlineClipboardList,
      color: "text-blue-600",
    },
    {
      label: "Articles publiés",
      value: 5,
      icon: HiOutlineDocumentText,
      color: "text-amber-600",
    },
    {
      label: "À évaluer",
      value: 2,
      icon: HiOutlineCheckCircle,
      color: "text-green-600",
    },
  ];

  return (
    <div className="page-enter">
      <div className="grid grid-cols-4 gap-6 mb-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl p-6 shadow-sm">
            <Icon className={`${color} mb-2`} size={28} />
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-gray-500 text-sm">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Bienvenue, {professeur.prenom} {professeur.nom}
        </h2>
        <p className="text-gray-500 text-sm">
          {professeur.grade} — Département {professeur.departement}
        </p>
      </div>
    </div>
  );
}

export default TableauBordProfesseur;
