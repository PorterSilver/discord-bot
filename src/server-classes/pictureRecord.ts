import { prop, Typegoose } from "typegoose";

export class PictureRecord extends Typegoose {
    @prop({ required: true })
    public ServerName!: string;
    @prop({ required: true })
    public Time!: Date;
    @prop({ required: true })
    public Url!: string;
    @prop({ required: true })
    public Channel!: string;
    @prop({ required: true })
    public ChannelName!: string;
    @prop({ required: true })
    public Date!: Date;
}
