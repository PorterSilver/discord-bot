import { Message } from "discord.js";
import * as fs from "fs-extra"

export class DiscordHelper {
    returnAttachmentUrl(msg: Message) {
        return msg.attachments.map((elm) => {
            return {
                name: elm.filename,
                url: elm.url,
            };
        });
    }

    checkAndCreateFolder(filePath: string) {
        if (!fs.existsSync(filePath)) {
            fs.mkdirsSync(filePath);
        }
    }
}