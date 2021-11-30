import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={() => (currentUser ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

export default ProtectedRoute;
