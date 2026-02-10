
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2, ArrowLeft, Facebook, Twitter, MessageCircle, Calendar, User } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsDetailProps {
  news: NewsItem[];
}

const NewsDetail: React.FC<NewsDetailProps> = ({ news }) => {
  const { id } = useParams<{ id: string }>();
  
  const item = news.find(n => n.id === id);

  if (!item) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">সংবাদটি খুঁজে পাওয়া যায়নি!</h2>
        <Link to="/" className="text-sironam underline">প্রচ্ছদে ফিরে যান</Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.content.substring(0, 100) + '...',
        url: window.location.href,
      });
    } else {
      alert('আপনার ব্রাউজার সরাসরি শেয়ার সাপোর্ট করে না। লিংকটি কপি করুন।');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-sironam transition-colors mb-4">
        <ArrowLeft size={18} /> প্রচ্ছদে ফিরে যান
      </Link>

      <div className="space-y-6">
        <span className="px-3 py-1 bg-sironam text-white text-sm font-bold rounded">{item.category}</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          {item.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm border-b pb-6 border-gray-100">
          <span className="flex items-center gap-2"><User size={16} /> {item.author}</span>
          <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(item.createdAt).toLocaleDateString('bn-BD')}</span>
          <div className="flex gap-3 ml-auto">
            <button 
              onClick={handleShare} 
              className="flex items-center gap-2 px-4 py-2 bg-sironam text-white rounded-lg hover:bg-teal-900 transition-all font-semibold shadow-md active:scale-95"
            >
              <Share2 size={18} /> শেয়ার করুন
            </button>
          </div>
        </div>
      </div>

      <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
        {item.content}
      </div>

      {/* Share Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
        <h3 className="text-xl font-bold mb-6">এই সংবাদটি শেয়ার করুন</h3>
        <div className="flex justify-center gap-4">
          <button onClick={handleShare} className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all hover:scale-110">
            <Facebook size={24} />
          </button>
          <button onClick={handleShare} className="w-12 h-12 flex items-center justify-center bg-sky-400 text-white rounded-full hover:bg-sky-500 transition-all hover:scale-110">
            <Twitter size={24} />
          </button>
          <button onClick={handleShare} className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition-all hover:scale-110">
            <MessageCircle size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
