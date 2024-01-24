//api/stripe

import { db } from "@/app/libs/db";
import { userSubscriptions } from "@/app/libs/db/schema";
import { stripe } from "@/app/libs/stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const return_url = process.env.NEXT_BASE_URL + "/";

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const _userSubs = await db
      .select()
      .from(userSubscriptions)
      .where(eq(userSubscriptions.userId, userId));

    if (_userSubs[0] && _userSubs[0].stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: _userSubs[0].stripeCustomerId,
        return_url,
      });

      return NextResponse.json({ url: stripeSession.url });
    }

    //user first time try to subscribe
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: return_url,
      cancel_url: return_url,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user?.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Captions Pro",
              description: "Unlimited Videos!",
            },
            unit_amount: 2900,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log('stripe error',error);
    return new NextResponse('internal server error', {status:500})
  }
}
