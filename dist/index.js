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
const fs = __importStar(require("fs-extra"));
const request = __importStar(require("request-promise-native"));
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
//# sourceMappingURL=index.js.map