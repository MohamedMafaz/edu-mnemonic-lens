import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const pythonQuestions = [
  {
    question: "What is the output of print(type(5))?",
    options: ["<class 'int'>", "<class 'str'>", "<class 'float'>", "<class 'bool'>"],
    correctAnswer: 0,
  },
  {
    question: "Which of these is a valid way to create a list in Python?",
    options: [
      "list = [1, 2, 3]",
      "list = array(1, 2, 3)",
      "list = {1, 2, 3}",
      "list = (1, 2, 3)",
    ],
    correctAnswer: 0,
  },
  {
    question: "What does the len() function do?",
    options: [
      "Returns the length of an object",
      "Returns the last element",
      "Returns the first element",
      "Returns the sum of elements",
    ],
    correctAnswer: 0,
  },
];

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
                    text: `Create a 14-day Python learning curriculum for a student who scored ${score} out of ${pythonQuestions.length} on a basic Python test. Include specific topics to focus on each day.`,
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
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      generateCurriculum();
    }
  };

  if (showResults) {
    const score = answers.reduce(
      (acc, answer, index) =>
        answer === pythonQuestions[index].correctAnswer ? acc + 1 : acc,
      0
    );

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4">Test Complete!</h3>
          <p className="text-xl mb-4">
            Your Score: {score} out of {pythonQuestions.length}
          </p>
        </div>

        {loading ? (
          <div className="text-center">
            <p>Generating your personalized curriculum...</p>
          </div>
        ) : (
          curriculum && (
            <div className="glass p-4">
              <h3 className="text-xl font-semibold mb-4">
                Your 14-Day Learning Plan
              </h3>
              <div className="whitespace-pre-wrap text-gray-300">{curriculum}</div>
            </div>
          )
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Python Proficiency Test</h2>
        <p className="text-gray-300 mb-4">
          Complete this test to get a personalized 14-day learning curriculum.
        </p>
      </div>

      {!showResults ? (
        <div className="glass p-4">
          <p className="text-lg mb-4">
            Question {currentQuestion + 1} of {pythonQuestions.length}
          </p>
          <p className="text-xl mb-6">{pythonQuestions[currentQuestion].question}</p>

          <RadioGroup
            value={answers[currentQuestion]?.toString()}
            onValueChange={handleAnswer}
            className="space-y-4"
          >
            {pythonQuestions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-gray-300">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

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
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Test Complete!</h3>
            <p className="text-xl mb-4">
              Your Score: {answers.reduce(
                (acc, answer, index) =>
                  answer === pythonQuestions[index].correctAnswer ? acc + 1 : acc,
                0
              )} out of {pythonQuestions.length}
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <p>Generating your personalized curriculum...</p>
            </div>
          ) : (
            curriculum && (
              <div className="glass p-4">
                <h3 className="text-xl font-semibold mb-4">
                  Your 14-Day Learning Plan
                </h3>
                <div className="whitespace-pre-wrap text-gray-300">{curriculum}</div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};