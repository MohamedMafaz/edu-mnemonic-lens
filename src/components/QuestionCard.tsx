import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuestionCardProps {
  question: string;
  options: string[];
  currentAnswer?: number;
  onAnswer: (value: string) => void;
}

export const QuestionCard = ({
  question,
  options,
  currentAnswer,
  onAnswer,
}: QuestionCardProps) => {
  return (
    <div className="glass p-4">
      <p className="text-xl mb-6">{question}</p>
      <RadioGroup
        value={currentAnswer?.toString()}
        onValueChange={onAnswer}
        className="space-y-4"
      >
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`} className="text-gray-300">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};