import { createSelector } from 'reselect'

/* Private */

const allUserMeta = (state, props) => state.user_meta

const path = (state, props) => props.path ? props.path.replace(/\//g,'') : 'users'

const meId = (state, props) => props.me ? props.me.id || 0 : 0;

/* Exports */

export const getUserMetaCollection = createSelector(
  [ allUserMeta, path ],
  ( usermeta, key ) => {
    let collection = {
      items: [],
      count: 0
    }
    if (!usermeta.collections[key]) return collection;
    collection.count = usermeta.collections[key].count;
    collection.items = usermeta.collections[key].result.map((id) => {
      return usermeta.entities[id]
    })
    return collection;
  }
)

export const getVisibleUserMeta = createSelector(
  [ allUserMeta ],
  ( usermeta ) => {
    return usermeta.result.map((id) => {
      return usermeta.entities[id]
    })
  }
)

export const getMeMeta = createSelector(
  [ allUserMeta,  meId ],
  ( user_meta, id ) => {
    return user_meta.entities[id]
  }
)


