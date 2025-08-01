import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading)
    return (
      <div className="loading-container">
        <img loading="lazy" src="/Icons/Logo-black.webp" alt="Loading..." />
      </div>
    );
  if (!user) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
