'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader as Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ResearchInputProps {
  uploads: File[];
}

export function ResearchInput({ uploads }: ResearchInputProps) {
  const [question, setQuestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      toast.error('Please enter a research question');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Mock API call - in real app this would generate a report
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Report generation started! You will be notified when it\'s ready.');
      setQuestion('');
    } catch (error) {
      toast.error('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="research-question" className="block text-sm font-medium mb-2">
          What would you like to research?
        </label>
        <Textarea
          id="research-question"
          placeholder="e.g., Analyze the impact of climate change on coastal cities from 2020-2024, focusing on economic implications and adaptation strategies..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="min-h-[120px] resize-none"
          disabled={isGenerating}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {uploads.length > 0 ? (
            <span>✓ {uploads.length} file{uploads.length === 1 ? '' : 's'} uploaded</span>
          ) : (
            <span>No files uploaded yet</span>
          )}
        </div>
        
        <Button 
          type="submit" 
          disabled={isGenerating || !question.trim()}
          className="w-full sm:w-auto"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Report...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Generate Report
            </>
          )}
        </Button>
      </div>
      
      {question.trim() && (
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">
          <strong>Estimated cost:</strong> 1 credit • <strong>Time:</strong> ~2-5 minutes
        </div>
      )}
    </form>
  );
}