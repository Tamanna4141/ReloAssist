import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, Home, ArrowRight, CheckCircle } from 'lucide-react';

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-500 via-slate-600 to-slate-700

 text-white py-20 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect Job & Home
            <span className="block text-blue-200">In One Place</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Smart relocation made simple. Discover jobs and housing options that work together, 
            with intelligent matching based on commute, budget, and lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/jobs"
              className="bg-white text-slate-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Browse Jobs
            </Link>
            <Link
              to="/housing"
              className="bg-slate-400 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-400 transition-all transform hover:scale-105 shadow-lg border-2 border-slate-400"
            >
              Find Housing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How ReloAssist Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our intelligent platform streamlines your relocation process by connecting 
              job opportunities with nearby housing options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="bg-red-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:bg-red-200 transition-colors">
                <Search className="h-8 w-8 text-red-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Search Jobs</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse through verified job listings with detailed workplace addresses 
                and salary information across major cities.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <MapPin className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Get Smart Recommendations</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI suggests nearby housing options based on commute distance, 
                budget compatibility, and your preferences.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-purple-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <CheckCircle className="h-8 w-8 text-purple-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Apply & Move</h3>
              <p className="text-gray-600 leading-relaxed">
                Apply for jobs and contact housing owners directly. Get a complete 
                relocation summary with all costs and benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1,250+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">850+</div>
              <div className="text-gray-600">Housing Options</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Successful Relocations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">15+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-500 to-slate-300
 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Relocation Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of professionals who have successfully relocated with ReloAssist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all inline-flex items-center justify-center"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/jobs"
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-700 transition-all"
            >
              Browse Jobs Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;