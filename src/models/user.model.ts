import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    shortUrls: Array<Schema.Types.ObjectId>; // Store the IDs of short URLs associated with the user
}

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    shortUrls: [{ type: Schema.Types.ObjectId, ref: 'ShortURL' }],
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
