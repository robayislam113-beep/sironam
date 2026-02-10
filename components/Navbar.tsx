
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Home } from 'lucide-react';
import { NewsCategory, NewsItem } from '../types';
import { SITE_NAME } from '../constants';

interface NavbarProps {
  news: NewsItem[];
}

const Navbar: React.FC<NavbarProps> = ({ news }) => {
  // Get titles of the first 10 news items for the marquee
  const breakingNewsText = news
    .slice(0, 10)
    .map(item => item.title)
    .join(' • ');

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-sironam text-white py-2 text-xs overflow-hidden">
        <div className="container mx-auto px-4 flex items-center">
          <span className="bg-red-600 px-2 py-0.5 rounded mr-3 animate-pulse font-bold whitespace-nowrap">ব্রেকিং নিউজ:</span>
          <marquee behavior="scroll" direction="left" className="w-full font-medium">
            {breakingNewsText || 'সর্বশেষ সংবাদের জন্য আমাদের সাথেই থাকুন...'}
          </marquee>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 hover:bg-gray-100 rounded">
            <Menu size={24} className="text-sironam" />
          </button>
          <Link to="/" className="text-4xl font-extrabold text-sironam tracking-tighter">
            {SITE_NAME}
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="flex items-center gap-1 text-sironam font-medium hover:text-teal-600 transition-colors">
            <Home size={18} /> প্রচ্ছদ
          </Link>
          {Object.values(NewsCategory).slice(0, 5).map(cat => (
            <button key={cat} className="text-gray-700 font-medium hover:text-sironam transition-colors">
              {cat}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative group hidden sm:block">
            <input 
              type="text" 
              placeholder="সংবাদ খুঁজুন..." 
              className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-sironam w-48 transition-all focus:w-64"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
