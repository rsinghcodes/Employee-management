import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { managerSelector } from '../redux/reducers/authSlice';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useSelector(managerSelector);

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
