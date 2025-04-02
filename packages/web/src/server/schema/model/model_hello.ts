import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const HelloSchema = new Schema({
    language: { type: String, unique: true },
    hello: { type: String, default: 'Hello' },
});
export default HelloSchema;
