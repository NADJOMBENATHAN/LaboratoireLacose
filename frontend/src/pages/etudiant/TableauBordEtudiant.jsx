import {
  HiOutlineBeaker,
  HiOutlineClipboardList,
  HiOutlineDocumentText,
  HiOutlineAcademicCap,
} from "react-icons/hi";

function TableauBordEtudiant() {
  // Donnée simulée pour l'instant — sera remplacée par les infos
  // de l'utilisateur réellement connecté une fois l'authentification backend en place
  const etudiant = {
    nom: "Koffi",
    prenom: "Ama",
    matricule: "ETU2024-015",
    filiere: "Génie Logiciel",
  };
  // Statistiques affichées en haut de page, sous forme de cartes.
  // Centralisées dans un tableau pour générer les cartes avec .map() plutôt que de les répéter en JSX

  const stats = [
    {
      label: "Laboratoires",
      value: 0,
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
    <>
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
          Bienvenue, {etudiant.prenom} {etudiant.nom}
        </h2>
        <p className="text-gray-500 text-sm">
          Matricule : {etudiant.matricule}
        </p>
      </div>
    </>
  );
}

export default TableauBordEtudiant;
