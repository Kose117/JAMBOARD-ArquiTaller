import { Schema, model, Document, Types, InferSchemaType } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: {
    type: String,
    enum: ['OPERATOR', 'ADMIN'],
    required: true,
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

type UserSchemaType = InferSchemaType<typeof UserSchema>;
export interface UserDocument extends UserSchemaType, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type UserLean = Omit<UserDocument, keyof Document> & {
  _id: Types.ObjectId;
  email: string; 
  password: string;
  userType: 'OPERATOR' | 'ADMIN';
};

export const UserModel = model<UserDocument>('User', UserSchema);
