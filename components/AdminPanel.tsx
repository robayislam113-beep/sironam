
import React, { useState, useRef } from 'react';
import { Plus, Trash2, LayoutDashboard, LogOut, Image as ImageIcon, FileText, Download } from 'lucide-react';
import { NewsItem, NewsCategory } from '../types';
import { ADMIN_PASSWORD, SITE_NAME } from '../constants';

interface AdminPanelProps {
  news: NewsItem[];
  onAdd: (news: NewsItem) => void;
  onDelete: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ news, onAdd, onDelete }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: NewsCategory.NATIONAL,
    content: '',
    imageUrl: '',
    author: ''
  });
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeDownloadItem, setActiveDownloadItem] = useState<NewsItem | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('ভুল পাসওয়ার্ড!');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      alert('অনুগ্রহ করে একটি ছবি আপলোড করুন');
      return;
    }
    const newNews: NewsItem = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      isBreaking: false
    };
    onAdd(newNews);
    setIsAdding(false);
    setFormData({
      title: '',
      category: NewsCategory.NATIONAL,
      content: '',
      imageUrl: '',
      author: ''
    });
  };

  const handleDownloadCard = async (item: NewsItem) => {
    setActiveDownloadItem(item);
    // Give react a moment to render the hidden card with new data
    setTimeout(async () => {
      if (cardRef.current) {
        try {
          // @ts-ignore
          const dataUrl = await window.htmlToImage.toPng(cardRef.current, { quality: 1, pixelRatio: 2 });
          const link = document.createElement('a');
          link.download = `sironam-card-${item.id}.png`;
          link.href = dataUrl;
          link.click();
        } catch (error) {
          console.error('Download failed', error);
          alert('কার্ডটি ডাউনলোড করা সম্ভব হয়নি।');
        } finally {
          setActiveDownloadItem(null);
        }
      }
    }, 100);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-sironam w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
            <LayoutDashboard size={32} />
          </div>
          <h2 className="text-2xl font-bold text-sironam">এডমিন প্যানেল লগইন</h2>
          <p className="text-gray-500">নিরাপদ প্রবেশাধিকারের জন্য পাসওয়ার্ড দিন</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="পাসওয়ার্ড লিখুন..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sironam focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-sironam text-white rounded-xl font-bold hover:bg-teal-900 transition-all shadow-lg active:scale-95"
          >
            প্রবেশ করুন
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-sironam flex items-center gap-2">
            <LayoutDashboard /> ড্যাশবোর্ড
          </h1>
          <p className="text-gray-500 text-sm">আপনি বর্তমান সংবাদসমূহ পরিচালনা করছেন</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-sironam text-white px-5 py-2.5 rounded-xl hover:bg-teal-900 transition-all font-semibold shadow-md"
          >
            <Plus size={18} /> সংবাদ যুক্ত করুন
          </button>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-red-100"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="bg-sironam p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText /> নতুন সংবাদ আপলোড
              </h2>
              <button onClick={() => setIsAdding(false)} className="text-white/80 hover:text-white">
                বন্ধ করুন
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">শিরোনাম</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sironam outline-none"
                  placeholder="সংবাদের শিরোনাম দিন..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as NewsCategory})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sironam outline-none"
                  >
                    {Object.values(NewsCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">প্রতিবেদক</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sironam outline-none"
                    placeholder="নাম লিখুন..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">ছবি আপলোড করুন</label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {formData.imageUrl ? (
                    <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
                      <ImageIcon size={20} /> ছবি নির্বাচন করা হয়েছে
                      <img src={formData.imageUrl} className="w-12 h-12 rounded object-cover ml-2" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <ImageIcon size={32} />
                      <span>এখানে ক্লিক করে ছবি আপলোড করুন</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">বিস্তারিত সংবাদ</label>
                <textarea
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sironam outline-none resize-none"
                  placeholder="বিস্তারিত বর্ণনা করুন..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-sironam text-white rounded-xl font-bold hover:bg-teal-900 transition-all shadow-xl"
              >
                আপলোড নিশ্চিত করুন
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {news.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-teal-200 transition-colors">
            <div className="flex items-center gap-4">
              <img src={item.imageUrl} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
              <div>
                <h4 className="font-bold text-gray-900 line-clamp-1">{item.title}</h4>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span className="font-semibold text-sironam">{item.category}</span>
                  <span>{new Date(item.createdAt).toLocaleDateString('bn-BD')}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleDownloadCard(item)}
                className="p-3 text-sironam hover:bg-teal-50 rounded-full transition-all flex items-center gap-2"
                title="কার্ড ডাউনলোড করুন"
              >
                <Download size={20} />
              </button>
              <button 
                onClick={() => {
                  if(confirm('আপনি কি এই সংবাদটি মুছে ফেলতে চান?')) onDelete(item.id);
                }}
                className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                title="মুছে ফেলুন"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hidden Card Template for Generation */}
      {activeDownloadItem && (
        <div className="fixed -left-[9999px]">
          <div 
            ref={cardRef} 
            className="w-[1080px] h-[1080px] bg-white flex flex-col relative overflow-hidden font-['Hind_Siliguri']"
            style={{ backgroundImage: `linear-gradient(to bottom, transparent, rgba(6, 48, 52, 0.95)), url(${activeDownloadItem.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#063034] via-[#063034]/10 to-transparent opacity-90"></div>
            
            <div className="mt-auto p-16 z-10 text-white space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-1 bg-teal-400 rounded-full"></div>
                <span className="text-3xl font-bold uppercase tracking-widest text-teal-300">{activeDownloadItem.category}</span>
              </div>
              
              <h2 className="text-7xl font-extrabold leading-[1.1] tracking-tight drop-shadow-2xl">
                {activeDownloadItem.title}
              </h2>
              
              <div className="flex items-center justify-between border-t border-white/20 pt-10">
                <div className="flex flex-col">
                  <span className="text-5xl font-black text-white tracking-tighter mb-2">{SITE_NAME}</span>
                  <span className="text-xl text-white/60">sironam.com.bd</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-medium text-white/80">{new Date(activeDownloadItem.createdAt).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span className="text-xl italic text-teal-400">প্রতিবেদক: {activeDownloadItem.author}</span>
                </div>
              </div>
            </div>

            <div className="absolute top-12 left-12 bg-[#063034] px-8 py-4 rounded-full shadow-2xl border-2 border-teal-500/30">
               <span className="text-4xl font-black text-white">{SITE_NAME}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
