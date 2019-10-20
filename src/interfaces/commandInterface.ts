import { Client, Message } from "discord.js";

export interface ICommandObject {
    execute(message: Message, args: string[], client: Client): void;
}
