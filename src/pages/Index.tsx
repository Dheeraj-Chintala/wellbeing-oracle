import { useState } from "react";
import { SymptomForm } from "@/components/SymptomForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { Stethoscope, Heart, Shield, Activity } from "lucide-react";

export interface MedicalAnalysis {
  disease: string;
  confidence: string;
  description: string;
  precautions: string[];
  medications: string[];
  workouts: string[];
  diets: string[];
}

const Index = () => {
  const [results, setResults] = useState<MedicalAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary to-medical-info">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MediCheck AI</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Symptom Analysis</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-4xl font-bold bg-gradient-to-r from-primary to-medical-info bg-clip-text text-transparent">
              Get Instant Health Insights
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Describe your symptoms and receive AI-powered analysis with disease predictions, 
              precautions, medications, and wellness recommendations.
            </p>
            
            {/* Trust Indicators */}
            <div className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-medical-success/10">
                  <Heart className="h-6 w-6 text-medical-success" />
                </div>
                <span className="text-sm font-medium">Comprehensive</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium">AI-Powered</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-medical-info/10">
                  <Shield className="h-6 w-6 text-medical-info" />
                </div>
                <span className="text-sm font-medium">Secure</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-medical-warning/10">
                  <Stethoscope className="h-6 w-6 text-medical-warning" />
                </div>
                <span className="text-sm font-medium">Professional</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="pb-12">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <SymptomForm 
              onResults={setResults} 
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            
            {results && (
              <div className="mt-8">
                <ResultsDisplay results={results} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Disclaimer */}
      <footer className="border-t bg-muted/30 py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Medical Disclaimer:</strong> This tool is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;