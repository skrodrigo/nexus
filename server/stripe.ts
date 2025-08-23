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
    where: {
      referenceId: session.data.user.id,
    },
  });

  return subscription;
}

export async function createSubscription() {

  const subscription = await getSubscription();
  const session = await getUserSession();

  if (!session.success || !session.data?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userId = session.data.user.id;

  const { url } = await auth.api.upgradeSubscription({
    body: {
      plan: "Pro",
      annual: false,
      referenceId: userId,
      subscriptionId: subscription?.id,
      returnUrl: process.env.BETTER_AUTH_URL!,
      successUrl: process.env.BETTER_AUTH_URL!,
      cancelUrl: process.env.BETTER_AUTH_URL!,
      disableRedirect: false,
    },
    headers: await headers(),
  });

  if (!url) {
    throw new Error('Could not create subscription checkout session.');
  }

  return redirect(url);
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

export async function cancelSubscription() {
  const subscription = await getSubscription();
  const session = await getUserSession();

  if (!session.success || !session.data?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userId = session.data.user.id;

  const { url } = await auth.api.cancelSubscription({
    body: {
      referenceId: userId,
      subscriptionId: subscription?.id,
      returnUrl: process.env.BETTER_AUTH_URL!,
    },
    headers: await headers(),
  });

  if (!url) {
    throw new Error('Could not cancel subscription.');
  }

  return redirect(url);
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