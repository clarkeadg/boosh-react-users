import { Schema, valuesOf, arrayOf } from 'normalizr'

const UserMetaSchema = new Schema('user_meta', { idAttribute: 'user_id' });

export default UserMetaSchema;
