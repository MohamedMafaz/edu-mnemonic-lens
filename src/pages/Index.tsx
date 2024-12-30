import React, { useState } from "react";
import { MnemonicGenerator } from "@/components/MnemonicGenerator";
import { PythonTest } from "@/components/PythonTest";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"mnemonic" | "test">("mnemonic");
  const { toast } = useToast();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="glass-card mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text">
          Edu Apex
        </h1>
        <p className="text-gray-300">Elevate Your Learning Experience</p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <Button
          onClick={() => setActiveTab("mnemonic")}
          className={`${
            activeTab === "mnemonic"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-900/50 hover:bg-blue-800"
          } transition-colors`}
        >
          Mnemonic Generator
        </Button>
        <Button
          onClick={() => setActiveTab("test")}
          className={`${
            activeTab === "test"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-900/50 hover:bg-blue-800"
          } transition-colors`}
        >
          Python Proficiency Test
        </Button>
      </div>

      <div className="glass-card">
        {activeTab === "mnemonic" ? <MnemonicGenerator /> : <PythonTest />}
      </div>
    </div>
  );
};

export default Index;