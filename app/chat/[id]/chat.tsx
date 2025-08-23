'use client';

import { UIMessage, useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { UpgradeModal } from '@/components/upgrade-modal';
import { Conversation, ConversationContent, ConversationScrollButton } from '@/components/ai-elements/conversation';
import { Loader } from '@/components/ai-elements/loader';
import { Message, MessageContent } from '@/components/ai-elements/message';
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
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Response } from '@/components/ai-elements/response';
import { Actions, Action } from '@/components/ai-elements/actions';
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ScrollArea } from '@/components/ui/scroll-area';
import { GlobeIcon, RefreshCcwIcon, CopyIcon } from "lucide-react";
import Image from "next/image";

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

export function Chat({ chatId: initialChatId, initialMessages }: { chatId: string; initialMessages: UIMessage[] }) {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<string>(models[0].value);
  const [webSearch, setWebSearch] = useState(false);

  const selectedModel = models.find((m) => m.value === model);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '' });

  const { messages, sendMessage, status, regenerate } = useChat({
    onError: (error) => {
      try {
        const errorBody = JSON.parse(error.message);
        if (errorBody.error === 'Message limit reached') {
          setModalContent({
            title: 'Limite de mensagens atingido',
            description: 'Você atingiu seu limite de mensagens. Por favor, faça um upgrade para continuar usando o chat.',
          });
          setIsUpgradeModalOpen(true);
        }
      } catch (e) {
      }
    },
    messages: initialMessages,
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setInput('');

    sendMessage(
      { text: trimmedInput },
      {
        body: {
          model: model,
          webSearch: webSearch,
          chatId: initialChatId,
        },
      },
    );
  };

  return (
    <>
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        title={modalContent.title}
        description={modalContent.description}
      />
      <div className="relative flex flex-col h-screen w-full mx-2">
        <SidebarTrigger className="my-2 sticky top-2" />
        <SidebarInset className="overflow-hidden flex-1 mb-24">
          <div className="flex flex-col w-full mx-auto h-full">
            <ScrollArea className="flex-grow overflow-y-auto h-full">
              <Conversation className="flex-grow overflow-y-auto w-full max-w-3xl mx-auto h-full">
                <ConversationContent>
                  {messages.map((message, messageIndex) => (
                    <div key={message.id}>
                      <Message from={message.role} key={message.id}>
                        <MessageContent>
                          {message.parts.map((part, i) => {
                            switch (part.type) {
                              case 'text':
                                const isLastMessage =
                                  messageIndex === messages.length - 1;
                                return (
                                  <div key={`${message.id}-${i}`}>
                                    <Response>{part.text}</Response>
                                    {message.role === 'assistant' &&
                                      isLastMessage && (
                                        <Actions className="mt-2">
                                          <Action
                                            onClick={() =>
                                              regenerate({
                                                body: {
                                                  model: model,
                                                  webSearch: webSearch,
                                                  chatId: initialChatId,
                                                },
                                              })
                                            }
                                            label="Retry"
                                          >
                                            <RefreshCcwIcon className="size-3" />
                                          </Action>
                                          <Action
                                            onClick={() =>
                                              navigator.clipboard.writeText(
                                                part.text,
                                              )
                                            }
                                            label="Copy"
                                          >
                                            <CopyIcon className="size-3" />
                                          </Action>
                                        </Actions>
                                      )}
                                  </div>
                                );
                              case 'reasoning':
                                return (
                                  <Reasoning
                                    key={`${message.id}-${i}`}
                                    className="w-full"
                                    isStreaming={status === 'streaming'}
                                  >
                                    <ReasoningTrigger />
                                    <ReasoningContent>{part.text}</ReasoningContent>
                                  </Reasoning>
                                );
                              default:
                                return null;
                            }
                          })}
                        </MessageContent>
                      </Message>
                    </div>
                  ))}
                  {status === 'submitted' && <Loader />}
                </ConversationContent>
                <ConversationScrollButton />
              </Conversation>
            </ScrollArea>
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
                  <span>Pesquisar</span>
                </PromptInputButton>

              </PromptInputTools>
              <PromptInputSubmit disabled={!input} status={status} />
            </PromptInputToolbar>
          </PromptInput>
        </div>
      </div>
    </>
  );
}
