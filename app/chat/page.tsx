"use client";

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Response } from '@/components/ai-elements/response';
import { GlobeIcon } from 'lucide-react';
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/source';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Loader } from '@/components/ai-elements/loader';

const models = [
  {
    name: 'GPT 5',
    value: 'openai/gpt-4o',
    }
];

export default function Page() {
    const [input, setInput] = useState('');
    const [model, setModel] = useState<string>(models[0].value);
    const [webSearch, setWebSearch] = useState(false);
    const { messages, sendMessage, status } = useChat();
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (input.trim()) {
        sendMessage(
          { text: input },
          {
            body: {
              model: model,
              webSearch: webSearch,
            },
          },
        );
        setInput('');
      }
    };
    
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="m-2" />
      <SidebarInset className="overflow-hidden">
        <div className="flex flex-1 xl:flex-col w-full gap-4 pt-0 overflow-hidden">
          <div className="flex flex-col w-full max-w-2xl mx-auto overflow-hidden max-h-[calc(98vh)]">
                 <Conversation>
                   <ConversationContent>
                     {messages.map((message) => (
                       <div key={message.id}>
                         {message.role === 'assistant' && (
                           <Sources>
                             {message.parts.map((part, i) => {
                               switch (part.type) {
                                 case 'source-url':
                                   return (
                                     <>
                                       <SourcesTrigger
                                         count={
                                           message.parts.filter(
                                             (part) => part.type === 'source-url',
                                           ).length
                                         }
                                       />
                                       <SourcesContent key={`${message.id}-${i}`}>
                                         <Source
                                           key={`${message.id}-${i}`}
                                           href={part.url}
                                           title={part.url}
                                         />
                                       </SourcesContent>
                                     </>
                                   );
                               }
                             })}
                           </Sources>
                         )}
                         <Message from={message.role} key={message.id}>
                           <MessageContent>
                             {message.parts.map((part, i) => {
                               switch (part.type) {
                                 case 'text':
                                   return (
                                     <Response key={`${message.id}-${i}`}>
                                       {part.text}
                                     </Response>
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
         
                 <PromptInput onSubmit={handleSubmit} className="">
                   <PromptInputTextarea
                     onChange={(e) => setInput(e.target.value)}
                     value={input}
                   />
                   <PromptInputToolbar>
                     <PromptInputTools>
                       <PromptInputButton
                         variant={webSearch ? 'default' : 'ghost'}
                         onClick={() => setWebSearch(!webSearch)}
                       >
                         <GlobeIcon size={16} />
                         <span>Search</span>
                       </PromptInputButton>
                       <PromptInputModelSelect
                         onValueChange={(value) => {
                           setModel(value);
                         }}
                         value={model}
                       >
                         <PromptInputModelSelectTrigger>
                           <PromptInputModelSelectValue />
                         </PromptInputModelSelectTrigger>
                         <PromptInputModelSelectContent>
                           {models.map((model) => (
                             <PromptInputModelSelectItem key={model.value} value={model.value}>
                               {model.name}
                             </PromptInputModelSelectItem>
                           ))}
                         </PromptInputModelSelectContent>
                       </PromptInputModelSelect>
                     </PromptInputTools>
                     <PromptInputSubmit disabled={!input} status={status} />
                   </PromptInputToolbar>
                 </PromptInput>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
