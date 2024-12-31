import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const MockTests = () => {
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const { toast } = useToast();

  const handleGenerateTest = async () => {
    try {
      // TODO: Integrate with AI API for mock test generation
      toast({
        title: "Generating Test",
        description: "Creating a personalized mock test...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate test. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Mock Tests</h2>
      <div className="space-y-4">
        <Select onValueChange={setSubject}>
          <SelectTrigger className="glass-input">
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="physics">Physics</SelectItem>
            <SelectItem value="chemistry">Chemistry</SelectItem>
            <SelectItem value="mathematics">Mathematics</SelectItem>
            <SelectItem value="biology">Biology</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setDifficulty}>
          <SelectTrigger className="glass-input">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleGenerateTest} className="w-full">
          Generate Mock Test
        </Button>
      </div>
    </div>
  );
};