import { Message, TextChannel } from "discord.js";

export class RemoveUser {
    public Name = "remove";
    public Description = "Removes a new user to a channel";

    public execute(message: Message) {
        const channel = message.channel as TextChannel;
        const userAdded = message.mentions.users;

        userAdded.forEach((user) => {
            channel.overwritePermissions(user, {
                READ_MESSAGE_HISTORY: false,
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false,
            });
        });
    }
}
