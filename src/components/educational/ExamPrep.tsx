import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ExamPrep = () => {
  const [examType, setExamType] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      // TODO: Integrate with AI API for exam preparation
      toast({
        title: "Processing",
        description: "Generating answer for your question...",
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
      <h2 className="text-2xl font-bold text-white mb-4">Exam Preparation</h2>
      <div className="space-y-4">
        <Select onValueChange={setExamType}>
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
        <div>
          <label className="text-white mb-2 block">Your Question</label>
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your exam-related question..."
            className="glass-input"
          />
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Get Answer
        </Button>
        {answer && (
          <div className="mt-6 p-4 rounded-lg bg-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Answer</h3>
            <p className="text-gray-200">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};