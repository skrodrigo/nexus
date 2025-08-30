"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { authClient } from "@/lib/auth-client";
import { getSubscription } from '@/server/stripe/get-subscription';

interface UpgradeModalProps {
  title: string;
  description: string;
  Trigger: React.ReactNode;
}

export function UpgradeModal({ title, description, Trigger }: UpgradeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState('monthly');

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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="w-[420px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
            <Label
              htmlFor="monthly"
              className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-colors ${selectedPlan === 'monthly' ? 'border-primary bg-primary/5' : 'border-border'
                }`}>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="monthly" id="monthly" />
                <div className="font-medium">Mensal</div>
              </div>
              <div className="font-bold">R$ 39,90 <span className="font-normal text-sm text-muted-foreground">/mês</span></div>
            </Label>
          </RadioGroup>
        </div>
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={createSubscription}>
          Ir para Pagamento
        </Button>
      </DialogContent>
    </Dialog>
  );
}
