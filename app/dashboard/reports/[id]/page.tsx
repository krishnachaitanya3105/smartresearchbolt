'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { ReportSkeleton } from '@/components/ui/loading-skeleton';
import { useReport } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  Share2, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Calendar,
  Clock
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

function ReportPageContent({ params }: { params: { id: string } }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [citationsOpen, setCitationsOpen] = useState(false);
  
  const { data: report, isLoading, error } = useReport(params.id);

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-slate-900">
        <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-auto p-6">
            <ReportSkeleton />
          </main>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-slate-900">
        <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Report Not Found
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                The report you're looking for doesn't exist or has been removed.
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {report.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Generated {formatDate(report.createdAt)}
                    </div>
                    {report.hasLiveData && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Updated {formatDate(report.createdAt)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {report.hasLiveData && (
                    <Badge variant="outline" className="text-teal-600 border-teal-300">
                      <Zap className="h-3 w-3 mr-1" />
                      Live Data
                    </Badge>
                  )}
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>

              {report.hasLiveData && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4"
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse mr-2" />
                    <p className="text-teal-700 dark:text-teal-300 text-sm">
                      This report includes live data that was last updated {formatDate(report.createdAt)}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Key Takeaways
              </h2>
              <ul className="space-y-3">
                {report.summary.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">{point}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Detailed Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Detailed Insights
              </h2>
              <div className="space-y-8">
                {Object.entries(report.insights).map(([title, content], index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                      {title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {content}
                    </p>
                    {index < Object.entries(report.insights).length - 1 && (
                      <Separator className="mt-6" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Citations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <Collapsible open={citationsOpen} onOpenChange={setCitationsOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Citations & References ({report.citations.length})
                    </h2>
                    <motion.div
                      animate={{ rotate: citationsOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-6">
                  <div className="space-y-4">
                    {report.citations.map((citation, index) => (
                      <motion.div
                        key={citation.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 * index }}
                        className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {citation.title}
                          </h4>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={citation.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {citation.authors} ({citation.year})
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {citation.relevance}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ReportPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <ReportPageContent params={params} />
    </ProtectedRoute>
  );
}
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}