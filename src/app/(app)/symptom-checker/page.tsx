'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, CornerDownLeft, Stethoscope, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// Renders chat message content, preserving newlines.
function ChatMessageContent({ content }: { content: string }) {
  return <div className="whitespace-pre-wrap">{content}</div>;
}


type Message = {
  id: number;
  role: 'user' | 'model';
  content: string;
};

// Basic canned responses for the chatbot
const getBotResponse = (userInput: string): string => {
  const lowerInput = userInput.toLowerCase();
  if (lowerInput.includes('headache')) {
    return 'I see you mentioned a headache. Common advice includes resting in a quiet, dark room and staying hydrated. Have you experienced any other symptoms like dizziness or blurred vision?';
  }
  if (lowerInput.includes('fever')) {
    return 'For a fever, it\'s important to rest and drink plenty of fluids. Over-the-counter medications like acetaminophen can help. What is your temperature?';
  }
  if (lowerInput.includes('cough')) {
    return 'A cough can be caused by many things. You could try honey or a humidifier to soothe your throat. Is the cough dry or are you coughing up phlegm?';
  }
  return 'I am a basic chatbot and cannot provide medical advice. Please describe your symptoms, but for any serious concerns, consult a healthcare professional.';
};


export default function SymptomCheckerPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'model',
      content: 'Hello! I am a basic symptom checker. How can I help you today?\n\nThis is not a substitute for professional medical advice.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef(1);

  const getNextMessageId = () => {
    const id = messageIdCounter.current;
    messageIdCounter.current += 1;
    return id;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: getNextMessageId(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    
    // Simulate bot thinking and get response
    setTimeout(() => {
      const botResponseContent = getBotResponse(currentInput);
      const botMessage: Message = {
        id: getNextMessageId(),
        role: 'model',
        content: botResponseContent,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  return (
    <div className="container mx-auto p-0 h-full">
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Symptom Checker</CardTitle>
                <CardDescription>Click the icon in the bottom right to start a chat with our basic symptom checker.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center text-muted-foreground p-8">
                    <Stethoscope className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4">This page contains the chatbot functionality.</p>
                    <p className="text-sm">Click the floating button to get started.</p>
                </div>
            </CardContent>
        </Card>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg"
            size="icon"
          >
            <Stethoscope className="h-8 w-8" />
            <span className="sr-only">Open Symptom Checker</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="end"
          className="w-[350px] h-[500px] p-0 mr-2 flex flex-col"
        >
          <div className="flex h-full flex-col">
            <header className="flex items-center justify-between border-b p-3 bg-primary text-primary-foreground rounded-t-lg">
                <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    <h3 className="font-semibold text-base">Symptom Checker</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/80" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5"/>
                    <span className="sr-only">Close chat</span>
                </Button>
            </header>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn('flex items-start gap-3', {
                    'justify-end': message.role === 'user',
                  })}
                >
                  {message.role === 'model' && (
                     <Avatar className="h-8 w-8 border flex-shrink-0">
                        <AvatarFallback>
                        <Bot className="h-4 w-4" />
                        </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-xs rounded-lg px-3 py-2 text-sm',
                      {
                        'bg-primary text-primary-foreground': message.role === 'user',
                        'bg-muted': message.role === 'model',
                      }
                    )}
                  >
                    <ChatMessageContent content={message.content} />
                  </div>
                  {message.role === 'user' && (
                     <Avatar className="h-8 w-8 border flex-shrink-0">
                        <AvatarFallback>
                        <User className="h-4 w-4" />
                        </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t p-3">
              <form
                onSubmit={handleSubmit}
                className="flex w-full items-center space-x-2"
              >
                <Input
                  id="message"
                  placeholder="Type a message..."
                  className="flex-1"
                  autoComplete="off"
                  value={input}
                  onChange={handleInputChange}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim()}
                >
                  <CornerDownLeft className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
