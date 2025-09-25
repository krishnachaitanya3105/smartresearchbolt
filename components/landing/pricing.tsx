import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

export function Pricing() {
  return (
    <section id="pricing" className="py-16 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Flexible Pricing for Every Need
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Pay per credit or choose a subscription plan. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="text-4xl font-bold mb-2">$9<span className="text-lg text-gray-500">/mo</span></div>
              <p className="text-gray-600 dark:text-gray-400">Perfect for students</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>10 reports per month</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>Up to 5 files per report</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>Basic citations</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>PDF export</span>
              </li>
            </ul>
            
            <Link href="/auth/signin">
              <Button className="w-full" variant="outline">Get Started</Button>
            </Link>
            
            <div className="text-center mt-4 text-sm text-gray-500">
              10 credits = 10 reports
            </div>
          </div>

          {/* Professional */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl border-2 border-blue-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <div className="text-4xl font-bold mb-2">$29<span className="text-lg text-gray-500">/mo</span></div>
              <p className="text-gray-600 dark:text-gray-400">For professionals & teams</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>50 reports per month</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>Up to 20 files per report</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>Advanced citations & references</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>Live data integration</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>Priority support</span>
              </li>
            </ul>
            
            <Link href="/auth/signin">
              <Button className="w-full">Get Started</Button>
            </Link>
            
            <div className="text-center mt-4 text-sm text-gray-500">
              50 credits = 50 reports
            </div>
          </div>

          {/* Enterprise */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <div className="text-4xl font-bold mb-2">$99<span className="text-lg text-gray-500">/mo</span></div>
              <p className="text-gray-600 dark:text-gray-400">For large organizations</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>Unlimited reports</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>Unlimited files per report</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>Custom integrations</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>Team collaboration</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span>24/7 premium support</span>
              </li>
            </ul>
            
            <Link href="/auth/signin">
              <Button className="w-full" variant="outline">Contact Sales</Button>
            </Link>
            
            <div className="text-center mt-4 text-sm text-gray-500">
              Unlimited credits
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Need more flexibility? Try our pay-per-credit option
          </p>
          <div className="inline-flex items-center space-x-4 bg-white dark:bg-slate-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <span className="font-semibold">$2 per credit</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 dark:text-gray-400">1 credit = 1 report</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 dark:text-gray-400">No expiration</span>
          </div>
        </div>
      </div>
    </section>
  );
}