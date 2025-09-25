import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, ExternalLink, Zap } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
  status: 'generating' | 'completed' | 'failed';
  hasLiveData?: boolean;
}

interface ReportCardProps {
  report: Report;
}

export function ReportCard({ report }: ReportCardProps) {
  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'generating':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-blue-500" />
          <Badge className={getStatusColor(report.status)}>
            {report.status === 'generating' ? 'Generating...' : 
             report.status === 'completed' ? 'Completed' : 'Failed'}
          </Badge>
          {report.hasLiveData && (
            <Badge variant="outline" className="text-teal-600 border-teal-300">
              <Zap className="h-3 w-3 mr-1" />
              Live Data
            </Badge>
          )}
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {report.createdAt}
        </span>
      </div>

      <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
        {report.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
        {report.summary}
      </p>

      <div className="flex justify-between items-center">
        <Link href={`/dashboard/reports/${report.id}`}>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Report
          </Button>
        </Link>
        
        <Button variant="ghost" size="sm">
          Download PDF
        </Button>
      </div>
    </div>
  );
}