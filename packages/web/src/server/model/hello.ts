import mongoose from 'mongoose';
import HelloSchema from '~/server/schema/model/model_hello';

const HelloDB = mongoose.model('Hello', HelloSchema);
export default HelloDB;
