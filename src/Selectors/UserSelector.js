import { createSelector } from 'reselect'

/* Private */

const allUsers = (state, props) => state.users

const userId = (state, props) => props.user_id

const path = (state, props) => props.path ? props.path.replace(/\//g,'') : 'users'

const username = (state, props) => props.routeParams.username || ""

/* Exports */

export const getUsersCollection = createSelector(
  [ allUsers, path ],
  ( users, key ) => {
    let collection = {
      items: [],
      count: 0
    }
    if (!users.collections[key]) return collection;
    collection.count = users.collections[key].count;
    collection.items = users.collections[key].result.map((id) => {
      return users.entities[id]
    })
    return collection;
  }
)

export const getVisibleUsers = createSelector(
  [ allUsers ],
  ( users ) => {
    return users.result.map((id) => {
      return users.entities[id]
    })
  }
)

export const getUserById = createSelector(
  [ allUsers,  userId ],
  ( users, id ) => {
    return users.entities[id]
  }
)

export const getUserByUsername = createSelector(
  [ allUsers,  username ],
  ( users, name ) => {
    for (let id in users.entities) {
      if (users.entities[id].username == name) {
        return users.entities[id];
      }
    }
    return null;
  }
)
