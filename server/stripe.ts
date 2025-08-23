'use server';

import { revalidatePath } from 'next/cache';

import { redirect } from 'next/navigation';
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { getUserSession } from "./user";
import { prisma } from "@/lib/prisma";

export async function getSubscription() {
  const session = await getUserSession();

  if (!session.success || !session.data?.user?.id) {
    throw new Error('Unauthorized');
  }

  const subscription = await prisma.subscription.findFirst({
    select: {
      id: true,
      status: true,
      plan: true,
      referenceId: true,
      stripeSubscriptionId: true,
    },
    where: {
      referenceId: session.data.user.id,
    },
  });

  return subscription;
}

export async function createBillingPortalSession() {
  const session = await getUserSession();

  if (!session.success || !session.data?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userId = session.data.user.id;

  const data = await auth.api.createBillingPortal({
    body: {
      referenceId: userId,
      returnUrl: process.env.BETTER_AUTH_URL!,
    },
    headers: await headers(),
  });

  return redirect(data.url);
}

export async function revalidateChatPath() {
  revalidatePath('/chat');
}

export async function restoreSubscriptionCanceled() {

  const subscription = await getSubscription();
  const session = await getUserSession();

  if (!session.success || !session.data?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userId = session.data.user.id;

  const data = await auth.api.restoreSubscription({
    body: {
      referenceId: userId,
      subscriptionId: subscription?.id,
    },
    headers: await headers(),
  });

  return data;
}