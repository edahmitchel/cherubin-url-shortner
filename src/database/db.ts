import config from 'config';
import mongoose from 'mongoose';
async function db() {

    const dbUri = process.env.dbUri as string
    try {
        await mongoose.connect(dbUri).then(
            () => { console.log(`Connected to ${dbUri}`) },
        )
    } catch (error) {
        console.error(error)

    }
}
export default db;