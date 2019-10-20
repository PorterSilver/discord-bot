import { Client, Message, TextChannel, User } from "discord.js";

export class AddUser {
    public Name = "add";
    public Description = "Adds a new user to a channel";

    public execute(message: Message, args: string[], client: Client) {
        const channel = message.channel as TextChannel;
        const userAdded = message.mentions.users;

        if (userAdded.size > 0) {
            userAdded.forEach((user) => {
                this.setPermissions(channel, user);
            });
        } else {
            const regEx = /\"[A-z]*\"/g;
            const argCollection = (args.join(" ")).replace(/ /g, "").match(regEx);

            if (argCollection) {
                argCollection.forEach((userName) => {
                    const userNameClean = userName.replace(/\"/g, "");
                    const user = client.users.find((serverUser) => serverUser.username === userNameClean);
                    if (user) {
                        this.setPermissions(channel, user);
                    }
                });
            }
        }
    }

    private setPermissions(channel: TextChannel, user: User) {
        channel.overwritePermissions(user, {
            READ_MESSAGE_HISTORY: false,
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
        });
    }
}
