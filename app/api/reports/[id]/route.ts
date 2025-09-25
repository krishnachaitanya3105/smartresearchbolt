import { NextRequest, NextResponse } from 'next/server';

// Mock report data
const mockReport = {
  id: '1',
  title: 'Climate Change Impact Analysis',
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
  ],
  createdAt: '2024-01-25T10:30:00Z',
  status: 'completed' as const,
  hasLiveData: true,
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // In real app, this would:
    // 1. Authenticate user
    // 2. Fetch specific report from database
    // 3. Check if user has access to this report

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Return mock report with the requested ID
    const report = { ...mockReport, id };

    return NextResponse.json(report);
  } catch (error) {
    console.error('Error fetching report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch report' },
      { status: 500 }
    );
  }
}