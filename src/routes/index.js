import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ConnectedLogin from '../views/Login/Login';
import RequestsPage from '../views/RequestsPage/RequestsPage';
import RequireAuth from '../components/Hoc/AuthHoc';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={ConnectedLogin} />
    <Route path="/requests" exact component={RequireAuth(RequestsPage)} />
    <Route path="/settings" render={() => ('Settings')} />
    {
      // FIX: The following routes to move to Requests once their components are developed
    }
    <Route path="/requests/my-approvals" exact component={RequireAuth(RequestsPage)} />
  </Switch>

);

export default Routes;
