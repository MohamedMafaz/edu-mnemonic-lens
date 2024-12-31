import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const CareerGuidance = () => {
  const [interests, setInterests] = useState("");
  const [skills, setSkills] = useState("");
  const [guidance, setGuidance] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      // TODO: Integrate with AI API for personalized career guidance
      toast({
        title: "Analysis in Progress",
        description: "We're analyzing your profile to provide personalized guidance.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate career guidance. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Career Guidance</h2>
      <div className="space-y-4">
        <div>
          <label className="text-white mb-2 block">Your Interests</label>
          <Textarea
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="What are your interests and hobbies?"
            className="glass-input"
          />
        </div>
        <div>
          <label className="text-white mb-2 block">Your Skills</label>
          <Textarea
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="What skills do you possess?"
            className="glass-input"
          />
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Get Career Guidance
        </Button>
        {guidance && (
          <div className="mt-6 p-4 rounded-lg bg-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Your Career Path</h3>
            <p className="text-gray-200">{guidance}</p>
          </div>
        )}
      </div>
    </div>
  );
};