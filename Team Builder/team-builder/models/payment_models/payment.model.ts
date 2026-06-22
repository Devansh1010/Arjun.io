import { PaymentGateway, PaymentStatus } from "@/constants/payment";
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPayment extends Document {
    user: Schema.Types.ObjectId;

    subscription: Schema.Types.ObjectId;

    amount: number;

    currency: string;

    paymentGateway: "RAZORPAY";

    orderId: string;

    paymentId?: string;

    status:
        | "PENDING"
        | "SUCCESS"
        | "FAILED"
        | "REFUNDED";

    paidAt?: Date;
}

const paymentSchema = new Schema<IPayment>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        subscription: {
            type: Schema.Types.ObjectId,
            ref: "Subscription",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        currency: {
            type: String,
            default: "INR",
        },

        paymentGateway: {
            type: String,
            enum: Object.values(PaymentGateway),
            default: PaymentGateway.RAZORPAY,
        },

        orderId: {
            type: String,
            required: true,
        },

        paymentId: {
            type: String,
        },

        status: {
            type: String,
            enum: Object.values(PaymentStatus),
            default: PaymentStatus.PENDING,
        },

        paidAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Payment: Model<IPayment> =
    mongoose.models.Payment ||
    mongoose.model<IPayment>(
        "Payment",
        paymentSchema
    );

export default Payment;