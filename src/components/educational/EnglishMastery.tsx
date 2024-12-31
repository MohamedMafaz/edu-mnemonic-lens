import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const EnglishMastery = () => {
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      // TODO: Integrate with AI API for English language analysis
      toast({
        title: "Analyzing",
        description: "Evaluating your English proficiency...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">English Mastery</h2>
      <div className="space-y-4">
        <div>
          <label className="text-white mb-2 block">Write a paragraph</label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write something to evaluate your English skills..."
            className="glass-input min-h-[200px]"
          />
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Evaluate My English
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