import { CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react';

export function ProblemSolution() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Research That Used to Take Hours, Now Takes Minutes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Stop struggling with manual research. Let AI do the heavy lifting.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Problem */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <AlertCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Manual Research is Slow</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Spending hours reading through documents, taking notes, and organizing information manually.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <AlertCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Inconsistent Citations</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tracking sources and maintaining proper citations becomes overwhelming with multiple documents.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <AlertCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Missing Key Insights</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Important connections and patterns often get missed in manual analysis.
                  </p>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Automated Analysis</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    AI processes your documents instantly and generates comprehensive reports in minutes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Perfect Citations</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Automatic citation tracking and formatting ensures all sources are properly referenced.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Deep Insights</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    AI identifies patterns, connections, and key takeaways you might have missed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}