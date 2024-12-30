import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { pythonQuestions } from "@/data/pythonQuestions";
import { QuestionCard } from "./QuestionCard";
import { ResultsView } from "./ResultsView";

export const PythonTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [curriculum, setCurriculum] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const API_KEY = "AIzaSyB6iP-l6NkyPbD1WtHaqTjDuSa6RMdtkQM";

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(value);
    setAnswers(newAnswers);
  };

  const generateCurriculum = async () => {
    setLoading(true);
    const score = answers.reduce(
      (acc, answer, index) =>
        answer === pythonQuestions[index].correctAnswer ? acc + 1 : acc,
      0
    );

    // Create a detailed analysis of answers for the AI
    const answerAnalysis = pythonQuestions.map((q, index) => {
      const correct = answers[index] === q.correctAnswer;
      return `Question: ${q.question}\nUser's Answer: ${q.options[answers[index]]}\nCorrect: ${correct}\n`;
    }).join('\n');

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Based on this Python test analysis:\n${answerAnalysis}\n\nCreate a detailed 14-day Python learning curriculum for a student who scored ${score} out of ${pythonQuestions.length}. Focus more on topics where they made mistakes. Include specific daily learning objectives, exercises, and resources.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to generate curriculum");
      }
      setCurriculum(data.candidates[0].content.parts[0].text);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate curriculum. Please try again.",
        variant: "destructive",
      });
      console.error("Curriculum generation error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (showResults) {
    const score = answers.reduce(
      (acc, answer, index) =>
        answer === pythonQuestions[index].correctAnswer ? acc + 1 : acc,
      0
    );

    return (
      <ResultsView
        score={score}
        totalQuestions={pythonQuestions.length}
        curriculum={curriculum}
        loading={loading}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Python Proficiency Test</h2>
        <p className="text-gray-300 mb-4">
          Complete this test to get a personalized 14-day learning curriculum.
          Progress: {currentQuestion + 1} of {pythonQuestions.length}
        </p>
      </div>

      <QuestionCard
        question={pythonQuestions[currentQuestion].question}
        options={pythonQuestions[currentQuestion].options}
        currentAnswer={answers[currentQuestion]}
        onAnswer={handleAnswer}
      />

      <Button
        onClick={() => {
          if (currentQuestion < pythonQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
          } else {
            setShowResults(true);
            generateCurriculum();
          }
        }}
        className="w-full btn-primary mt-6"
        disabled={answers[currentQuestion] === undefined}
      >
        {currentQuestion === pythonQuestions.length - 1 ? "Finish" : "Next"}
      </Button>
    </div>
  );
};