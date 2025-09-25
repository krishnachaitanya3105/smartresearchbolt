import { GraduationCap, Users, BookOpen } from 'lucide-react';

export function UseCases() {
  return (
    <section id="features" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Perfect for Every Research Need
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From academic papers to business analysis, SmartResearch AI adapts to your specific requirements
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Students */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Students</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ace your research papers with AI-generated summaries, key insights, and proper citations from academic sources.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Literature reviews</li>
              <li>• Research papers</li>
              <li>• Thesis preparation</li>
              <li>• Assignment analysis</li>
            </ul>
          </div>

          {/* Teachers */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-6">
              <BookOpen className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Teachers</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create comprehensive lesson materials and research summaries to enhance your teaching effectiveness.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Curriculum development</li>
              <li>• Educational content</li>
              <li>• Research compilation</li>
              <li>• Study guides</li>
            </ul>
          </div>

          {/* Teams */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Startup Teams</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Make data-driven decisions with comprehensive market research and competitive analysis reports.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Market analysis</li>
              <li>• Competitive research</li>
              <li>• Industry reports</li>
              <li>• Business planning</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}