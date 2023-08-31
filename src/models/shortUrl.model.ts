import mongoose, { Document } from "mongoose";
import { customAlphabet } from "nanoid";


const nanoid = customAlphabet("abcdefghijklmnopqrstuvw0987654321", 6)
export interface ShortURL extends Document {
    shortId: string
    destination: string
}
const schema = new mongoose.Schema({
    shortId: { type: String, required: true, unique: true, default: () => nanoid() },
    destination: {
        type: String, required: true
    }
})

const shortUrl = mongoose.model<ShortURL>("shortUrl", schema)
export default shortUrl