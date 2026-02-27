'use client';

import { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, AlertTriangle, User, Bot } from 'lucide-react';
import {
  aiSymptomChecker,
  type AiSymptomCheckerOutput,
} from '@/ai/flows/ai-symptom-checker';
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
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type Message = {
  id: number;
  role: 'user' | 'bot';
  content: string | React.ReactNode;
};

function UrgencyBadge({
  urgency,
}: {
  urgency: 'low' | 'medium' | 'high' | 'emergency';
}) {
  const variant =
    urgency === 'high' || urgency === 'emergency' ? 'destructive' : 'secondary';
  return <Badge variant={variant}>{urgency.toUpperCase()}</Badge>;
}

function BotMessage({ analysis }: { analysis: AiSymptomCheckerOutput }) {
  return (
    <div className="w-full rounded-lg bg-muted/50 p-4 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">AI Analysis</h3>
        <UrgencyBadge urgency={analysis.urgencyLevel} />
      </div>
      {analysis.seekMedicalHelp && (
        <div className="flex items-start space-x-3 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-yellow-900">
          <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <p className="text-sm font-medium">
            Based on your symptoms, it is recommended to seek professional
            medical attention.
          </p>
        </div>
      )}
      <div>
        <h4 className="font-semibold">Recommendations:</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {analysis.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-md border border-dashed p-3 text-xs text-muted-foreground">
        <p className="font-semibold">Disclaimer:</p>
        <p>{analysis.disclaimer}</p>
      </div>
    </div>
  );
}

export default function SymptomCheckerPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'bot',
      content:
        'Hello! I am an AI symptom checker. Please describe your symptoms, and I will provide a preliminary analysis. This is not a substitute for professional medical advice.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await aiSymptomChecker({ symptoms: input });
      const botMessage: Message = {
        id: Date.now() + 1,
        role: 'bot',
        content: <BotMessage analysis={result} />,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: 'bot',
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
                {message.role === 'bot' && (
                  <Avatar className="h-9 w-9 border">
                    <AvatarFallback>
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-xl rounded-lg px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : typeof message.content === 'string'
                      ? 'bg-muted'
                      : ''
                  }`}
                >
                  {typeof message.content === 'string' ? (
                    <p className="text-sm">{message.content}</p>
                  ) : (
                    message.content
                  )}
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-9 w-9 border">
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
