import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Graduate Student, MIT',
      content: 'SmartResearch AI cut my literature review time from weeks to days. The citation tracking is perfect for academic work.',
      rating: 5,
    },
    {
      name: 'Dr. Michael Torres',
      role: 'Professor, Stanford University',
      content: 'I use this to prepare comprehensive materials for my courses. The AI insights help me find connections I might have missed.',
      rating: 5,
    },
    {
      name: 'Emma Rodriguez',
      role: 'Research Analyst, TechCorp',
      content: 'Our team generates market research reports 10x faster now. The live data integration keeps everything current.',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Researchers Worldwide
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join thousands of students, teachers, and professionals who save hours with AI-powered research
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="border-t pt-4">
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="font-semibold">4.9/5</span>
              <span>from 1,200+ reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}