import * as discord from "discord.js";
import * as env from "dotenv";
import * as fs from "fs-extra";
import * as request from "request-promise-native";

const client = new discord.Client();
env.config();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
    let urlNames = msg.attachments.map((elm) => {
        return {
            name: elm.filename,
            url: elm.url,
        };
    });

    urlNames = urlNames.filter((x) => x.url.includes(".jpg_large"));
    if (urlNames.length > 0) {
        urlNames.forEach((urlName) => {
            const fileName = urlName.name.replace(".jpg_large", ".jpeg");
            const options = {
                uri: urlName.url,
            };
            const result = request.get(options);
            result.pipe(fs.createWriteStream("./images/" + fileName));
            result.then(() => msg.channel.send(new discord.Attachment("./images/" + fileName))
                    .then(() => fs.unlink("./images/" + fileName)))
                .catch();
        });
    }
});

client.login(process.env.BOT_TOKEN);
