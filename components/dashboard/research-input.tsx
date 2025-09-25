'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader as Loader2 } from 'lucide-react';
import { useGenerateReport } from '@/lib/api';
import { useAppStore } from '@/lib/store';

interface ResearchInputProps {
  uploads: File[];
}

export function ResearchInput({ uploads }: ResearchInputProps) {
  const [question, setQuestion] = useState('');
  const { addReport } = useAppStore();
  const generateReportMutation = useGenerateReport();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      return;
    }

    generateReportMutation.mutate(
      { question, files: uploads },
      {
        onSuccess: (report) => {
          addReport(report);
          setQuestion('');
        },
      }
    );
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
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
          disabled={generateReportMutation.isPending}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <motion.div
          className="text-sm text-gray-600 dark:text-gray-400"
          animate={{ scale: uploads.length > 0 ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {uploads.length > 0 ? (
            <span className="text-green-600 dark:text-green-400">
              ✓ {uploads.length} file{uploads.length === 1 ? '' : 's'} uploaded
            </span>
          ) : (
            <span>No files uploaded yet</span>
          )}
        </motion.div>
        
        <Button 
          type="submit" 
          disabled={generateReportMutation.isPending || !question.trim()}
          className="w-full sm:w-auto"
        >
          {generateReportMutation.isPending ? (
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
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-700 p-3 rounded-lg"
        >
          <strong>Estimated cost:</strong> 1 credit • <strong>Time:</strong> ~2-5 minutes
        </motion.div>
      )}
    </motion.form>
  );
}
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