import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);

  // If not logged in, redirect to the login page.
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user role changes, redirect to the respective dashboard
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'Admin' ? '/admin-panel' : '/user-panel'} />;
  }

  return children;
};

export default ProtectedRoute;