import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const PhysicsHelper = () => {
  const [concept, setConcept] = useState("");
  const [explanation, setExplanation] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      // TODO: Integrate with AI API for physics concept explanation
      toast({
        title: "Processing",
        description: "Generating explanation for the physics concept...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Physics Helper</h2>
      <div className="space-y-4">
        <div>
          <label className="text-white mb-2 block">Physics Concept</label>
          <Textarea
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="Describe the physics concept you want to understand..."
            className="glass-input"
          />
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Get Explanation
        </Button>
        {explanation && (
          <div className="mt-6 p-4 rounded-lg bg-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Explanation</h3>
            <p className="text-gray-200">{explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};