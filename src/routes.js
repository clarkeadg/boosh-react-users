
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import UsersList from './Containers/UsersList'

export default () => {
  const routes = (
    <Route path="users">
      <IndexRoute component={UsersList} />
      <Route path=":pageNumber" component={UsersList} />
    </Route>
  );
  return routes;
};
