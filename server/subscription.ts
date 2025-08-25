"use server";

import { prisma } from '@/lib/prisma';
import { getUserSession } from './user';

export async function checkUserSubscription() {
  try {
    const session = await getUserSession();
    if (!session.success || !session.data?.user?.id) {
      return { isSubscribed: false, isPro: false };
    }

    const userId = session.data.user.id;
    
    const subscription = await prisma.subscription.findFirst({
      where: { 
        referenceId: userId, 
        status: 'active' 
      },
    });

    const isPro = subscription?.plan?.toLowerCase() === 'pro';
    
    return { 
      isSubscribed: !!subscription, 
      isPro,
      subscription 
    };
  } catch (error) {
    console.error('Error checking subscription:', error);
    return { isSubscribed: false, isPro: false };
  }
}
