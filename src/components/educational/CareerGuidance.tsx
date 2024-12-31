import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const CareerGuidance = () => {
  const [stage, setStage] = useState<"assessment" | "interests" | "result">("assessment");
  const [assessment, setAssessment] = useState<Record<string, string>>({});
  const [interests, setInterests] = useState("");
  const [guidance, setGuidance] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const assessmentQuestions = [
    {
      id: "workStyle",
      question: "How do you prefer to work?",
      options: ["Independently", "In a team", "Mix of both", "Leadership role"]
    },
    {
      id: "problemSolving",
      question: "When faced with a complex problem, you typically:",
      options: ["Break it down systematically", "Look for creative solutions", "Seek advice from others", "Trust your intuition"]
    },
    {
      id: "environment",
      question: "What work environment appeals to you most?",
      options: ["Corporate office", "Remote work", "Outdoor/Field work", "Creative studio"]
    }
  ];

  const API_KEY = "AIzaSyD6Eem8LKrihJUrLIJWqIRxojytF-4Ns3g";

  const handleSubmitAssessment = () => {
    if (Object.keys(assessment).length < assessmentQuestions.length) {
      toast({
        title: "Incomplete Assessment",
        description: "Please answer all questions to proceed.",
        variant: "destructive",
      });
      return;
    }
    setStage("interests");
  };

  const generateGuidance = async () => {
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
                text: `Based on the following assessment:
                Work Style: ${assessment.workStyle}
                Problem Solving: ${assessment.problemSolving}
                Environment: ${assessment.environment}
                
                And interests/skills: ${interests}
                
                Provide detailed career guidance including:
                1. Top 3 recommended career paths
                2. Required skills and qualifications
                3. Growth opportunities
                4. Potential challenges and how to overcome them
                5. Next steps for career development
                
                Format the response with clear sections and bullet points.`
              }]
            }]
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Failed to generate guidance");
      
      setGuidance(data.candidates[0].content.parts[0].text);
      setStage("result");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate career guidance. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Career Guidance</h2>
        
        {stage === "assessment" && (
          <div className="space-y-6">
            <p className="text-gray-300 mb-4">
              Complete this assessment to help us understand your work preferences.
            </p>
            {assessmentQuestions.map((q) => (
              <div key={q.id} className="space-y-4">
                <p className="text-white">{q.question}</p>
                <RadioGroup
                  value={assessment[q.id]}
                  onValueChange={(value) => 
                    setAssessment(prev => ({ ...prev, [q.id]: value }))
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
            <Button onClick={handleSubmitAssessment} className="w-full">
              Continue
            </Button>
          </div>
        )}

        {stage === "interests" && (
          <div className="space-y-4">
            <p className="text-gray-300">
              Tell us about your interests, skills, and any specific career goals.
            </p>
            <Textarea
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="E.g., I enjoy problem-solving, have experience in web development..."
              className="min-h-[150px]"
            />
            <Button 
              onClick={generateGuidance} 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Get Career Guidance"}
            </Button>
          </div>
        )}

        {stage === "result" && guidance && (
          <div className="space-y-4">
            <div className="whitespace-pre-wrap text-gray-300">
              {guidance}
            </div>
            <Button 
              onClick={() => {
                setStage("assessment");
                setAssessment({});
                setInterests("");
                setGuidance("");
              }}
              className="w-full"
            >
              Start Over
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};