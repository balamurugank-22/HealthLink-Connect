'use server';

import {
  aiSymptomChecker,
  type AiSymptomCheckerInput,
  type AiSymptomCheckerOutput,
} from '@/ai/flows/ai-symptom-checker';

export interface HealthAnalysisState {
  data?: AiSymptomCheckerOutput;
  error?: string;
  symptoms?: string;
}

export async function getHealthAnalysis(
  prevState: HealthAnalysisState,
  formData: FormData
): Promise<HealthAnalysisState> {
  const symptoms = formData.get('symptoms') as string;
  if (!symptoms || symptoms.trim().length < 10) {
    return { error: 'Please describe your symptoms in at least 10 characters.' };
  }

  const input: AiSymptomCheckerInput = { symptoms };
  try {
    const result = await aiSymptomChecker(input);
    return { data: result, symptoms };
  } catch (e) {
    console.error(e);
    return {
      error:
        'An error occurred while analyzing your symptoms. Please try again later.',
      symptoms,
    };
  }
}
