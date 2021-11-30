import Login from "./components/login";
import React, { useEffect } from "react";
import { Provider, useDispatch} from "react-redux";
import { Router, Switch, Route} from "react-router-dom";
import store from "./store";
import Register from "./components/register";
import Home from "./components/home";
import ProtectedRoute from "./components/protectedRoute";
import { clearMessage } from "./actions/message";
import Chatroom from "./components/chatroom";

import { history } from "./helper/history";

import "bootstrap/dist/css/bootstrap.min.css";

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);


  return (
    <Router history={history}>
      <Switch>
        <Route exact path={["/", "/login"]} component={Login} />
        <Route exact path="/register" component={Register} />
        <ProtectedRoute path="/home" component={Home} />
        <ProtectedRoute path="/chatroom/:chatroomName/:chatroomId" component={Chatroom} />
      </Switch>
    </Router>
  );
}

export default AppWrapper;
