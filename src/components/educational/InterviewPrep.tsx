import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const InterviewPrep = () => {
  const [jobRole, setJobRole] = useState("");
  const [experience, setExperience] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      // TODO: Integrate with AI API for interview preparation
      toast({
        title: "Generating Questions",
        description: "Creating personalized interview questions...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate questions. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Interview Preparation</h2>
      <div className="space-y-4">
        <div>
          <label className="text-white mb-2 block">Job Role</label>
          <Input
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            placeholder="e.g., Software Engineer"
            className="glass-input"
          />
        </div>
        <div>
          <label className="text-white mb-2 block">Experience Level</label>
          <Input
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="e.g., 2 years"
            className="glass-input"
          />
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Generate Interview Questions
        </Button>
        {questions.length > 0 && (
          <div className="mt-6 p-4 rounded-lg bg-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Practice Questions</h3>
            <ul className="space-y-2">
              {questions.map((q, i) => (
                <li key={i} className="text-gray-200">
                  {i + 1}. {q}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};