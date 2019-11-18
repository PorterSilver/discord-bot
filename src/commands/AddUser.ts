import { Client, Message, TextChannel, User } from "discord.js";

export class AddUser {
    public Name = "add";
    public Description = "Adds a new user to a channel";

    public execute(message: Message, args: string[], client: Client) {
        const channel = message.channel as TextChannel;
        const userAdded = message.mentions.users;
        // tslint:disable-next-line: prefer-const
        let allUsers = message.guild.members;

        if (userAdded.size > 0) {
            userAdded.forEach((user) => {
                this.setPermissions(channel, user);
            });
        } else {
            const fullArgs = (args.join(" "));

            if (fullArgs.includes("@")) {
                if (fullArgs.length - fullArgs.replace("@", "").length === 1) {
                    const newUser = client.users.get(fullArgs.replace("@", ""));
                    if (newUser !== undefined) {
                        this.setPermissions(channel, newUser);
                    }
                }
                fullArgs.split("@").forEach((potenialUser) => {
                    const filteredArg = potenialUser.replace(/[^a-zA-Z]/g, "");
                    const newUser = client.users.get(filteredArg);
                    if (newUser !== undefined) {
                        this.setPermissions(channel, newUser);
                    }
                });
            } else {
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
            }
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
