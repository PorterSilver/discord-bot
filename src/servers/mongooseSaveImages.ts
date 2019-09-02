import env from "dotenv";
import mongoose from "mongoose";
import process from "process";
import { PictureRecord } from "../server-classes/pictureRecord";

export class MongooseSaveImage {
    constructor() {
        env.config();
    }

    public async saveImage(pictureRecord: PictureRecord): Promise<void> {
        const connectionString = process.env.CONNECTION_STRING;
        if (connectionString !== undefined) {
            mongoose.connect(connectionString).then(() => {
                return pictureRecord.getModelForClass(PictureRecord);
            });
        }
    }
}
