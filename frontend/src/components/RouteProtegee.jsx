import { Navigate } from "react-router-dom";

// Vérifie qu'un token existe avant d'afficher la page.
// Sinon, redirige vers la page de connexion.
function RouteProtegee({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/connexion" replace />;
  }

  return children;
}

export default RouteProtegee;
