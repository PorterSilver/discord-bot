import { Message } from "discord.js";
import * as fs from "fs-extra";

export class DiscordHelper {
    public returnAttachmentUrl(msg: Message) {
        return msg.attachments.map((elm) => {
            return {
                name: elm.filename,
                url: elm.url,
            };
        });
    }

    public checkAndCreateFolder(filePath: string) {
        if (!fs.existsSync(filePath)) {
            fs.mkdirsSync(filePath);
        }
    }

    public returnArguments(message: Message, prefix: string) {
        return message.content.slice(prefix.length).split(/ +/);
    }
}
