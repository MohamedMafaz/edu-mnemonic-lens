import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const CodingDoubts = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      // TODO: Integrate with AI API for coding doubt resolution
      toast({
        title: "Processing",
        description: "Analyzing your coding question...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your question. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Coding Doubt Solver</h2>
      <div className="space-y-4">
        <div>
          <label className="text-white mb-2 block">Your Question</label>
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Describe your coding doubt or paste your code here..."
            className="glass-input min-h-[200px]"
          />
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Get Solution
        </Button>
        {answer && (
          <div className="mt-6 p-4 rounded-lg bg-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Solution</h3>
            <pre className="text-gray-200 whitespace-pre-wrap">{answer}</pre>
          </div>
        )}
      </div>
    </div>
  );
};