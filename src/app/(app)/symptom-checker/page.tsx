'use client';

import { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, User, Bot } from 'lucide-react';
import { symptomCheckerChat } from '@/ai/flows/ai-symptom-checker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split('\n').map((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
      return <li key={index}>{trimmedLine.substring(2)}</li>;
    }
    if (trimmedLine) {
       return <p key={index}>{trimmedLine}</p>;
    }
    return null;
  }).filter(Boolean);

  const groupedLines: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    if (line && line.type === 'li') {
      currentList.push(line);
    } else {
      if (currentList.length > 0) {
        groupedLines.push(
          <ul key={`ul-${index}`} className="list-disc pl-5 space-y-1 my-2">
            {currentList}
          </ul>
        );
        currentList = [];
      }
      if (line) {
        groupedLines.push(line);
      }
    }
  });

  if (currentList.length > 0) {
    groupedLines.push(
      <ul key="ul-end" className="list-disc pl-5 space-y-1 my-2">
        {currentList}
      </ul>
    );
  }

  return <>{groupedLines}</>;
}

type Message = {
  id: number;
  role: 'user' | 'model';
  content: string;
};

export default function SymptomCheckerPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef(0);

  const getNextMessageId = () => {
    const id = messageIdCounter.current;
    messageIdCounter.current += 1;
    return id;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const getInitialMessage = async () => {
      setIsLoading(true);
      try {
        const botResponse = await symptomCheckerChat({ history: [] });
        setMessages([
          {
            id: getNextMessageId(),
            role: 'model',
            content: botResponse,
          },
        ]);
      } catch (error) {
        console.error(error);
        setMessages([
          {
            id: getNextMessageId(),
            role: 'model',
            content:
              'Sorry, I encountered an error starting the chat. Please try refreshing.',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    getInitialMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: getNextMessageId(),
      role: 'user',
      content: input,
    };

    const newMessages: Message[] = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = newMessages.map(({ role, content }) => ({
        role,
        content,
      }));
      const result = await symptomCheckerChat({ history: chatHistory });
      const botMessage: Message = {
        id: getNextMessageId(),
        role: 'model',
        content: result,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: getNextMessageId(),
        role: 'model',
        content: 'Sorry, I encountered an error. Please try again later.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-0 flex h-[calc(100vh-10rem)] flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>AI Symptom Checker</CardTitle>
          <CardDescription>
            Chat with our AI to get a preliminary analysis of your symptoms.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto pr-4">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-4 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'model' && (
                  <Avatar className="h-9 w-9 border flex-shrink-0">
                    <AvatarFallback>
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-xl rounded-lg px-4 py-3 text-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <SimpleMarkdown content={message.content} />
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-9 w-9 border flex-shrink-0">
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-4">
                <Avatar className="h-9 w-9 border">
                  <AvatarFallback>
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-xl rounded-lg px-4 py-3 bg-muted">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="pt-4 border-t">
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Describe your symptoms..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
            >
              <CornerDownLeft className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
