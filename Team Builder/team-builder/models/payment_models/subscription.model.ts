import { SubscriptionPlan, SubscriptionStatus } from "@/constants/subscription";
import mongoose, { Document, Model, Schema } from "mongoose";

export interface ISubscription extends Document {
    user: Schema.Types.ObjectId;

    plan: SubscriptionPlan;
    status: SubscriptionStatus;

    startedAt: Date;
    expiresAt?: Date;
}


const subscriptionSchema = new Schema<ISubscription>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        plan: {
            type: String,
            enum: Object.values(SubscriptionPlan),
            default: SubscriptionPlan.FREE,
        },

        status: {
            type: String,
            enum: Object.values(SubscriptionStatus),
            default: SubscriptionStatus.ACTIVE,
        },

        startedAt: {
            type: Date,
            default: Date.now,
        },

        expiresAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Subscription: Model<ISubscription> =
    mongoose.models.Subscription ||
    mongoose.model<ISubscription>(
        "Subscription",
        subscriptionSchema
    );

export default Subscription;