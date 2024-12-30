import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { pythonQuestions } from "@/data/pythonQuestions";
import { QuestionCard } from "./QuestionCard";
import { ResultsView } from "./ResultsView";
import { motion, AnimatePresence } from "framer-motion";

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

  const analyzePerformance = (answers: number[]) => {
    const categories: { [key: string]: { total: number; correct: number } } = {};
    
    pythonQuestions.forEach((q, index) => {
      const category = q.category || "general";
      if (!categories[category]) {
        categories[category] = { total: 0, correct: 0 };
      }
      categories[category].total++;
      if (answers[index] === q.correctAnswer) {
        categories[category].correct++;
      }
    });

    return Object.entries(categories).map(([category, stats]) => ({
      category,
      percentage: (stats.correct / stats.total) * 100,
      needsImprovement: (stats.correct / stats.total) < 0.6
    }));
  };

  const generateCurriculum = async () => {
    setLoading(true);
    const performance = analyzePerformance(answers);
    const weakAreas = performance
      .filter(area => area.needsImprovement)
      .map(area => area.category);
    const strongAreas = performance
      .filter(area => !area.needsImprovement)
      .map(area => area.category);

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
                    text: `Create a personalized 14-day Python learning curriculum. 
                    Focus heavily on these weak areas: ${weakAreas.join(", ")}. 
                    Spend less time on these strong areas: ${strongAreas.join(", ")}.
                    Include specific daily learning objectives, exercises, and resources.
                    Format the curriculum day by day, with clear headers and bullet points.`,
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

  const handleNext = () => {
    if (currentQuestion < pythonQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
      generateCurriculum();
    }
  };

  if (showResults) {
    return (
      <ResultsView
        score={answers.reduce(
          (acc, answer, index) =>
            answer === pythonQuestions[index].correctAnswer ? acc + 1 : acc,
          0
        )}
        totalQuestions={pythonQuestions.length}
        curriculum={curriculum}
        loading={loading}
      />
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Python Proficiency Test</h2>
        <p className="text-gray-300 mb-4">
          Complete this test to get a personalized 14-day learning curriculum.
          Progress: {currentQuestion + 1} of {pythonQuestions.length}
        </p>
        <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestion + 1) / pythonQuestions.length) * 100}%`,
            }}
          />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <QuestionCard
          key={currentQuestion}
          question={pythonQuestions[currentQuestion].question}
          options={pythonQuestions[currentQuestion].options}
          currentAnswer={answers[currentQuestion]}
          onAnswer={handleAnswer}
        />
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          onClick={handleNext}
          className="w-full bg-purple-600 hover:bg-purple-700 transition-colors"
          disabled={answers[currentQuestion] === undefined}
        >
          {currentQuestion === pythonQuestions.length - 1 ? "Finish" : "Next"}
        </Button>
      </motion.div>
    </div>
  );
};