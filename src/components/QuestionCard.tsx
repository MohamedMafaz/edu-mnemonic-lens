import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="glass p-6 rounded-xl"
    >
      <p className="text-xl mb-6 text-gray-100">{question}</p>
      <RadioGroup
        value={currentAnswer?.toString()}
        onValueChange={onAnswer}
        className="space-y-4"
      >
        {options.map((option, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <RadioGroupItem
              value={index.toString()}
              id={`option-${index}`}
              className="border-purple-400"
            />
            <Label
              htmlFor={`option-${index}`}
              className="text-gray-300 cursor-pointer flex-1"
            >
              {option}
            </Label>
          </motion.div>
        ))}
      </RadioGroup>
    </motion.div>
  );
};