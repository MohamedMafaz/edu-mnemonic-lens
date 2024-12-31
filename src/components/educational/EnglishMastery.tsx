import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const EnglishMastery = () => {
  const [stage, setStage] = useState<"assessment" | "practice">("assessment");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const assessmentQuestions = [
    {
      id: "grammar1",
      question: "Choose the correct sentence:",
      options: [
        "She don't like coffee.",
        "She doesn't likes coffee.",
        "She doesn't like coffee.",
        "She not like coffee."
      ]
    },
    {
      id: "grammar2",
      question: "Select the proper tense usage:",
      options: [
        "I am working here since 2020.",
        "I have been working here since 2020.",
        "I was working here since 2020.",
        "I worked here since 2020."
      ]
    },
    {
      id: "vocabulary",
      question: "Choose the best synonym for 'arduous':",
      options: [
        "Easy",
        "Difficult",
        "Quick",
        "Simple"
      ]
    }
  ];

  const API_KEY = "AIzaSyD6Eem8LKrihJUrLIJWqIRxojytF-4Ns3g";

  const analyzeAnswers = async () => {
    if (Object.keys(answers).length < assessmentQuestions.length) {
      toast({
        title: "Incomplete Assessment",
        description: "Please answer all questions to proceed.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Based on these assessment answers:
                ${Object.entries(answers).map(([id, answer]) => 
                  `${id}: ${answer}`
                ).join("\n")}
                
                Please provide:
                1. Analysis of the user's English proficiency level
                2. Specific areas that need improvement
                3. Personalized learning recommendations
                4. Practice exercises focused on weak areas
                5. Recommended learning resources
                
                Format the response with clear sections and examples.`
              }]
            }]
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Failed to analyze answers");
      
      setFeedback(data.candidates[0].content.parts[0].text);
      setStage("practice");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze your answers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-white mb-4">English Mastery</h2>

      {stage === "assessment" && (
        <div className="space-y-6">
          <p className="text-gray-300 mb-4">
            Complete this assessment to help us understand your English proficiency level.
          </p>
          {assessmentQuestions.map((q) => (
            <div key={q.id} className="space-y-4">
              <p className="text-white">{q.question}</p>
              <RadioGroup
                value={answers[q.id]}
                onValueChange={(value) => 
                  setAnswers(prev => ({ ...prev, [q.id]: value }))
                }
              >
                {q.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                    <Label htmlFor={`${q.id}-${option}`} className="text-gray-300">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
          <Button 
            onClick={analyzeAnswers} 
            className="w-full"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Get Analysis"}
          </Button>
        </div>
      )}

      {stage === "practice" && feedback && (
        <div className="space-y-4">
          <div className="whitespace-pre-wrap text-gray-300">
            {feedback}
          </div>
          <Button 
            onClick={() => {
              setStage("assessment");
              setAnswers({});
              setFeedback("");
            }}
            className="w-full"
          >
            Retake Assessment
          </Button>
        </div>
      )}
    </motion.div>
  );
};