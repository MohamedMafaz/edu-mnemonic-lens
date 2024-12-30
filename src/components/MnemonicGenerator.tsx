import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const MnemonicGenerator = () => {
  const [sentence, setSentence] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer AIzaSyB6iP-l6NkyPbD1WtHaqTjDuSa6RMdtkQM`,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Create a memorable mnemonic device for the following sentence. Make it creative and easy to remember: "${sentence}"`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const generatedMnemonic = data.candidates[0].content.parts[0].text;
      setMnemonic(generatedMnemonic);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate mnemonic. Please try again.",
        variant: "destructive",
      });
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
          Enter a sentence or concept, and we'll create a memorable mnemonic to
          help you remember it.
        </p>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Enter your sentence here..."
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