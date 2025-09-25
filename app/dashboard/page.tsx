'use client';

import { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { ResearchInput } from '@/components/dashboard/research-input';
import { FileUploader } from '@/components/dashboard/file-uploader';
import { ReportCard } from '@/components/dashboard/report-card';
import { CreditCounter } from '@/components/dashboard/credit-counter';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploads, setUploads] = useState<File[]>([]);
  
  // Mock data - in real app this would come from API
  const [credits, setCredits] = useState({
    used: 3,
    total: 50,
    reportsGenerated: 3,
  });

  const recentReports = [
    {
      id: '1',
      title: 'Climate Change Impact Analysis',
      summary: 'Comprehensive analysis of climate data from 2020-2024 showing significant temperature increases...',
      createdAt: '2 hours ago',
      status: 'completed' as const,
      hasLiveData: true,
    },
    {
      id: '2',
      title: 'Market Research: AI Tools',
      summary: 'Analysis of the competitive landscape in AI-powered productivity tools market...',
      createdAt: '1 day ago',
      status: 'completed' as const,
      hasLiveData: false,
    },
    {
      id: '3',
      title: 'Academic Literature Review',
      summary: 'Systematic review of machine learning applications in healthcare from 2020-2024...',
      createdAt: '3 days ago',
      status: 'completed' as const,
      hasLiveData: true,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Credit Counter */}
            <CreditCounter
              used={credits.used}
              total={credits.total}
              reportsGenerated={credits.reportsGenerated}
            />
            
            {/* Research Input */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold mb-6">Start Your Research</h2>
              <ResearchInput uploads={uploads} />
            </div>

            {/* File Upload */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">Upload Research Documents</h3>
              <FileUploader onFilesChange={setUploads} uploads={uploads} />
              
              {uploads.length > 0 && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    ✓ Live sources connected → last updated 2 mins ago
                  </p>
                </div>
              )}
            </div>

            {/* Recent Reports */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Recent Reports</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recentReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}