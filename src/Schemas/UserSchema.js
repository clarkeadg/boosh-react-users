import { Schema, valuesOf, arrayOf } from 'normalizr'

const UserSchema = new Schema('users', { idAttribute: 'id' });

export default UserSchema;
