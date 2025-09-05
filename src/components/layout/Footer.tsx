import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-8 w-8 text-slate-600" />
              <span className="text-xl font-bold">ReloAssist</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted partner for seamless job and housing relocation. 
              Find the perfect job and home combination for your next career move.
            </p>
            <div className="flex space-x-4">
              <Mail className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">contact@reloassist.com</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/jobs" className="hover:text-blue-900 transition-colors">Browse Jobs</a></li>
              <li><a href="/housing" className="hover:text-blue-900 transition-colors">Find Housing</a></li>
              <li><a href="/dashboard" className="hover:text-blue-900 transition-colors">My Dashboard</a></li>
              <li><a href="/about" className="hover:text-blue-900 transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/help" className="hover:text-blue-900 transition-colors">Help Center</a></li>
              <li><a href="/privacy" className="hover:text-blue-900 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-blue-900 transition-colors">Terms of Service</a></li>
              <li><a href="/contact" className="hover:text-blue-900 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 ReloAssist. All rights reserved. Built with ❤️ for job seekers.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;