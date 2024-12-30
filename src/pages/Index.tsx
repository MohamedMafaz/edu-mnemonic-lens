import React, { useState, useEffect } from "react";
import { MnemonicGenerator } from "@/components/MnemonicGenerator";
import { PythonTest } from "@/components/PythonTest";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Sparkles, Code, Brain } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"mnemonic" | "test">("mnemonic");
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
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
          }}
        />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
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
            Your Journey to Excellence Starts Here
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center gap-4 mb-8"
        >
          <Button
            onClick={() => setActiveTab("mnemonic")}
            className={`${
              activeTab === "mnemonic"
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-blue-900/50 hover:bg-blue-800"
            } transition-all duration-300 flex items-center gap-2`}
          >
            <Brain className="w-4 h-4" />
            Mnemonic Generator
          </Button>
          <Button
            onClick={() => setActiveTab("test")}
            className={`${
              activeTab === "test"
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-blue-900/50 hover:bg-blue-800"
            } transition-all duration-300 flex items-center gap-2`}
          >
            <Code className="w-4 h-4" />
            Python Proficiency Test
          </Button>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="glass-card backdrop-blur-lg"
        >
          {activeTab === "mnemonic" ? <MnemonicGenerator /> : <PythonTest />}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;