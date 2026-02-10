
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import Navbar from './components/Navbar';
import NewsPortal from './components/NewsPortal';
import AdminPanel from './components/AdminPanel';
import NewsDetail from './components/NewsDetail';
import { NewsItem } from './types';
import { INITIAL_NEWS } from './constants';

const App: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('sironam_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  useEffect(() => {
    localStorage.setItem('sironam_news', JSON.stringify(news));
  }, [news]);

  const handleAddNews = (item: NewsItem) => {
    setNews(prev => [item, ...prev]);
  };

  const handleDeleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar news={news} />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
          <Routes>
            <Route path="/" element={<NewsPortal news={news} />} />
            <Route path="/news/:id" element={<NewsDetail news={news} />} />
            <Route 
              path="/admin" 
              element={
                <AdminPanel 
                  news={news} 
                  onAdd={handleAddNews} 
                  onDelete={handleDeleteNews} 
                />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="bg-sironam text-white py-10 mt-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">শিরোনাম</h2>
            <p className="text-gray-300 text-sm mb-6">© ২০২৪ শিরোনাম নিউজ পোর্টাল | সর্বস্বত্ব সংরক্ষিত।</p>
            <div className="pt-6 border-t border-white/10 flex justify-center">
              <Link to="/admin" className="text-gray-600 hover:text-white transition-colors p-2" title="এডমিন লগইন">
                <Lock size={14} />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
