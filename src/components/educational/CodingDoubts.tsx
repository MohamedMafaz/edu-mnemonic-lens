import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const CodingDoubts = () => {
  const [language, setLanguage] = useState("");
  const [question, setQuestion] = useState("");
  const [code, setCode] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const API_KEY = "AIzaSyD6Eem8LKrihJUrLIJWqIRxojytF-4Ns3g";

  const handleSubmit = async () => {
    if (!language || !question.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a language and enter your question.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `As a coding expert in ${language}, help with this question:
                ${question}
                ${code ? `\nHere's the relevant code:\n${code}` : ""}
                
                Please provide:
                1. A clear explanation of the concept/issue
                2. Step-by-step solution
                3. Code examples if applicable
                4. Best practices and common pitfalls
                5. Additional resources for learning
                
                Format the response with clear sections and code blocks where needed.`
              }]
            }]
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Failed to generate answer");
      
      setAnswer(data.candidates[0].content.parts[0].text);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-white mb-4">Coding Doubt Solver</h2>
      
      <div className="space-y-4">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger>
            <SelectValue placeholder="Select programming language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Python">Python</SelectItem>
            <SelectItem value="JavaScript">JavaScript</SelectItem>
            <SelectItem value="Java">Java</SelectItem>
            <SelectItem value="C++">C++</SelectItem>
            <SelectItem value="SQL">SQL</SelectItem>
          </SelectContent>
        </Select>

        <div>
          <label className="text-white mb-2 block">Your Question</label>
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Describe your coding doubt or concept you want to understand..."
            className="min-h-[100px]"
          />
        </div>

        <div>
          <label className="text-white mb-2 block">Code (Optional)</label>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here if relevant..."
            className="min-h-[150px] font-mono"
          />
        </div>

        <Button 
          onClick={handleSubmit} 
          className="w-full"
          disabled={loading}
        >
          {loading ? "Processing..." : "Get Solution"}
        </Button>

        {answer && (
          <div className="mt-6 p-4 rounded-lg bg-black/20">
            <h3 className="text-xl font-semibold text-white mb-2">Solution</h3>
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-gray-300">{answer}</pre>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};