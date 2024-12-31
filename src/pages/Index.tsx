import React, { useState, useEffect } from "react";
import { MnemonicGenerator } from "@/components/MnemonicGenerator";
import { PythonTest } from "@/components/PythonTest";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { 
  Sparkles, Code, Brain, GraduationCap, 
  BookOpen, Languages, TestTube, 
  FileQuestion, Briefcase, PenTool,
  School
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CareerGuidance } from "@/components/educational/CareerGuidance";
import { CodingDoubts } from "@/components/educational/CodingDoubts";
import { EnglishMastery } from "@/components/educational/EnglishMastery";
import { ExamPrep } from "@/components/educational/ExamPrep";
import { PhysicsHelper } from "@/components/educational/PhysicsHelper";
import { InterviewPrep } from "@/components/educational/InterviewPrep";
import { EssayEvaluator } from "@/components/educational/EssayEvaluator";
import { ChemistryHelper } from "@/components/educational/ChemistryHelper";
import { MockTests } from "@/components/educational/MockTests";

const Index = () => {
  const [activeTab, setActiveTab] = useState("python");
  const { toast } = useToast();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900"
          animate={{
            background: [
              "linear-gradient(to right, #00416A, #E4E5E6)",
              "linear-gradient(to right, #4B79A1, #283E51)",
              "linear-gradient(to right, #24C6DC, #514A9D)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"
            animate={{ scale: [1, 1.2, 1], rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"
            animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl"
            animate={{ scale: [1, 1.3, 1], rotate: 180 }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card mb-8 text-center"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Edu Apex
          </h1>
          <p className="text-gray-300 text-lg">
            Your Comprehensive Learning Companion
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 bg-transparent">
            <TabsTrigger value="python" className="glass-card">
              <Code className="w-4 h-4 mr-2" />
              Python Test
            </TabsTrigger>
            <TabsTrigger value="career" className="glass-card">
              <GraduationCap className="w-4 h-4 mr-2" />
              Career Guidance
            </TabsTrigger>
            <TabsTrigger value="coding" className="glass-card">
              <Brain className="w-4 h-4 mr-2" />
              Coding Doubts
            </TabsTrigger>
            <TabsTrigger value="english" className="glass-card">
              <Languages className="w-4 h-4 mr-2" />
              English Mastery
            </TabsTrigger>
            <TabsTrigger value="exams" className="glass-card">
              <School className="w-4 h-4 mr-2" />
              Exam Prep
            </TabsTrigger>
            <TabsTrigger value="physics" className="glass-card">
              <TestTube className="w-4 h-4 mr-2" />
              Physics Helper
            </TabsTrigger>
            <TabsTrigger value="interview" className="glass-card">
              <Briefcase className="w-4 h-4 mr-2" />
              Interview Prep
            </TabsTrigger>
            <TabsTrigger value="essay" className="glass-card">
              <PenTool className="w-4 h-4 mr-2" />
              Essay Evaluator
            </TabsTrigger>
            <TabsTrigger value="chemistry" className="glass-card">
              <TestTube className="w-4 h-4 mr-2" />
              Chemistry Helper
            </TabsTrigger>
            <TabsTrigger value="mock" className="glass-card">
              <FileQuestion className="w-4 h-4 mr-2" />
              Mock Tests
            </TabsTrigger>
          </TabsList>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8"
          >
            <TabsContent value="python" className="glass-card">
              <PythonTest />
            </TabsContent>
            <TabsContent value="career">
              <CareerGuidance />
            </TabsContent>
            <TabsContent value="coding">
              <CodingDoubts />
            </TabsContent>
            <TabsContent value="english">
              <EnglishMastery />
            </TabsContent>
            <TabsContent value="exams">
              <ExamPrep />
            </TabsContent>
            <TabsContent value="physics">
              <PhysicsHelper />
            </TabsContent>
            <TabsContent value="interview">
              <InterviewPrep />
            </TabsContent>
            <TabsContent value="essay">
              <EssayEvaluator />
            </TabsContent>
            <TabsContent value="chemistry">
              <ChemistryHelper />
            </TabsContent>
            <TabsContent value="mock">
              <MockTests />
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
