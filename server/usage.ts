"use server";

import { prisma } from '@/lib/prisma';
import type { UserUsage, Prisma } from '@/app/generated/prisma';
import { subscriptionPlans } from '@/lib/auth';
import { getUserSession } from './user';

export async function checkSubscriptionAndUsage(userId: string) {
  const subscription = await prisma.subscription.findFirst({
    where: { referenceId: userId, status: 'active' },
  });

  const plan = subscription
    ? subscriptionPlans.find(p => p.name.toLowerCase() === subscription.plan.toLowerCase())
    : null;

  if (!plan) {
    return { isSubscribed: !!subscription, usage: null, limitReached: true };
  }

  const limits = plan.limits;

  const userUsage = await prisma.userUsage.findUnique({
    where: { userId },
  });

  if (!userUsage) {
    return { isSubscribed: !!subscription, usage: null, limitReached: false };
  }

  const limitReached =
    userUsage.dayCount >= (limits.promptsDay ?? Infinity) ||
    userUsage.weekCount >= (limits.promptsWeek ?? Infinity) ||
    userUsage.monthCount >= (limits.promptsMonth ?? Infinity);

  return { isSubscribed: !!subscription, usage: userUsage, limitReached };
}

export async function incrementUserUsage(userId: string) {
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const userUsage: UserUsage | null = await prisma.userUsage.findUnique({
    where: { userId },
  });

  if (userUsage) {
    const updates: Prisma.UserUsageUpdateInput = {};

    if (userUsage.dayWindowStart < startOfToday) {
      updates.dayCount = 1;
      updates.dayWindowStart = startOfToday;
    } else {
      updates.dayCount = { increment: 1 };
    }

    if (userUsage.weekWindowStart < startOfWeek) {
      updates.weekCount = 1;
      updates.weekWindowStart = startOfWeek;
    } else {
      updates.weekCount = { increment: 1 };
    }

    if (userUsage.monthWindowStart < startOfMonth) {
      updates.monthCount = 1;
      updates.monthWindowStart = startOfMonth;
    } else {
      updates.monthCount = { increment: 1 };
    }

    await prisma.userUsage.update({
      where: { userId },
      data: updates,
    });
  } else {
    await prisma.userUsage.create({
      data: {
        userId,
        dayCount: 1,
        dayWindowStart: startOfToday,
        weekCount: 1,
        weekWindowStart: startOfWeek,
        monthCount: 1,
        monthWindowStart: startOfMonth,
      },
    });
  }
}

export async function getUserUsageData() {
  try {
    const session = await getUserSession();
    if (!session.success || !session.data?.user?.id) {
      return null;
    }

    const userId = session.data.user.id;
    const { usage } = await checkSubscriptionAndUsage(userId);

    // Get plan limits
    const subscription = await prisma.subscription.findFirst({
      where: { referenceId: userId, status: 'active' },
    });

    const plan = subscription
      ? subscriptionPlans.find(p => p.name.toLowerCase() === subscription.plan.toLowerCase())
      : null;

    if (!plan || !usage) {
      return {
        dayCount: 0,
        weekCount: 0,
        monthCount: 0,
        limits: {
          promptsDay: 0,
          promptsWeek: 0,
          promptsMonth: 0,
        }
      };
    }

    return {
      dayCount: usage.dayCount,
      weekCount: usage.weekCount,
      monthCount: usage.monthCount,
      limits: plan.limits
    };

  } catch (error) {
    console.error('Error fetching usage:', error);
    return null;
  }
}
