import mongoose from 'mongoose';
import HelloSchema from '~/server/types/model/hello';

const HelloDB = mongoose.model('Hello', HelloSchema);
export default HelloDB;
