'use server';
/**
 * @fileOverview An AI symptom checker that provides preliminary recommendations
 * and guidance on seeking professional medical help based on described symptoms.
 *
 * - aiSymptomChecker - A function that processes user-described symptoms.
 * - AiSymptomCheckerInput - The input type for the aiSymptomChecker function.
 * - AiSymptomCheckerOutput - The return type for the aiSymptomChecker function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiSymptomCheckerInputSchema = z.object({
  symptoms: z.string().describe('A detailed description of the patient\'s symptoms.'),
});
export type AiSymptomCheckerInput = z.infer<typeof AiSymptomCheckerInputSchema>;

const AiSymptomCheckerOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('An array of actionable, general advice for the patient based on their symptoms.'),
  seekMedicalHelp: z.boolean().describe('A boolean indicating if the AI believes professional medical attention is recommended.'),
  urgencyLevel: z.enum(['low', 'medium', 'high', 'emergency']).describe('The recommended urgency: "low" (monitor symptoms), "medium" (see a doctor within 24-48 hours), "high" (see a doctor immediately), or "emergency" (call emergency services).'),
  disclaimer: z.string().describe('A standard medical disclaimer stating that this is not a substitute for professional medical advice.'),
});
export type AiSymptomCheckerOutput = z.infer<typeof AiSymptomCheckerOutputSchema>;

export async function aiSymptomChecker(input: AiSymptomCheckerInput): Promise<AiSymptomCheckerOutput> {
  return aiSymptomCheckerFlow(input);
}

const aiSymptomCheckerPrompt = ai.definePrompt({
  name: 'aiSymptomCheckerPrompt',
  input: { schema: AiSymptomCheckerInputSchema },
  output: { schema: AiSymptomCheckerOutputSchema },
  prompt: `You are an AI Symptom Checker. Your role is to analyze a patient's reported symptoms and provide preliminary recommendations, advise on whether to seek professional medical help, and indicate the urgency level.

It is crucial to include a disclaimer stating this is not a substitute for professional medical advice and to consult with a qualified healthcare professional.

Symptoms: {{{symptoms}}}`,
});

const aiSymptomCheckerFlow = ai.defineFlow(
  {
    name: 'aiSymptomCheckerFlow',
    inputSchema: AiSymptomCheckerInputSchema,
    outputSchema: AiSymptomCheckerOutputSchema,
  },
  async (input) => {
    const { output } = await aiSymptomCheckerPrompt(input);
    return output!;
  }
);
