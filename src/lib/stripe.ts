import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-03-25.dahlia',
});

export async function createPaymentSession({
  reservationId,
  amount,
  villaName,
  guestEmail,
}: {
  reservationId: string;
  amount: number;
  villaName: string;
  guestEmail: string;
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'thb',
          product_data: {
            name: `Villa Reservation: ${villaName}`,
            description: `Booking ID: ${reservationId}`,
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    customer_email: guestEmail,
    metadata: { reservation_id: reservationId },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/reservations/${reservationId}?status=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/reservations/${reservationId}?status=cancelled`,
  });

  return session;
}
