import React from "react";
import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";

interface ResultsViewProps {
  score: number;
  totalQuestions: number;
  curriculum: string;
  loading: boolean;
}

export const ResultsView = ({
  score,
  totalQuestions,
  curriculum,
  loading,
}: ResultsViewProps) => {
  const handleDownloadPDF = () => {
    const content = document.createElement("div");
    content.innerHTML = `
      <h1>Python Learning Curriculum</h1>
      <p>Score: ${score} out of ${totalQuestions}</p>
      <div style="white-space: pre-wrap">${curriculum}</div>
    `;
    
    const opt = {
      margin: 1,
      filename: 'python-curriculum.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(content).save();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-4">Test Complete!</h3>
        <p className="text-xl mb-4">
          Your Score: {score} out of {totalQuestions}
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
            <div className="whitespace-pre-wrap text-gray-300 mb-4">{curriculum}</div>
            <Button onClick={handleDownloadPDF} className="w-full btn-secondary">
              Download Curriculum as PDF
            </Button>
          </div>
        )
      )}
    </div>
  );
};