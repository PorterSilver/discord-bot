import { PictureRecord } from "../server-classes/PictureRecord";

import mongoose from 'mongoose';
import env from "dotenv";
import process from "process";


export class MongooseSaveImage {
    constructor() {
        env.config();
    }

    async saveImage(pictureRecord : PictureRecord): Promise<void> {
        let connectionString = process.env.CONNECTION_STRING;
        if (connectionString !== undefined) {
            mongoose.connect(connectionString).then(() =>{
                let serverCol = pictureRecord.getModelForClass(PictureRecord);
                return serverCol;
            });
        }
    }
}