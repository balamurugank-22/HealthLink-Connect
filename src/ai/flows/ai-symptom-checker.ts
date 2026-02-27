'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const SymptomCheckerChatInputSchema = z.object({
  history: z.array(MessageSchema),
});
export type SymptomCheckerChatInput = z.infer<typeof SymptomCheckerChatInputSchema>;

export async function symptomCheckerChat(input: SymptomCheckerChatInput): Promise<string> {
  return symptomCheckerChatFlow(input);
}

const systemPrompt = `You are an AI Symptom Checker. Your role is to have a conversation with a patient to analyze their reported symptoms. Ask clarifying questions to get more details.

When you have enough information, provide preliminary recommendations, advise on whether to seek professional medical help, and indicate an urgency level.

Always end your final analysis with a disclaimer: "This is not a substitute for professional medical advice. Please consult with a qualified healthcare professional for a diagnosis."

Your first message should be an introduction. Do not start with a salutation.`;

const symptomCheckerChatFlow = ai.defineFlow(
  {
    name: 'symptomCheckerChatFlow',
    inputSchema: SymptomCheckerChatInputSchema,
    outputSchema: z.string(),
  },
  async ({ history }) => {
    // The Gemini models have a security setting that might block responses if it
    // detects medical advice. We are providing a disclaimer, so we can lower the threshold.
    const safetySettings = [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ];

    const messages = history.map((msg) => ({
      role: msg.role,
      content: [{ text: msg.content }],
    }));

    const response = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: {
        // The Google AI plugin supports a system prompt.
        system: systemPrompt,
        messages: messages,
      },
      config: {
        safetySettings,
      },
    });

    return response.text;
  }
);
