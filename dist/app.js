"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord = __importStar(require("discord.js"));
const env = __importStar(require("dotenv"));
const request = __importStar(require("request-promise-native"));
const fs = __importStar(require("fs-extra"));
const client = new discord.Client();
env.config();
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", msg => {
    var urlNames = msg.attachments.map(function (element) {
        return {
            url: element.url,
            name: element.filename
        };
    });
    urlNames = urlNames.filter(x => x.url.includes(".jpg_large"));
    if (urlNames.length > 0) {
        urlNames.forEach(urlName => {
            let fileName = urlName.name.replace(".jpg_large", ".jpeg");
            let options = {
                uri: urlName.url
            };
            const result = request.get(options);
            result.pipe(fs.createWriteStream("./images/" + fileName));
            result
                .then(() => {
                msg.channel.send(new discord.Attachment("./images/" + fileName)).then(() => {
                    fs.unlink("./images/" + fileName, () => { });
                });
            })
                .catch(() => { });
        });
    }
    // if (msg.content === "ping") {
    //     msg.reply("Pong!")
    // }
});
client.login(process.env.BOT_TOKEN);
//# sourceMappingURL=app.js.map