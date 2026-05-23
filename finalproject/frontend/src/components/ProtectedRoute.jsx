import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PageSkeleton } from './Skeleton';

export default function ProtectedRoute({ children, role }) {
  const { user, authLoading } = useApp();

  if (authLoading) return <PageSkeleton variant="dashboard" />;

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role.toUpperCase()) {
    if (user.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'TEACHER') return <Navigate to="/teacher/dashboard" replace />;
    if (user.role === 'STUDENT') return <Navigate to="/student/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}
