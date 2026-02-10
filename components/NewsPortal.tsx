
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, ChevronRight } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsPortalProps {
  news: NewsItem[];
}

const NewsPortal: React.FC<NewsPortalProps> = ({ news }) => {
  const featured = news[0];
  const list = news.slice(1);

  return (
    <div className="space-y-12">
      {/* Hero Featured Section */}
      {featured && (
        <section className="relative group overflow-hidden rounded-2xl bg-white shadow-xl">
          <Link to={`/news/${featured.id}`} className="block">
            <div className="grid md:grid-cols-2">
              <div className="aspect-video md:aspect-auto h-full overflow-hidden">
                <img 
                  src={featured.imageUrl} 
                  alt={featured.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center space-y-4">
                <span className="inline-block px-3 py-1 bg-sironam text-white text-sm font-semibold rounded">
                  {featured.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900 hover:text-sironam transition-colors">
                  {featured.title}
                </h1>
                <p className="text-gray-600 line-clamp-3 leading-relaxed">
                  {featured.content}
                </p>
                <div className="flex items-center text-sm text-gray-500 pt-4 gap-4">
                  <span className="flex items-center gap-1"><Clock size={16} /> {new Date(featured.createdAt).toLocaleTimeString('bn-BD')}</span>
                  <span className="font-medium text-sironam">{featured.author}</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Secondary Grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((item) => (
          <article key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <Link to={`/news/${item.id}`}>
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-sironam uppercase tracking-wider">{item.category}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString('bn-BD')}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug line-clamp-2 hover:text-sironam transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {item.content}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-700 italic">-- {item.author}</span>
                  <ChevronRight size={18} className="text-sironam" />
                </div>
              </div>
            </Link>
          </article>
        ))}
      </section>

      {/* Newsletter Section */}
      <section className="bg-sironam rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">সর্বশেষ সংবাদের জন্য সাবস্ক্রাইব করুন</h2>
          <p className="text-teal-100">প্রতিদিন সকালে গুরুত্বপূর্ণ খবরের সারসংক্ষেপ আপনার ইনবক্সে পান।</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <input 
            type="email" 
            placeholder="আপনার ইমেইল" 
            className="px-4 py-3 rounded-lg text-gray-900 flex-grow md:w-64 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button className="bg-teal-500 hover:bg-teal-400 px-6 py-3 rounded-lg font-bold transition-colors shadow-lg">
            যুক্ত হোন
          </button>
        </div>
      </section>
    </div>
  );
};

export default NewsPortal;
