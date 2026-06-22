export const PaymentStatus = {
    PENDING: "PENDING",
    SUCCESS: "SUCCESS",
    FAILED: "FAILED",
    REFUNDED: "REFUNDED",
} as const;

export type PaymentStatus =
    typeof PaymentStatus[keyof typeof PaymentStatus]

export const PaymentGateway = {
    RAZORPAY: "RAZORPAY",
} as const;

export type PaymentGateway =
    typeof PaymentGateway[keyof typeof PaymentGateway]