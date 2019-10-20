import * as discord from "discord.js";
import * as env from "dotenv";

import { AddUser } from "./commands/AddUser";
import { RemoveUser } from "./commands/RemoveUser";
import { DiscordHelper } from "./discordHelpers";
import { ICommandObject } from "./interfaces/commandInterface";
import { FixTwitterImage } from "./observers/fixTwitterImages";

const client = new discord.Client();
const commands = new discord.Collection<string, ICommandObject>();
const fixTwitterImage = new FixTwitterImage();
const addUser = new AddUser();
const removeUser = new RemoveUser();
const helper = new DiscordHelper();

env.config();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {

    const prefix = process.env.PREFIX;

    commands.set(addUser.Name, addUser);
    commands.set(removeUser.Name, removeUser);

    if (!message.content.startsWith(prefix) || message.author.bot) { return; }
    if (commands.size === 0) { return; }

    const args = helper.returnArguments(message, prefix);

    if (args.length === 0 || args === undefined) { return; } else {
        let command = args.shift();
        if (!command) { return; }

        command = command.toLowerCase();

        if (!commands.has(command)) { return; }

        try {
            const executingCommand = commands.get(command);
            if (executingCommand) {
                executingCommand.execute(message, args, client);
            }
        } catch (error) {
            console.error(error);
            message.reply("there was an error trying to execute that command!");
        }

        fixTwitterImage.fixTwitterPictureMessage(message);
    }
});

client.login(process.env.BOT_TOKEN);
