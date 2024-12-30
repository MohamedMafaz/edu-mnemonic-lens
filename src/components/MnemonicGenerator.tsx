import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const MnemonicGenerator = () => {
  const [sentence, setSentence] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const API_KEY = "AIzaSyD6Eem8LKrihJUrLIJWqIRxojytF-4Ns3g";

  const generateMnemonic = async () => {
    if (!sentence.trim()) {
      toast({
        title: "Error",
        description: "Please enter a sentence first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const words = sentence.split(/[,\s]+/).filter(word => word.length > 0);
      const firstLetters = words.map(word => word[0].toUpperCase()).join(', ');

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
                    text: `Create a memorable mnemonic device where each word starts with these letters in order: ${firstLetters}. The words should form a short, memorable phrase or sentence. Make it creative and easy to remember. For example, if given "N, H" for "Neon, Helium", a good mnemonic would be "Naughty Hippos". Original words: ${sentence}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to generate mnemonic");
      }
      const generatedMnemonic = data.candidates[0].content.parts[0].text;
      setMnemonic(generatedMnemonic);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate mnemonic. Please try again.",
        variant: "destructive",
      });
      console.error("Mnemonic generation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonic);
    toast({
      title: "Copied!",
      description: "Mnemonic copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Mnemonic Generator</h2>
        <p className="text-gray-300 mb-4">
          Enter words separated by spaces or commas, and we'll create a memorable mnemonic
          where each word starts with the first letter of your input words.
        </p>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Enter your words here (e.g., Neon, Helium)..."
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          className="glass-input min-h-[100px]"
        />

        <Button
          onClick={generateMnemonic}
          className="w-full btn-primary"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Mnemonic"}
        </Button>
      </div>

      {mnemonic && (
        <div className="glass p-4 space-y-4">
          <h3 className="text-xl font-semibold">Your Mnemonic:</h3>
          <p className="text-gray-300 whitespace-pre-wrap">{mnemonic}</p>
          <Button onClick={copyToClipboard} className="btn-secondary">
            Copy to Clipboard
          </Button>
        </div>
      )}
    </div>
  );
};