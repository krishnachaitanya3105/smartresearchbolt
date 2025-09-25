import { NextRequest, NextResponse } from 'next/server';

// Mock reports data
const mockReports = [
  {
    id: '1',
    title: 'Climate Change Impact Analysis',
    summary: [
      'Global temperature has increased by 1.2°C since pre-industrial times',
      'Sea level rise accelerated to 3.4mm per year in the last decade',
      'Arctic ice coverage decreased by 13% per decade since 1979',
      'Economic losses from climate events exceed $150 billion annually'
    ],
    insights: {
      'Temperature Trends': 'The analysis of temperature data from 2020-2024 reveals a consistent warming trend across all continents.',
      'Economic Impact': 'Climate-related economic losses have increased exponentially, with infrastructure damage being the primary driver.',
      'Adaptation Strategies': 'Successful adaptation measures include coastal defense systems and drought-resistant agriculture.'
    },
    citations: [
      {
        id: 1,
        title: 'IPCC Sixth Assessment Report',
        authors: 'IPCC Working Group I',
        year: '2021',
        url: 'https://www.ipcc.ch/report/ar6/wg1/',
        relevance: 'Primary source for global temperature data and climate projections'
      }
    ],
    createdAt: '2024-01-25T10:30:00Z',
    status: 'completed' as const,
    hasLiveData: true,
  },
  {
    id: '2',
    title: 'Market Research: AI Tools',
    summary: [
      'AI productivity tools market valued at $12.8 billion in 2024',
      'Expected CAGR of 28.5% through 2028',
      'Top players: OpenAI, Google, Microsoft, Anthropic',
      'Enterprise adoption rate increased by 340% year-over-year'
    ],
    insights: {
      'Market Size': 'The AI tools market has experienced unprecedented growth, driven by enterprise adoption.',
      'Competitive Landscape': 'Major tech companies are investing heavily in AI infrastructure and capabilities.',
      'Future Trends': 'Integration with existing workflows and specialized industry solutions are key growth areas.'
    },
    citations: [
      {
        id: 1,
        title: 'AI Market Research Report 2024',
        authors: 'TechAnalytics Inc.',
        year: '2024',
        url: '#',
        relevance: 'Market size and growth projections'
      }
    ],
    createdAt: '2024-01-24T14:20:00Z',
    status: 'completed' as const,
    hasLiveData: false,
  },
  {
    id: '3',
    title: 'Academic Literature Review: Machine Learning in Healthcare',
    summary: [
      'Over 2,500 peer-reviewed papers published in 2023',
      'Diagnostic accuracy improved by 23% with ML assistance',
      'Drug discovery timelines reduced by 40% using AI',
      'Regulatory frameworks still developing across regions'
    ],
    insights: {
      'Research Trends': 'Machine learning applications in healthcare have shifted towards personalized medicine.',
      'Clinical Impact': 'Significant improvements in diagnostic accuracy and treatment outcomes have been documented.',
      'Challenges': 'Data privacy, regulatory compliance, and integration with existing systems remain key challenges.'
    },
    citations: [
      {
        id: 1,
        title: 'Machine Learning in Healthcare: A Systematic Review',
        authors: 'Johnson et al.',
        year: '2023',
        url: '#',
        relevance: 'Comprehensive analysis of ML applications in healthcare'
      }
    ],
    createdAt: '2024-01-23T09:15:00Z',
    status: 'completed' as const,
    hasLiveData: true,
  },
];

export async function GET(request: NextRequest) {
  try {
    // In real app, this would:
    // 1. Authenticate user
    // 2. Fetch user's reports from database
    // 3. Apply pagination and filtering

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(mockReports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}