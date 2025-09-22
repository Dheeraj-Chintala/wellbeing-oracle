import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Send, AlertCircle } from "lucide-react";
import { analyzeSymptoms } from "@/lib/openrouter-service";
import { MedicalAnalysis } from "@/pages/Index";
import { useToast } from "@/hooks/use-toast";

interface SymptomFormProps {
  onResults: (results: MedicalAnalysis) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const SymptomForm = ({ onResults, isLoading, setIsLoading }: SymptomFormProps) => {
  const [symptoms, setSymptoms] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!symptoms.trim()) {
      toast({
        title: "Please describe your symptoms",
        description: "Enter a detailed description of what you're experiencing.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const analysis = await analyzeSymptoms(symptoms);
      onResults(analysis);
      toast({
        title: "Analysis Complete",
        description: "Your symptom analysis is ready below.",
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze symptoms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-foreground">
          Describe Your Symptoms
        </CardTitle>
        <CardDescription className="text-base">
          Provide a detailed description of your symptoms, their duration, and severity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="symptoms" className="text-sm font-medium">
              Symptoms Description *
            </Label>
            <Textarea
              id="symptoms"
              placeholder="Example: I have been experiencing a headache for the past 2 days, along with fever and body aches. The headache is throbbing and gets worse with light..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-[120px] resize-none border-2 focus:border-primary"
              disabled={isLoading}
              maxLength={1000}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Be as specific as possible for better analysis</span>
              <span>{symptoms.length}/1000</span>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-medical-warning/10 p-4">
            <AlertCircle className="h-5 w-5 text-medical-warning mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-medical-warning mb-1">Important Reminder</p>
              <p className="text-muted-foreground">
                This analysis is for informational purposes only. For serious symptoms or emergencies, 
                contact a healthcare professional immediately.
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !symptoms.trim()}
            className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-medical-info hover:from-primary/90 hover:to-medical-info/90 transition-all duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Symptoms...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Analyze Symptoms
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};