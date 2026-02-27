'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { CornerDownLeft, AlertTriangle } from 'lucide-react';
import { getHealthAnalysis, type HealthAnalysisState } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      <CornerDownLeft className="h-4 w-4" />
      <span className="sr-only">Submit</span>
    </Button>
  );
}

function UrgencyBadge({
  urgency,
}: {
  urgency: 'low' | 'medium' | 'high' | 'emergency';
}) {
  const variant =
    urgency === 'high' || urgency === 'emergency' ? 'destructive' : 'secondary';
  return <Badge variant={variant}>{urgency.toUpperCase()}</Badge>;
}

export default function SymptomCheckerPage() {
  const initialState: HealthAnalysisState = {};
  const [state, dispatch] = useFormState(getHealthAnalysis, initialState);

  return (
    <div className="container mx-auto p-0">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Symptom Checker</CardTitle>
            <CardDescription>
              Describe your symptoms below, and our AI will provide a
              preliminary analysis. This is not a substitute for professional
              medical advice.
            </CardDescription>
          </CardHeader>
          <form action={dispatch}>
            <CardContent>
              <div className="relative">
                <Label htmlFor="symptoms" className="sr-only">
                  Symptoms
                </Label>
                <Textarea
                  id="symptoms"
                  name="symptoms"
                  placeholder="e.g., I have a persistent cough, a slight fever, and a headache..."
                  className="min-h-[120px] resize-none p-4 pr-20"
                  required
                  minLength={10}
                />
                <div className="absolute bottom-3 right-3">
                  <SubmitButton />
                </div>
              </div>
              {state.error && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {state.error}
                </p>
              )}
            </CardContent>
          </form>

          {state.data && (
            <CardFooter className="flex-col items-start gap-4">
              <div className="w-full rounded-lg border bg-muted/50 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg">AI Analysis</h3>
                  <UrgencyBadge urgency={state.data.urgencyLevel} />
                </div>
                {state.data.seekMedicalHelp && (
                  <div className="mb-4 flex items-start space-x-3 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-yellow-900">
                    <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium">
                      Based on your symptoms, it is recommended to seek
                      professional medical attention.
                    </p>
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Recommendations:</h4>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {state.data.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-md border border-dashed p-3 text-xs text-muted-foreground">
                    <p className="font-semibold">Disclaimer:</p>
                    <p>{state.data.disclaimer}</p>
                  </div>
                </div>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
