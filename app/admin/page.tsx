'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, FileText, CreditCard, TrendingUp, Search, MoveHorizontal as MoreHorizontal, Shield, Activity } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock admin data
const adminData = {
  stats: {
    totalUsers: 1247,
    activeUsers: 892,
    totalReports: 5634,
    totalRevenue: 28450,
  },
  users: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      plan: 'Professional',
      credits: { used: 12, total: 50 },
      joinedAt: '2024-01-15',
      status: 'active',
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      plan: 'Enterprise',
      credits: { used: 45, total: 100 },
      joinedAt: '2024-01-10',
      status: 'active',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      plan: 'Starter',
      credits: { used: 8, total: 10 },
      joinedAt: '2024-01-20',
      status: 'inactive',
    },
  ],
  recentReports: [
    {
      id: '1',
      title: 'Climate Change Analysis',
      user: 'John Doe',
      createdAt: '2024-01-25T10:30:00Z',
      status: 'completed',
    },
    {
      id: '2',
      title: 'Market Research Report',
      user: 'Sarah Chen',
      createdAt: '2024-01-25T09:15:00Z',
      status: 'completed',
    },
    {
      id: '3',
      title: 'Academic Literature Review',
      user: 'Mike Johnson',
      createdAt: '2024-01-24T16:45:00Z',
      status: 'generating',
    },
  ],
};

function AdminContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = adminData.users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserAction = (userId: string, action: string) => {
    console.log(`${action} user ${userId}`);
    // In real app, make API call
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage users, reports, and system analytics
                </p>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Total Users',
                  value: adminData.stats.totalUsers.toLocaleString(),
                  icon: Users,
                  color: 'text-blue-600',
                  bgColor: 'bg-blue-100 dark:bg-blue-900',
                },
                {
                  title: 'Active Users',
                  value: adminData.stats.activeUsers.toLocaleString(),
                  icon: Activity,
                  color: 'text-green-600',
                  bgColor: 'bg-green-100 dark:bg-green-900',
                },
                {
                  title: 'Total Reports',
                  value: adminData.stats.totalReports.toLocaleString(),
                  icon: FileText,
                  color: 'text-purple-600',
                  bgColor: 'bg-purple-100 dark:bg-purple-900',
                },
                {
                  title: 'Revenue',
                  value: `$${adminData.stats.totalRevenue.toLocaleString()}`,
                  icon: TrendingUp,
                  color: 'text-orange-600',
                  bgColor: 'bg-orange-100 dark:bg-orange-900',
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                          <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Users Management */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      User Management
                    </CardTitle>
                    <CardDescription>
                      Manage user accounts and credits
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <div className="space-y-3">
                      {filteredUsers.map((user) => (
                        <motion.div
                          key={user.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {user.email}
                                </p>
                              </div>
                              <Badge variant="outline">
                                {user.plan}
                              </Badge>
                              <Badge 
                                variant={user.status === 'active' ? 'default' : 'secondary'}
                              >
                                {user.status}
                              </Badge>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                              Credits: {user.credits.used}/{user.credits.total} • 
                              Joined: {new Date(user.joinedAt).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem 
                                onClick={() => handleUserAction(user.id, 'view')}
                              >
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleUserAction(user.id, 'addCredits')}
                              >
                                Add Credits
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleUserAction(user.id, 'suspend')}
                              >
                                Suspend Account
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Reports */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Recent Reports
                    </CardTitle>
                    <CardDescription>
                      Latest reports generated by users
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {adminData.recentReports.map((report, index) => (
                        <motion.div
                          key={report.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                          className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{report.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              by {report.user} • {new Date(report.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge 
                            variant={report.status === 'completed' ? 'default' : 'secondary'}
                          >
                            {report.status}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminContent />
    </ProtectedRoute>
  );
}