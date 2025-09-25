'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  TrendingUp, 
  Calendar, 
  DollarSign,
  Plus,
  Check,
  Zap
} from 'lucide-react';
import { useBillingData, useBuyCredits } from '@/lib/api';
import { DashboardSkeleton } from '@/components/ui/loading-skeleton';
import { toast } from 'react-hot-toast';

function BillingContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: billingData, isLoading } = useBillingData();
  const buyCredits = useBuyCredits();

  const handleBuyCredits = (credits: number, amount: number) => {
    buyCredits.mutate({ credits, amount });
  };

  const handleUpgradePlan = () => {
    toast.success('Redirecting to Stripe checkout...');
    // In real app, redirect to Stripe checkout
  };

  if (isLoading) {
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
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Credits & Billing
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your credits, subscription, and billing information
              </p>
            </motion.div>

            {/* Current Plan & Credits */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Current Plan
                    </CardTitle>
                    <CardDescription>
                      Your subscription and usage details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{billingData?.subscription.plan}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ${billingData?.subscription.price}/{billingData?.subscription.interval}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-300">
                        {billingData?.subscription.status}
                      </Badge>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Credits Remaining</p>
                        <p className="text-2xl font-bold">{billingData?.user.credits.remaining}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Credits Used</p>
                        <p className="text-2xl font-bold">{billingData?.user.credits.used}</p>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ 
                          width: `${(billingData?.user.credits.used / billingData?.user.credits.total) * 100}%` 
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Next billing: {new Date(billingData?.subscription.nextBilling).toLocaleDateString()}
                      </span>
                      <Button variant="outline" onClick={handleUpgradePlan}>
                        Upgrade Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      This Month
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Reports Generated</p>
                      <p className="text-2xl font-bold">{billingData?.usage.thisMonth.reports}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Credits Used</p>
                      <p className="text-2xl font-bold">{billingData?.usage.thisMonth.credits}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Cost</p>
                      <p className="text-2xl font-bold">${billingData?.usage.thisMonth.cost}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Buy Credits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Buy Additional Credits
                  </CardTitle>
                  <CardDescription>
                    Purchase credits for one-time use or when you need extra reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { credits: 5, price: 10, popular: false },
                      { credits: 15, price: 25, popular: true },
                      { credits: 30, price: 45, popular: false },
                    ].map((option) => (
                      <motion.div
                        key={option.credits}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative border rounded-lg p-4 cursor-pointer transition-colors ${
                          option.popular
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                        onClick={() => handleBuyCredits(option.credits, option.price)}
                      >
                        {option.popular && (
                          <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                            Most Popular
                          </Badge>
                        )}
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-2">{option.credits}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Credits</div>
                          <div className="text-lg font-semibold mb-4">${option.price}</div>
                          <Button 
                            className="w-full" 
                            variant={option.popular ? 'default' : 'outline'}
                            disabled={buyCredits.isPending}
                          >
                            {buyCredits.isPending ? 'Processing...' : 'Buy Now'}
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Transaction History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Transaction History
                  </CardTitle>
                  <CardDescription>
                    Your recent billing transactions and credit purchases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {billingData?.transactions.map((transaction) => (
                      <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                            <DollarSign className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${transaction.amount}</p>
                          <Badge variant="outline" className="text-green-600 border-green-300">
                            <Check className="h-3 w-3 mr-1" />
                            {transaction.status}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <ProtectedRoute>
      <BillingContent />
    </ProtectedRoute>
  );
}