import Subscription from "@/models/payment_models/subscription.model";
import mongoose from "mongoose";
export async function getUserSubscription(
    userId: string
) {
    return await Subscription.findOne({
        user: new mongoose.Schema.Types.ObjectId(userId),
    });
}