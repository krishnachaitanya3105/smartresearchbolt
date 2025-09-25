import { ChartBar as BarChart3, TrendingUp } from 'lucide-react';

interface CreditCounterProps {
  used: number;
  total: number;
  reportsGenerated: number;
}

export function CreditCounter({ used, total, reportsGenerated }: CreditCounterProps) {
  const percentage = (used / total) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Credits Usage */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Credits</h3>
          <BarChart3 className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Used</span>
            <span className="font-medium">{used} of {total}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {total - used} credits remaining
          </p>
        </div>
      </div>

      {/* Reports Generated */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Reports</h3>
          <TrendingUp className="h-5 w-5 text-green-500" />
        </div>
        
        <div className="space-y-2">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {reportsGenerated}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Reports generated this month
          </p>
          <p className="text-xs text-green-600 dark:text-green-400">
            +{reportsGenerated} from last month
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Usage</h3>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Cost per report</span>
            <span className="text-sm font-medium">$1.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Total spent</span>
            <span className="text-sm font-medium">${reportsGenerated}.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Live data enabled</span>
            <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}