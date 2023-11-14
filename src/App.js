import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import useAuthStore from "./store/auth";
import routes from "./router/routes";

const PrivateRoute = ({ children, route }) => {
  const isAuth = useAuthStore(({ isAuth }) => isAuth);
  const role = useAuthStore.getState().role;
  const isAllowed = route.permission.includes(role);

  if (route.isPrivate) {
    if (isAuth && isAllowed) {
      return children;
    } else if (!isAuth) {
      return <Navigate to="/login" />;
    } else {
      return <Navigate to="/no-permission" />;
    }
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PrivateRoute route={route}>{<route.component />}</PrivateRoute>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
