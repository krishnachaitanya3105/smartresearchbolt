import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, FileText, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-20 pb-16 lg:pt-32 lg:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Your AI-powered
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              {' '}Research Assistant
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Upload documents, ask questions, and generate comprehensive research reports with AI. 
            Get structured insights with citations in minutes, not hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Start Research
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#upload">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Upload className="mr-2 h-5 w-5" />
                Upload Files
              </Button>
            </Link>
            <Link href="#pricing">
              <Button size="lg" variant="ghost" className="w-full sm:w-auto">
                View Pricing
              </Button>
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <FileText className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Smart Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                AI analyzes your documents and generates structured insights
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <Zap className="h-12 w-12 text-teal-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Live Data</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Real-time updates with fresh information from live sources
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <Upload className="h-12 w-12 text-indigo-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Easy Upload</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Support for PDF, DOCX, TXT and multiple file formats
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}