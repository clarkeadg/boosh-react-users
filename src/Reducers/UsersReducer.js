import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

const insertKeys = () => {}

let collections = {};

const inches2height = (inches) => {
  if (!inches) return '';
  let feet = Math.floor(inches / 12);
  inches %= 12;
  return feet+"' "+inches+'"';
}

export const INITIAL_STATE = Immutable({
  entities: {},
  //result: [],
  collections: collections,
  errorCode: null,
  attempting: false
})

// request
const attempt = (state, action) => {
  //console.log('USER REDUCER ATTEMPT', state, action)
  
  let path = '';
  if (action.meta.path) {
    path = action.meta.path.replace(/\//g,'');
    if (!collections[path]) collections[path] = {};
    collections[path].result = [];
    collections[path].attempting = true;
    collections[path].count = 0;
  }

  return state.merge({ 
    attempting: true,
    collections: collections
  })
}

// recieve
const success = (state, action) => {
  //console.log('USER REDUCER SUCCESS',action.payload.entities.users)

  for(let id in action.payload.entities.users) {
    let user = action.payload.entities.users[id];
    user.meta = {};
    user.usermeta.data.map((v,i)=>{
      var keys = v.item_key.split('.');
      var key1 = keys[0];
      var key2 = keys[1];
      if (!user.meta[key1]) {
        user.meta[key1] = {};
      }
      user.meta[key1][key2] = v.item_value

      if (key1 == "about" && key2 == "height") {
        user.meta[key1][key2] = inches2height(v.item_value)
      }

      
    })
  }

  let path = '';
  if (action.payload.path) {
    path = action.payload.path.replace(/\//g,'');
    if (!collections[path]) collections[path] = {};
    collections[path].result = action.payload.result;
    collections[path].count = action.payload.count || 0;
    collections[path].attempting = false;
  }

  //console.log('USER REDUCER WITH META',action.payload.entities.users) 

  return state.merge({
    attempting: false,
    errorCode: null,
    entities: state.entities.merge(action.payload.entities.users),
    //result: action.payload.result,
    collections: collections
    //result: state.result.concat(action.payload.result)
  })
}

// failure
const failure = (state, action) =>
  state.merge({ attempting: false, errorCode: action.errorCode })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.GET_USERS_REQUEST]: attempt,
  [Types.GET_USERS_SUCCESS]: success,
  [Types.GET_USERS_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
