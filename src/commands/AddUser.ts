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
            // tslint:disable-next-line: prefer-const
            let allUsers = message.guild.members;

            args.forEach((argument: string) => {
                const filteredArg = argument.replace(/[^a-zA-Z]/g, "");
                if (allUsers.size <= 1) {
                    return;
                }

                allUsers.forEach((user, key) => {
                    const trueName = (user.nickname !== null) ? user.nickname : user.displayName;
                    if (!trueName.includes(filteredArg)) {
                        allUsers.delete(key);
                    }
                });
            });

            if (allUsers.size > 0) {
                allUsers.forEach((user) => {
                    this.setPermissions(channel, user.user);
                });
            }

            // const regEx = /\"[A-z]*\"/g;
            // const argCollection = (args.join(" ")).replace(/ /g, "").match(regEx);

            // if (argCollection) {
            //     argCollection.forEach((userName) => {
            //         const userNameClean = userName.replace(/\"/g, "");
            //         const user = client.users.find((serverUser) => serverUser.username === userNameClean);
            //         if (user) {
            //             this.setPermissions(channel, user);
            //         }
            //     });
            // }
        }
    }

    private setPermissions(channel: TextChannel, user: User) {
        channel.overwritePermissions(user, {
            READ_MESSAGE_HISTORY: true,
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
        });
    }
}
