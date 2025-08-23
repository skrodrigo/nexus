"use client";

import {
  PromptInput,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools
} from '@/components/ai-elements/prompt-input';
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useChat } from '@ai-sdk/react';
import { startOrContinueChat } from '@/server/chat';
import { GlobeIcon } from "lucide-react";
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const models = [
  {
    name: 'Gemini 2.5 Flash',
    value: 'gemini/gemini-2.5-flash',
    icon: <Image src="/gemini.svg" alt="Gemini" width={24} height={24} priority quality={100} />,
    capabilities: ['vision', 'code'],
  },
  {
    name: 'Gemini 2.5 Pro',
    value: 'gemini/gemini-2.5-pro',
    icon: <Image src="/gemini.svg" alt="Gemini" width={24} height={24} priority quality={100} />,
    capabilities: ['vision', 'reasoning', 'code'],
    pro: true,
  },
  {
    name: 'GPT-5',
    value: 'openai/gpt-5',
    icon: <Image src="/chatgpt.svg" alt="openai" width={24} height={24} priority quality={100} />,
    capabilities: ['vision'],
  },
  {
    name: 'Claude 4 Sonnet',
    value: 'anthropic/claude-4-sonnet',
    icon: <Image src="/claude.svg" alt="claude" width={24} height={24} priority quality={100} />,
    capabilities: ['vision', 'code'],
    pro: true,
  },
  {
    name: 'DeepSeek R1',
    value: 'deepseek/deepseek-r1',
    icon: <Image src="/deepseek.svg" alt="deepseek" width={24} height={24} priority quality={100} />,
    capabilities: ['reasoning'],
  },
];

export default function Page() {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<string>(models[0].value);
  const [webSearch, setWebSearch] = useState(false);
  const selectedModel = models.find((m) => m.value === model);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setInput('');

    const newChatId = await startOrContinueChat(null, trimmedInput);

    router.push(`/chat/${newChatId}`);
  };

  return (
    <div className="relative flex flex-col h-screen w-full mx-2">
      <SidebarTrigger className="my-2 sticky top-2" />
      <SidebarInset className="overflow-hidden flex-1 mb-24">
        <div className="flex flex-col w-full mx-auto h-full">
          <div className="flex-grow h-full" />
        </div>
      </SidebarInset>
      <div className="absolute bottom-0 left-0 right-0 p-1 border border-border bg-muted/80 backdrop-blur-xl rounded-xl w-full max-w-3xl mx-auto">
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
                <PromptInputModelSelectContent>
                  {models.map((model) => {
                    const Icon = model.icon;
                    return (
                      <PromptInputModelSelectItem
                        key={model.value}
                        value={model.value}
                      >
                        <div className="flex items-center gap-2">
                          {Icon}
                          <span className="font-medium">{model.name}</span>
                          {model.pro && (
                            <span className="text-xs text-primary">PRO</span>
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
                <span>Search</span>
              </PromptInputButton>

            </PromptInputTools>
            <PromptInputSubmit disabled={!input} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  )
}
