import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const ExamPrep = () => {
  const [examType, setExamType] = useState("");
  const [stage, setStage] = useState<"assessment" | "schedule">("assessment");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [schedule, setSchedule] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const API_KEY = "AIzaSyD6Eem8LKrihJUrLIJWqIRxojytF-4Ns3g";

  const getQuestions = (exam: string) => {
    // This would be expanded with actual questions for each exam type
    return Array(25).fill(null).map((_, index) => ({
      id: `q${index + 1}`,
      question: `Sample question ${index + 1} for ${exam}`,
      options: [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ]
    }));
  };

  const handleSubmit = async () => {
    if (!examType) {
      toast({
        title: "Missing Information",
        description: "Please select an exam type to continue.",
        variant: "destructive",
      });
      return;
    }

    if (Object.keys(answers).length < 25) {
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
                text: `Based on these assessment answers for ${examType} exam preparation:
                ${Object.entries(answers).map(([id, answer]) => 
                  `${id}: ${answer}`
                ).join("\n")}
                
                Please provide:
                1. Detailed analysis of current preparation level
                2. Areas needing immediate attention
                3. 90-day comprehensive study schedule including:
                   - Daily study plan with specific topics
                   - Weekly targets and milestones
                   - Recommended study materials and resources
                   - Practice test schedule
                   - Revision strategy
                4. Tips for exam day preparation
                5. Subject-wise preparation strategy
                
                Format the response with clear sections, daily schedules, and specific activities.`
              }]
            }]
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Failed to generate schedule");
      
      setSchedule(data.candidates[0].content.parts[0].text);
      setStage("schedule");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate study schedule. Please try again.",
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
      <h2 className="text-2xl font-bold text-white mb-4">Exam Preparation</h2>
      
      {stage === "assessment" && (
        <div className="space-y-6">
          <Select value={examType} onValueChange={setExamType}>
            <SelectTrigger className="glass-input">
              <SelectValue placeholder="Select exam type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jee">JEE</SelectItem>
              <SelectItem value="neet">NEET</SelectItem>
              <SelectItem value="tnpsc">TNPSC</SelectItem>
              <SelectItem value="upsc">UPSC</SelectItem>
            </SelectContent>
          </Select>

          {examType && (
            <>
              <p className="text-gray-300">
                Complete this assessment to get a personalized study schedule.
              </p>
              {getQuestions(examType).map((q) => (
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
                onClick={handleSubmit} 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Generating Schedule..." : "Get Study Schedule"}
              </Button>
            </>
          )}
        </div>
      )}

      {stage === "schedule" && schedule && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="whitespace-pre-wrap text-gray-300">
            {schedule}
          </div>
          <Button 
            onClick={() => {
              setStage("assessment");
              setAnswers({});
              setSchedule("");
            }}
            className="w-full"
          >
            Start New Assessment
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};