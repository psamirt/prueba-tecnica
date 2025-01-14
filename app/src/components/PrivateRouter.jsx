import { getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRouter({ children }) {
  const auth = getAuth();
  const user = auth.currentUser;

  return user ? children : <Navigate to="/login" />;
}

PrivateRouter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRouter;
