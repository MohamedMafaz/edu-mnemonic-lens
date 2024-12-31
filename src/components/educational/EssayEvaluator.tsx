import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const EssayEvaluator = () => {
  const [essay, setEssay] = useState("");
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      // TODO: Integrate with AI API for essay evaluation
      toast({
        title: "Evaluating",
        description: "Analyzing your essay...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to evaluate essay. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Essay Evaluator</h2>
      <div className="space-y-4">
        <div>
          <label className="text-white mb-2 block">Your Essay</label>
          <Textarea
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            placeholder="Paste your essay here..."
            className="glass-input min-h-[300px]"
          />
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Evaluate Essay
        </Button>
        {feedback && (
          <div className="mt-6 p-4 rounded-lg bg-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Feedback</h3>
            <p className="text-gray-200">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};