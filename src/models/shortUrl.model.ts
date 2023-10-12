import mongoose, { Document, Schema } from 'mongoose';

export interface ShortURL extends Document {
    shortId: string;
    destination: string;
    user: Schema.Types.ObjectId; // Store the ID of the user who created the short URL
}

const schema = new mongoose.Schema({
    shortId: { type: String, required: true, unique: true },
    destination: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const shortUrl = mongoose.model<ShortURL>('ShortURL', schema);

export default shortUrl;
