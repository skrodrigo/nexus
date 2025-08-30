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
import { UpgradeModal } from '@/components/common/upgrade-modal';
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { startOrContinueChat } from '@/server/chat/start-or-continue-chat';
import { GlobeIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

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
  },
  {
    name: 'GPT-5',
    value: 'openai/gpt-5-mini',
    icon: <Image src="/chatgpt.svg" alt="openai" width={24} height={24} priority quality={100} />,
    capabilities: ['vision'],
  },
  {
    name: 'GPT-4.1',
    value: 'openai/gpt-4.1',
    icon: <Image src="/chatgpt.svg" alt="openai" width={24} height={24} priority quality={100} />,
    capabilities: ['vision'],
  },
  {
    name: 'Claude 4 Sonnet',
    value: 'anthropic/claude-4-sonnet',
    icon: <Image src="/claude.svg" alt="claude" width={24} height={24} priority quality={100} />,
    capabilities: ['vision', 'code'],
    off: true,
  },
  {
    name: 'DeepSeek R1',
    value: 'deepseek/deepseek-r1',
    icon: <Image src="/deepseek.svg" alt="deepseek" width={24} height={24} priority quality={100} />,
    capabilities: ['reasoning'],
  },
  {
    name: 'DeepSeek V3',
    value: 'deepseek/deepseek-v3',
    icon: <Image src="/deepseek.svg" alt="deepseek" width={24} height={24} priority quality={100} />,
    capabilities: ['reasoning'],
  },
];

export function ChatInterface() {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<string>(models[0].value);
  const [webSearch, setWebSearch] = useState(false);
  const selectedModel = models.find((m) => m.value === model);
  const router = useRouter();
  const [modalContent, setModalContent] = useState({ title: '', description: '' });
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (modalContent.title && triggerRef.current) {
      triggerRef.current.click();
    }
  }, [modalContent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setInput('');

    try {
      const result = await startOrContinueChat(null, trimmedInput);

      if (result?.error) {
        setModalContent({
          title: 'Upgrade Necessário',
          description: 'Para continuar enviando mesagens atualize seu plano!',
        });
        return;
      }

      if (result?.chatId) {
        router.push(`/chat/${result.chatId}`);
      }
    } catch (error) {
      setModalContent({
        title: 'Erro',
        description: 'Ocorreu um erro ao iniciar o chat. Tente novamente.',
      });
    }
  };

  return (
    <>
      <UpgradeModal
        title={modalContent.title}
        description={modalContent.description}
        Trigger={
          <button ref={triggerRef} className="hidden">
            Open Modal
          </button>
        }
      />
      <div className="relative flex flex-col h-screen w-full mx-2">
        <SidebarTrigger className="my-2 sticky top-2" />
        <SidebarInset className="overflow-hidden flex-1 mb-24">
          <div className="flex flex-col w-full mx-auto h-full">
            <div className="flex-grow h-full" />
          </div>
        </SidebarInset>
        <div className="absolute bottom-0 left-0 right-0 p-1 border border-border bg-muted/80 backdrop-blur-xl rounded-2xl w-full max-w-3xl mx-auto">
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
                            {model.off && (
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
                  <span>Pesquisar</span>
                </PromptInputButton>

              </PromptInputTools>
              <PromptInputSubmit disabled={!input} />
            </PromptInputToolbar>
          </PromptInput>
        </div>
      </div>
    </>
  );
}
