'use client';

import { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
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

export default function ReportPage({ params }: { params: { id: string } }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [citationsOpen, setCitationsOpen] = useState(false);

  // Mock report data - in real app this would be fetched from API
  const report = {
    id: params.id,
    title: 'Climate Change Impact Analysis',
    generatedAt: '2024-01-15T10:30:00Z',
    hasLiveData: true,
    lastUpdated: '2024-01-15T14:22:00Z',
    summary: [
      'Global temperature has increased by 1.2°C since pre-industrial times',
      'Sea level rise accelerated to 3.4mm per year in the last decade',
      'Arctic ice coverage decreased by 13% per decade since 1979',
      'Economic losses from climate events exceed $150 billion annually'
    ],
    insights: {
      'Temperature Trends': 'The analysis of temperature data from 2020-2024 reveals a consistent warming trend across all continents. The most significant increases are observed in polar regions, with the Arctic warming at twice the global average rate. This phenomenon, known as Arctic amplification, has profound implications for global weather patterns and sea level rise.',
      'Economic Impact': 'Climate-related economic losses have increased exponentially, with infrastructure damage, agricultural losses, and energy sector disruptions being the primary drivers. The insurance industry reports a 400% increase in climate-related claims over the past decade.',
      'Adaptation Strategies': 'Successful adaptation measures include coastal defense systems in the Netherlands, drought-resistant agriculture in Australia, and urban heat island mitigation in Singapore. These case studies provide actionable frameworks for other regions facing similar challenges.'
    },
    citations: [
      {
        id: 1,
        title: 'IPCC Sixth Assessment Report',
        authors: 'IPCC Working Group I',
        year: '2021',
        url: 'https://www.ipcc.ch/report/ar6/wg1/',
        relevance: 'Primary source for global temperature data and climate projections'
      },
      {
        id: 2,
        title: 'NASA Global Climate Change and Global Warming',
        authors: 'NASA Goddard Institute for Space Studies',
        year: '2024',
        url: 'https://climate.nasa.gov/',
        relevance: 'Satellite data for Arctic ice coverage and sea level measurements'
      },
      {
        id: 3,
        title: 'Economic Costs of Climate Change',
        authors: 'Stern Review Team',
        year: '2023',
        url: 'https://example.com/stern-review-2023',
        relevance: 'Economic impact analysis and cost projections'
      }
    ]
  };

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
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {report.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Generated {formatDate(report.generatedAt)}
                    </div>
                    {report.hasLiveData && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Updated {formatDate(report.lastUpdated)}
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
                <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse mr-2" />
                    <p className="text-teal-700 dark:text-teal-300 text-sm">
                      This report includes live data that was last updated {formatDate(report.lastUpdated)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Key Takeaways
              </h2>
              <ul className="space-y-3">
                {report.summary.map((point, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">{point}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Detailed Insights */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Detailed Insights
              </h2>
              <div className="space-y-8">
                {Object.entries(report.insights).map(([title, content], index) => (
                  <div key={index}>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                      {title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {content}
                    </p>
                    {index < Object.entries(report.insights).length - 1 && (
                      <Separator className="mt-6" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Citations */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <Collapsible open={citationsOpen} onOpenChange={setCitationsOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Citations & References ({report.citations.length})
                    </h2>
                    {citationsOpen ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-6">
                  <div className="space-y-4">
                    {report.citations.map((citation) => (
                      <div key={citation.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
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