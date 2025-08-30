'use client';

import { useState } from 'react';
import { PromptInput, PromptInputTextarea, PromptInputSubmit, PromptInputModelSelectItem, PromptInputModelSelect, PromptInputModelSelectTrigger, PromptInputModelSelectContent, PromptInputTools, PromptInputToolbar, PromptInputButton } from '@/components/ai-elements/prompt-input';
import { SignInDialog } from '@/components/common/sign-in-dialog';
import { Header } from '@/components/common/header';
import { GlobeIcon } from 'lucide-react';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';

const models = [
  {
    name: 'Gemini 2.5',
    value: 'gemini/gemini-2.5-flash',
    icon: <Image src="/models/gemini.svg" alt="Gemini" width={24} height={24} priority quality={100} />,
  },
  {
    name: 'Chat GPT 5',
    value: 'openai/gpt-5-nano',
    icon: <Image src="/models/chatgpt.svg" alt="openai" width={24} height={24} priority quality={100} />,
  },
  {
    name: 'Chat GPT 4.1',
    value: 'openai/gpt-4.1-nano',
    icon: <Image src="/models/chatgpt.svg" alt="openai" width={24} height={24} priority quality={100} />,
  },
  {
    name: 'Claude 4 Sonnet',
    value: 'anthropic/claude-4-sonnet',
    icon: <Image src="/models/claude.svg" alt="claude" width={24} height={24} priority quality={100} />,
    off: true,
  },
  {
    name: 'DeepSeek V3',
    value: 'deepseek/deepseek-v3',
    icon: <Image src="/models/deepseek.svg" alt="deepseek" width={24} height={24} priority quality={100} />,
  },
];

const session = await authClient.getSession();

if (session.data?.user) {
  redirect('/chat');
}

export default function HomePage() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [input, setInput] = useState('');
  const [model, setModel] = useState<string>(models[0].value);
  const [webSearch, setWebSearch] = useState(false);

  const selectedModel = models.find((m) => m.value === model);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSignIn(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header onSignInClick={() => setShowSignIn(true)} />
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="w-full max-w-3xl px-4 flex flex-col items-center space-y-4">
          <h1 className="text-2xl font-light">Posso te ajudar?</h1>
          <div className="p-1 border border-border bg-muted/20 backdrop-blur-xl rounded-2xl w-full max-w-3xl mx-auto">
            <PromptInput onSubmit={handleSubmit}>
              <PromptInputTextarea
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <PromptInputToolbar>
                <PromptInputTools>
                  <PromptInputModelSelect
                    onValueChange={(value) => {
                      setModel(value);
                    }}
                    value={model}
                  >
                    <PromptInputModelSelectTrigger>
                      {selectedModel && (
                        <div className="flex items-center gap-2">
                          {selectedModel.icon}
                          <span className="font-medium">{selectedModel.name}</span>
                        </div>
                      )}
                    </PromptInputModelSelectTrigger>
                    <PromptInputModelSelectContent showSubscription={false} side="top">
                      {models.map((model) => {
                        const Icon = model.icon;
                        return (
                          <PromptInputModelSelectItem
                            key={model.value}
                            value={model.value}
                            disabled={model.off}
                          >
                            <div className="flex items-center gap-2">
                              {Icon}
                              <span className="font-medium">{model.name}</span>
                              {model.off && (
                                <span className="text-xs text-amber-500">Em breve</span>
                              )}
                            </div>
                          </PromptInputModelSelectItem>
                        );
                      })}
                    </PromptInputModelSelectContent>
                  </PromptInputModelSelect>
                  <PromptInputButton
                    variant={webSearch ? 'default' : 'ghost'}
                    onClick={() => setWebSearch(!webSearch)}
                  >
                    <GlobeIcon size={16} />
                    <span className="hidden sm:flex">Pesquisar</span>
                  </PromptInputButton>
                </PromptInputTools>
                <PromptInputSubmit disabled={!input} />
              </PromptInputToolbar>
            </PromptInput>
          </div>
        </div>
      </main>
      <SignInDialog open={showSignIn} onOpenChange={setShowSignIn} />
    </div>
  );
}