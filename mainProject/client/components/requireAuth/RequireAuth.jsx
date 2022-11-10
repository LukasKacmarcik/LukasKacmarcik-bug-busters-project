import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const session = useSelector((state) => state.session);
  if (session.status === 'loading') {
    return null;
  }
  return allowedRoles.includes(session.role) ? (
    <Outlet />
  ) : session.role !== 'notLoggedIn' ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
