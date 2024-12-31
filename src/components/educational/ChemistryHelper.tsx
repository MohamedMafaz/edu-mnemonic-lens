import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ChemistryHelper = () => {
  const [concept, setConcept] = useState("");
  const [explanation, setExplanation] = useState<{
    definition: string;
    memorable: string;
    example: string;
  }>({ definition: "", memorable: "", example: "" });
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      // TODO: Integrate with AI API for chemistry concept explanation
      toast({
        title: "Processing",
        description: "Generating chemistry concept explanation...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Chemistry Helper</h2>
      <div className="space-y-4">
        <div>
          <label className="text-white mb-2 block">Chemistry Concept</label>
          <Input
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="Enter a chemistry concept..."
            className="glass-input"
          />
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Explain Concept
        </Button>
        {explanation.definition && (
          <Tabs defaultValue="definition" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="definition">Definition</TabsTrigger>
              <TabsTrigger value="memorable">Memorable</TabsTrigger>
              <TabsTrigger value="example">Example</TabsTrigger>
            </TabsList>
            <TabsContent value="definition" className="p-4 rounded-lg bg-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">Technical Definition</h3>
              <p className="text-gray-200">{explanation.definition}</p>
            </TabsContent>
            <TabsContent value="memorable" className="p-4 rounded-lg bg-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">Memorable Definition</h3>
              <p className="text-gray-200">{explanation.memorable}</p>
            </TabsContent>
            <TabsContent value="example" className="p-4 rounded-lg bg-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">Real-life Example</h3>
              <p className="text-gray-200">{explanation.example}</p>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};