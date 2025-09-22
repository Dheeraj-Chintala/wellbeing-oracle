import { MedicalAnalysis } from "@/pages/Index";

const OPENROUTER_API_KEY = import.meta.env.VITE_API_KEY;
const MODEL = "x-ai/grok-4-fast:free";

export async function analyzeSymptoms(symptoms: string): Promise<MedicalAnalysis> {
  const prompt = `You are a medical AI assistant. Based on the following symptoms, provide a structured analysis. Be helpful but always emphasize that this is not a substitute for professional medical advice.

Symptoms: ${symptoms}

Please provide your response in this exact JSON format:
{
  "disease": "Most likely condition name",
  "confidence": "High/Medium/Low confidence level",
  "description": "Brief description of the condition and how it relates to the symptoms",
  "precautions": ["List of 3-5 precautionary measures"],
  "medications": ["List of 3-5 common medications or treatments (mention consulting doctor)"],
  "workouts": ["List of 3-5 appropriate exercises or physical activities"],
  "diets": ["List of 3-5 dietary recommendations"]
}

Important guidelines:
- Always mention consulting a healthcare professional
- For medications, include "consult doctor before taking"
- Be specific but not overly technical
- Consider the symptoms seriously but don't cause panic
- Provide practical, actionable advice`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "MediCheck AI"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No response content received");
    }

    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }

    const analysis: MedicalAnalysis = JSON.parse(jsonMatch[0]);
    
    // Validate the response structure
    if (!analysis.disease || !analysis.description || !analysis.precautions || !analysis.medications) {
      throw new Error("Invalid response structure");
    }

    return analysis;
  } catch (error) {
    console.error("OpenRouter API Error:", error);
    
    // Return a fallback response
    return {
      disease: "Unable to analyze symptoms",
      confidence: "Low",
      description: "We encountered an issue analyzing your symptoms. Please try again or consult a healthcare professional.",
      precautions: [
        "Monitor your symptoms closely",
        "Stay hydrated and get adequate rest",
        "Consult a healthcare professional if symptoms persist or worsen",
        "Seek immediate medical attention for severe symptoms"
      ],
      medications: [
        "Consult a doctor before taking any medications",
        "Follow prescribed treatments only",
        "Avoid self-medication"
      ],
      workouts: [
        "Light walking if feeling well enough",
        "Gentle stretching exercises",
        "Avoid strenuous activity until feeling better"
      ],
      diets: [
        "Stay well hydrated with water",
        "Eat light, easily digestible foods",
        "Include fruits and vegetables for vitamins",
        "Avoid processed foods and excessive caffeine"
      ]
    };
  }
}
