export const SubscriptionStatus = {
    ACTIVE: "ACTIVE",
    CANCELLED: "CANCELLED",
    EXPIRED: "EXPIRED",
    TRIAL: "TRIAL",
} as const;

export type SubscriptionStatus =
    typeof SubscriptionStatus[keyof typeof SubscriptionStatus];


export const SubscriptionPlan = {
    FREE: "FREE",
    PRO: "PRO",
} as const;

export type SubscriptionPlan =
    typeof SubscriptionPlan[keyof typeof SubscriptionPlan];
