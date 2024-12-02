import mongoose, { Schema, Document } from 'mongoose';


interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isVerified: boolean;
    phone: string;
    addresses: Schema.Types.ObjectId[];
    avatar: string;
    lastLogin: Date;
    cart: Schema.Types.ObjectId;
    orders: Schema.Types.ObjectId[];
    reviews: Schema.Types.ObjectId[];
    wishlist: Schema.Types.ObjectId[];
    notifications: Schema.Types.ObjectId[];
    messages: Schema.Types.ObjectId[];
    verifyToken: string;
    verifyTokenExpires: Date;
    resetPasswordToken: string;
    resetPasswordTokenExpires: Date;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}


const UserSchema = new Schema<IUser>({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isVerified: { type: Boolean, required: true, default: false },

    phone: { type: String, required: false },
    addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],

    avatar: { type: String, required: false },

    lastLogin: { type: Date, required: false },

    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],

    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],

    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],


    verifyToken: { type: String, required: false },
    verifyTokenExpires: { type: Date, required: false },

    resetPasswordToken: { type: String, required: false },
    resetPasswordTokenExpires: { type: Date, required: false },

    isDeleted: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
    deletedAt: { type: Date, required: false },

})


const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export { UserModel, UserSchema };
export type { IUser };