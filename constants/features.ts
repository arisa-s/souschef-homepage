/**
 * When true, show pricing / Souschef Plus / free-plan limit messaging.
 * When false, present the app as fully free.
 */
export const isSubscriptionEnabled =
  process.env.NEXT_PUBLIC_SUBSCRIPTION_ENABLED === 'true'
