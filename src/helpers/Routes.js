import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../views/Home';
import Boards from '../views/Boards';
import Pins from '../views/Pins';
import PinDetails from '../views/PinDetails';
import PinForm from '../views/PinForm';
import BoardForm from '../views/BoardForm';
import SingleBoard from '../views/SingleBoard';
import NotFound from '../views/NotFound';
import SearchResults from '../views/SearchResults';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (taco) => (user
    ? (<Component {...taco} user={user}/>)
    : (<Redirect to={{ pathname: '/', state: { from: taco.location } }} />));

  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

export default function Routes({ user }) {
  return (
    <Switch>
      <Route
      exact
      path='/'
      component={() => <Home user={user} />} />
      <PrivateRoute
        exact
        path='/boards'
        component={Boards}
        user={user}
      />
      <PrivateRoute
      exact
      path='/pins'
      component={Pins}
      user={user}
      />
      <Route
        exact
        path='/pins-details'
        component={() => <PinDetails user={user} />}
      />
      <Route
        exact
        path='/pin-form'
        component={() => <PinForm user={user} />}
      />
      <Route
        exact
        path='/board-form'
        component={() => <BoardForm user={user} />}
      />
      <Route
        exact
        path='/boards/:id'
        component={(props) => <SingleBoard user={user} {...props} />}
      />
      <Route
        exact
        path='/search/:term/:type'
        component={(props) => <SearchResults {...props} />}
      />
      <Route component={NotFound} />
    </Switch>
  );
}
