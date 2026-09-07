import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineBeaker,
  HiOutlineClipboardList,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";

const navItems = [
  { to: "/professeur", label: "Tableau de bord", icon: HiOutlineViewGrid, end: true },
  { to: "/professeur/laboratoires", label: "Mes laboratoires", icon: HiOutlineBeaker },
  { to: "/professeur/travaux", label: "Travaux pratiques", icon: HiOutlineClipboardList },
  { to: "/professeur/articles", label: "Mes articles", icon: HiOutlineDocumentText },
  { to: "/professeur/evaluations", label: "Évaluations", icon: HiOutlineCheckCircle },
];

function ProfesseurLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className={`bg-white border-r flex flex-col transition-all ${isOpen ? "w-64" : "w-20"}`}>
        <div className="flex items-center justify-between p-4">
          {isOpen && <span className="font-bold text-lg text-gray-800">LaCOSE</span>}
          <button type="button" onClick={() => setIsOpen(!isOpen)} className="text-gray-500">
            {isOpen ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
          </button>
        </div>

        <nav className="flex-1 mt-4 space-y-1 px-2">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white scale-[1.02]"
                    : "text-gray-600 hover:bg-gray-100 hover:translate-x-1"
                }`
              }
            >
              <Icon size={20} />
              {isOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default ProfesseurLayout;