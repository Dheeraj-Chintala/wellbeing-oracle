import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MedicalAnalysis } from "@/pages/Index";
import { 
  AlertTriangle, 
  FileText, 
  Shield, 
  Pill, 
  Dumbbell, 
  Apple,
  TrendingUp
} from "lucide-react";

interface ResultsDisplayProps {
  results: MedicalAnalysis;
}

export const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  const getConfidenceColor = (confidence: string) => {
    const conf = confidence.toLowerCase();
    if (conf.includes('high')) return 'bg-medical-success text-medical-success-foreground';
    if (conf.includes('medium') || conf.includes('moderate')) return 'bg-medical-warning text-medical-warning-foreground';
    return 'bg-medical-info text-medical-info-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Main Diagnosis */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <AlertTriangle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Possible Condition</CardTitle>
                <CardDescription>AI Analysis Result</CardDescription>
              </div>
            </div>
            <Badge className={getConfidenceColor(results.confidence)}>
              {results.confidence} Confidence
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-2xl font-bold text-primary mb-3">{results.disease}</h3>
          <p className="text-muted-foreground leading-relaxed">{results.description}</p>
        </CardContent>
      </Card>

      {/* Recommendations Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Precautions */}
        <Card className="h-fit">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-medical-warning/10">
                <Shield className="h-4 w-4 text-medical-warning" />
              </div>
              <CardTitle className="text-lg">Precautions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.precautions.map((precaution, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-medical-warning mt-2 flex-shrink-0" />
                  <span className="text-sm">{precaution}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Medications */}
        <Card className="h-fit">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-medical-info/10">
                <Pill className="h-4 w-4 text-medical-info" />
              </div>
              <CardTitle className="text-lg">Medications</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.medications.map((medication, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-medical-info mt-2 flex-shrink-0" />
                  <span className="text-sm">{medication}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Workouts */}
        <Card className="h-fit">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-medical-success/10">
                <Dumbbell className="h-4 w-4 text-medical-success" />
              </div>
              <CardTitle className="text-lg">Recommended Exercises</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.workouts.map((workout, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-medical-success mt-2 flex-shrink-0" />
                  <span className="text-sm">{workout}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Diets */}
        <Card className="h-fit">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Apple className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-lg">Dietary Recommendations</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.diets.map((diet, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm">{diet}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Disclaimer */}
      <Card className="border-medical-warning/20 bg-medical-warning/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-medical-warning mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-medical-warning mb-2">Important Medical Disclaimer</h4>
              <p className="text-sm text-muted-foreground">
                This AI analysis is for informational purposes only and should not replace professional medical advice. 
                Always consult with qualified healthcare providers for accurate diagnosis and treatment. 
                In case of emergency, contact emergency services immediately.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};