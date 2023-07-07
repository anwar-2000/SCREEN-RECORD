import { Schema, model, Document } from "mongoose";

interface Video {
  title: string;
  url : string;
  date: Date;
}

interface User extends Document {
  username: string;
  email: string;
  password: string;
  videos: Video[];
}

const videoSchema = new Schema<Video>({
  title: { type: String, required: true },
  url : {type : String , required : true},
  date: { type: Date, required: true },
});

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  videos: [videoSchema],
});

const UserModel = model<User>("User", userSchema);

export default UserModel;
