"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { authClient } from "@/lib/auth-client";
import { getSubscription } from '@/server/stripe/get-subscription';
import { ArrowLeft, BotMessageSquare, FileUp, Zap, Search, BrainCircuit } from 'lucide-react';

interface UpgradePageProps {
  onClose: () => void;
}


const proFeatures = [
  { text: 'Acesso a todos os modelos (GPT-5, Claude 4, etc)', icon: <BrainCircuit className="size-5 text-primary" /> },
  { text: 'Mais mensagens e carregamentos', icon: <FileUp className="size-5 text-primary" /> },
  { text: 'Respostas mais rápidas', icon: <Zap className="size-5 text-primary" /> },
  { text: 'Pesquisa na web avançada', icon: <Search className="size-5 text-primary" /> },
  { text: 'Memória e contexto aprimorados', icon: <BotMessageSquare className="size-5 text-primary" /> },
];

export function UpgradePage({ onClose }: UpgradePageProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    async function checkSubscription() {
      const subscription = await getSubscription();
      const isActive = subscription?.status === 'active' || subscription?.status === 'trialing';
      setIsSubscribed(isActive && subscription?.plan?.toLowerCase() === 'pro');
    }
    checkSubscription();
  }, []);

  const createSubscription = async () => {
    const session = await authClient.getSession();
    const userId = session.data?.user.id;
    const subscription = await getSubscription();

    await authClient.subscription.upgrade({
      plan: "Pro",
      annual: false,
      referenceId: userId,
      subscriptionId: subscription?.stripeSubscriptionId ?? undefined,
      successUrl: process.env.BETTER_AUTH_URL,
      cancelUrl: process.env.BETTER_AUTH_URL,
      disableRedirect: false,
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-4 sm:p-6">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4"
        onClick={onClose}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Plano</h1>
          <p className="text-lg text-muted-foreground mt-2">Faça upgrade para desbloquear o uso de todos os modelos e mais funcionalidades.</p>
        </div>
        <div className="grid grid-cols-1 gap-8">
          <div className="border border-border rounded-2xl p-8 flex flex-col relative bg-sidebar">
            <div className="absolute top-0 right-4 -mt-3">
              <div className="bg-primary/5 backdrop-blur-3xl border border-primary text-primary text-xs font-semibold px-3 py-1 rounded-full">POPULAR</div>
            </div>
            <h2 className="text-2xl font-semibold">Pro</h2>
            <p className="mt-4 text-muted-foreground">Mais acesso à inteligência avançada</p>
            <div className="mt-6">
              <span className="text-4xl font-bold">R$39,90</span>
              <span className="ml-2 text-muted-foreground">/ mês</span>
            </div>
            <Button className="mt-8 w-full" onClick={createSubscription} disabled={isSubscribed}>
              {isSubscribed ? 'Seu plano atual' : 'Assinar Pro'}
            </Button>
            <ul className="mt-8 space-y-4 text-sm">
              {proFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  {feature.icon}
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
