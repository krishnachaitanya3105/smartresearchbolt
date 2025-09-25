'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { ResearchInput } from '@/components/dashboard/research-input';
import { FileUploader } from '@/components/dashboard/file-uploader';
import { ReportCard } from '@/components/dashboard/report-card';
import { CreditCounter } from '@/components/dashboard/credit-counter';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { DashboardSkeleton } from '@/components/ui/loading-skeleton';
import { useReports, useBillingData } from '@/lib/api';
import { useAppStore } from '@/lib/store';

function DashboardContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploads, setUploads] = useState<File[]>([]);
  const { user, updateCredits } = useAppStore();
  
  const { data: reportsData, isLoading: reportsLoading } = useReports();
  const { data: billingData, isLoading: billingLoading } = useBillingData();

  useEffect(() => {
    if (billingData?.user?.credits) {
      updateCredits(billingData.user.credits);
    }
  }, [billingData, updateCredits]);

  if (reportsLoading || billingLoading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-slate-900">
        <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-auto p-6">
            <DashboardSkeleton />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Credit Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CreditCounter
                used={user?.credits.used || 0}
                total={user?.credits.total || 0}
                reportsGenerated={billingData?.usage.thisMonth.reports || 0}
              />
            </motion.div>
            
            {/* Research Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h2 className="text-2xl font-bold mb-6">Start Your Research</h2>
              <ResearchInput uploads={uploads} />
            </motion.div>

            {/* File Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Upload Research Documents</h3>
              <FileUploader onFilesChange={setUploads} uploads={uploads} />
              
              {uploads.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                >
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    ✓ Live sources connected → last updated 2 mins ago
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Recent Reports */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-6">Recent Reports</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reportsData?.slice(0, 6).map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <ReportCard report={report} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}