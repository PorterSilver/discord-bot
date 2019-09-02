import { Message, Attachment } from "discord.js"
import * as request from "request-promise-native";
import * as fs from "fs-extra"

import { DiscordHelper } from "./discordHelpers";

export class FixTwitterImage {
    ImageDirectory = "./images";

    fixTwitterPictureMessage(msg: Message) {
        const discordHelper = new DiscordHelper();

        let urlNames = discordHelper.returnAttachmentUrl(msg).filter((x) => x.url.includes(".jpg_large"));
        discordHelper.checkAndCreateFolder(this.ImageDirectory + "/");

        if (urlNames.length > 0) {
            urlNames.forEach((urlName) => {
                const fileName = urlName.name.replace(".jpg_large", ".jpeg");
                const fileLocation = this.ImageDirectory + "/" + fileName;

                const options = {
                    uri: urlName.url,
                };

                const result = request.get(options);

                result.pipe(fs.createWriteStream(fileLocation));
                result.then(() => msg.channel.send(new Attachment(fileLocation))
                    .then(() => fs.unlink(fileLocation)))
                    .catch();
            });
        }
    }
}

