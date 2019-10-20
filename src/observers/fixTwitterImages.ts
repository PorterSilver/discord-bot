import { Attachment, Message } from "discord.js";
import * as fs from "fs-extra";
import * as request from "request-promise-native";

import { DiscordHelper } from "../discordHelpers";

export class FixTwitterImage {
    public ImageDirectory = "./images";

    public fixTwitterPictureMessage(msg: Message) {
        const discordHelper = new DiscordHelper();

        const urlNames = discordHelper.returnAttachmentUrl(msg).filter((x) => x.url.includes(".jpg_large"));
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
