import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

// Types
export interface Report {
  id: string;
  title: string;
  summary: string[];
  insights: Record<string, string>;
  citations: Array<{
    id: number;
    title: string;
    authors: string;
    year: string;
    url: string;
    relevance: string;
  }>;
  createdAt: string;
  status: 'generating' | 'completed' | 'failed';
  hasLiveData?: boolean;
}

export interface BillingData {
  user: {
    id: string;
    plan: string;
    credits: {
      total: number;
      used: number;
      remaining: number;
    };
  };
  usage: {
    thisMonth: {
      reports: number;
      credits: number;
      cost: number;
    };
    lastMonth: {
      reports: number;
      credits: number;
      cost: number;
    };
  };
  subscription: {
    plan: string;
    price: number;
    interval: string;
    nextBilling: string;
    status: string;
  };
  transactions: Array<{
    id: string;
    amount: number;
    description: string;
    date: string;
    status: string;
  }>;
}

// API Functions
const api = {
  generateReport: async (data: { question: string; files: File[] }): Promise<Report> => {
    const formData = new FormData();
    formData.append('question', data.question);
    data.files.forEach((file) => formData.append('files', file));

    const response = await fetch('/api/generate-report', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to generate report');
    }

    return response.json();
  },

  uploadFiles: async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    const response = await fetch('/api/upload-file', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload files');
    }

    return response.json();
  },

  getBillingData: async (): Promise<BillingData> => {
    const response = await fetch('/api/billing');
    if (!response.ok) {
      throw new Error('Failed to fetch billing data');
    }
    return response.json();
  },

  buyCredits: async (data: { amount: number; credits: number }) => {
    const response = await fetch('/api/billing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'buy_credits', ...data }),
    });

    if (!response.ok) {
      throw new Error('Failed to purchase credits');
    }

    return response.json();
  },

  getReports: async (): Promise<Report[]> => {
    const response = await fetch('/api/reports');
    if (!response.ok) {
      throw new Error('Failed to fetch reports');
    }
    return response.json();
  },

  getReport: async (id: string): Promise<Report> => {
    const response = await fetch(`/api/reports/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch report');
    }
    return response.json();
  },
};

// React Query Hooks
export const useGenerateReport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.generateReport,
    onSuccess: (data) => {
      toast.success('Report generated successfully!');
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      queryClient.invalidateQueries({ queryKey: ['billing'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to generate report');
    },
  });
};

export const useUploadFiles = () => {
  return useMutation({
    mutationFn: api.uploadFiles,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to upload files');
    },
  });
};

export const useBillingData = () => {
  return useQuery({
    queryKey: ['billing'],
    queryFn: api.getBillingData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useBuyCredits = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.buyCredits,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['billing'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to purchase credits');
    },
  });
};

export const useReports = () => {
  return useQuery({
    queryKey: ['reports'],
    queryFn: api.getReports,
  });
};

export const useReport = (id: string) => {
  return useQuery({
    queryKey: ['report', id],
    queryFn: () => api.getReport(id),
    enabled: !!id,
  });
};