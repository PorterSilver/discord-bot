import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';

export class PictureRecord extends Typegoose{
    @prop({ required: true })
    ServerName!: string;
    @prop({ required: true })
    Time!: Date;
    @prop({ required: true })
    Url!: string;
    @prop({ required: true })
    Channel!: string; 
    @prop({ required: true })
    ChannelName!: String;
    @prop({ required: true })
    Date!: Date;
};