import * as discord from "discord.js";
import * as env from "dotenv";
import { FixTwitterImage } from "./modules/fixTwitterImages";

const client = new discord.Client();
env.config();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
    var fixTwitterImage = new FixTwitterImage();
    fixTwitterImage.fixTwitterPictureMessage(msg);
});

client.login(process.env.BOT_TOKEN);
