
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useParams } from 'react-router-dom';
import { 
  Lock, Menu, Search, Home, Clock, ChevronRight, 
  Plus, Trash2, LayoutDashboard, LogOut, 
  Image as ImageIcon, FileText, Download,
  Share2, Facebook, Twitter, MessageCircle, Calendar, User, ArrowLeft
} from 'lucide-react';

// --- TYPES & CONSTANTS ---
const ADMIN_PASSWORD = 'Chayon@1810695017';
const SITE_NAME = 'শিরোনাম';
const PRIMARY_COLOR = '#063034';

enum NewsCategory {
  NATIONAL = 'জাতীয়',
  POLITICS = 'রাজনীতি',
  INTERNATIONAL = 'আন্তর্জাতিক',
  SPORTS = 'খেলাধুলা',
  ENTERTAINMENT = 'বিনোদন',
  TECH = 'প্রযুক্তি',
  ECONOMY = 'অর্থনীতি'
}

interface NewsItem {
  id: string;
  title: string;
  category: NewsCategory;
  content: string;
  imageUrl: string;
  createdAt: number;
  author: string;
  isBreaking?: boolean;
}

const INITIAL_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'দেশের অর্থনীতিতে নতুন গতির সঞ্চার: রপ্তানি আয়ে বড় উল্লম্ফন',
    category: NewsCategory.ECONOMY,
    content: 'বাংলাদেশের রপ্তানি বাণিজ্যে এক নতুন মাইলফলক স্পর্শ হয়েছে। চলতি মাসে রপ্তানি আয় গত বছরের তুলনায় ২০ শতাংশ বৃদ্ধি পেয়েছে। তৈরি পোশাক খাতের পাশাপাশি কৃষিপণ্য রপ্তানিতেও ইতিবাচক ধারা লক্ষ্য করা গেছে। অর্থনীতিবিদরা মনে করছেন, এই ধারা অব্যাহত থাকলে বৈদেশিক মুদ্রার রিজার্ভে স্বস্তি ফিরবে।',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800',
    createdAt: Date.now() - 3600000,
    author: 'সৈকত আহমেদ',
    isBreaking: true
  }
];

// --- COMPONENTS ---

// 1. Navbar Component
const Navbar = ({ news }: { news: NewsItem[] }) => {
  const breakingNewsText = news.slice(0, 5).map(item => item.title).join(' • ');
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-[#063034] text-white py-2 text-xs overflow-hidden">
        <div className="container mx-auto px-4 flex items-center">
          <span className="bg-red-600 px-2 py-0.5 rounded mr-3 animate-pulse font-bold whitespace-nowrap">ব্রেকিং:</span>
          <marquee className="w-full font-medium">{breakingNewsText || 'সর্বশেষ সংবাদের জন্য আমাদের সাথেই থাকুন...'}</marquee>
        </div>
      </div>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-4xl font-extrabold text-[#063034] tracking-tighter">{SITE_NAME}</Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="flex items-center gap-1 text-[#063034] font-bold"><Home size={18} /> প্রচ্ছদ</Link>
          {Object.values(NewsCategory).slice(0, 4).map(cat => (
            <button key={cat} className="text-gray-700 hover:text-[#063034] font-medium">{cat}</button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <input type="text" placeholder="খুঁজুন..." className="pl-9 pr-4 py-1.5 bg-gray-100 rounded-full text-sm outline-none focus:ring-1 focus:ring-[#063034]" />
            <Search className="absolute left-3 top-2 text-gray-400" size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

// 2. News Portal (Home)
const NewsPortal = ({ news }: { news: NewsItem[] }) => {
  const featured = news[0];
  const list = news.slice(1);
  return (
    <div className="space-y-10">
      {featured && (
        <Link to={`/news/${featured.id}`} className="block group">
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col md:flex-row">
            <div className="md:w-3/5 overflow-hidden">
              <img src={featured.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt="" />
            </div>
            <div className="md:w-2/5 p-8 flex flex-col justify-center">
              <span className="bg-[#063034] text-white px-3 py-1 rounded-full text-xs w-fit mb-4">{featured.category}</span>
              <h1 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#063034]">{featured.title}</h1>
              <p className="text-gray-600 line-clamp-3 mb-6">{featured.content}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Clock size={14} /> {new Date(featured.createdAt).toLocaleTimeString('bn-BD')}</span>
                <span className="font-bold text-[#063034]">-- {featured.author}</span>
              </div>
            </div>
          </div>
        </Link>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map(item => (
          <Link key={item.id} to={`/news/${item.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
            <div className="aspect-video overflow-hidden">
              <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-all" alt="" />
            </div>
            <div className="p-5">
              <span className="text-[#063034] font-bold text-xs uppercase mb-2 block">{item.category}</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#063034]">{item.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">{item.content}</p>
              <div className="flex justify-between items-center text-xs text-gray-400 pt-4 border-t">
                <span>{new Date(item.createdAt).toLocaleDateString('bn-BD')}</span>
                <span className="text-[#063034] font-medium">{item.author}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// 3. News Detail Page
const NewsDetail = ({ news }: { news: NewsItem[] }) => {
  const { id } = useParams();
  const item = news.find(n => n.id === id);
  if (!item) return <div className="py-20 text-center">সংবাদ পাওয়া যায়নি।</div>;

  const handleShare = () => {
    if (navigator.share) navigator.share({ title: item.title, url: window.location.href });
    else alert('লিংকটি কপি করে শেয়ার করুন: ' + window.location.href);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-[#063034] mb-6"><ArrowLeft size={18} /> প্রচ্ছদে ফিরে যান</Link>
      <span className="bg-[#063034] text-white px-3 py-1 rounded text-sm mb-4 inline-block">{item.category}</span>
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">{item.title}</h1>
      <div className="flex items-center gap-6 text-gray-500 mb-8 pb-6 border-b">
        <span className="flex items-center gap-2"><User size={16} /> {item.author}</span>
        <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(item.createdAt).toLocaleDateString('bn-BD')}</span>
        <button onClick={handleShare} className="ml-auto flex items-center gap-2 bg-[#063034] text-white px-4 py-2 rounded-lg font-bold"><Share2 size={18} /> শেয়ার</button>
      </div>
      <img src={item.imageUrl} className="w-full rounded-2xl shadow-lg mb-8" alt="" />
      <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed">{item.content}</div>
    </div>
  );
};

// 4. Admin Panel Component
const AdminPanel = ({ news, onAdd, onDelete }: { news: NewsItem[], onAdd: any, onDelete: any }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [pass, setPass] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: NewsCategory.NATIONAL, content: '', imageUrl: '', author: '' });
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<NewsItem | null>(null);

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (pass === ADMIN_PASSWORD) setIsAuth(true); else alert('ভুল পাসওয়ার্ড!');
  };

  const handleDownload = async (item: NewsItem) => {
    setActiveItem(item);
    setTimeout(async () => {
      if (cardRef.current) {
        // @ts-ignore
        const dataUrl = await window.htmlToImage.toPng(cardRef.current, { quality: 1, pixelRatio: 2 });
        const link = document.createElement('a');
        link.download = `sironam-${item.id}.png`;
        link.href = dataUrl;
        link.click();
        setActiveItem(null);
      }
    }, 200);
  };

  if (!isAuth) return (
    <div className="max-w-md mx-auto mt-20 p-10 bg-white rounded-3xl shadow-2xl border">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#063034]">এডমিন লগইন</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="password" placeholder="পাসওয়ার্ড" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#063034]" value={pass} onChange={e => setPass(e.target.value)} />
        <button className="w-full bg-[#063034] text-white p-3 rounded-xl font-bold">প্রবেশ করুন</button>
      </form>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-[#063034]"><LayoutDashboard /> এডমিন প্যানেল</h1>
        <div className="flex gap-2">
          <button onClick={() => setIsAdding(true)} className="bg-[#063034] text-white px-4 py-2 rounded-xl flex items-center gap-2"><Plus size={18} /> নতুন সংবাদ</button>
          <button onClick={() => setIsAuth(false)} className="text-red-500 p-2"><LogOut /></button>
        </div>
      </div>

      <div className="grid gap-4">
        {news.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-xl flex items-center justify-between shadow-sm border border-transparent hover:border-[#063034]/20">
            <div className="flex items-center gap-4">
              <img src={item.imageUrl} className="w-12 h-12 rounded-lg object-cover" alt="" />
              <div>
                <h4 className="font-bold text-gray-800 line-clamp-1">{item.title}</h4>
                <p className="text-xs text-gray-400">{item.category} • {new Date(item.createdAt).toLocaleDateString('bn-BD')}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleDownload(item)} className="p-2 text-[#063034] hover:bg-gray-100 rounded-full"><Download size={20} /></button>
              <button onClick={() => confirm('মুছে ফেলবেন?') && onDelete(item.id)} className="p-2 text-red-400 hover:text-red-600 rounded-full"><Trash2 size={20} /></button>
            </div>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-[#063034]">নতুন সংবাদ যোগ করুন</h2>
            <form onSubmit={e => {
              e.preventDefault();
              onAdd({ ...formData, id: Date.now().toString(), createdAt: Date.now() });
              setIsAdding(false);
              setFormData({ title: '', category: NewsCategory.NATIONAL, content: '', imageUrl: '', author: '' });
            }} className="space-y-4">
              <input required placeholder="শিরোনাম" className="w-full p-3 border rounded-xl" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <select className="p-3 border rounded-xl" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value as NewsCategory })}>
                  {Object.values(NewsCategory).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input required placeholder="প্রতিবেদক" className="w-full p-3 border rounded-xl" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} />
              </div>
              <input required placeholder="ছবির লিংক (URL)" className="w-full p-3 border rounded-xl" value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} />
              <textarea required placeholder="বিস্তারিত" rows={5} className="w-full p-3 border rounded-xl resize-none" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} />
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-3 border rounded-xl font-bold">বাতিল</button>
                <button type="submit" className="flex-1 py-3 bg-[#063034] text-white rounded-xl font-bold">আপলোড করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Social Card Template */}
      {activeItem && (
        <div className="fixed -left-[2000px]">
          <div ref={cardRef} className="w-[1080px] h-[1080px] bg-[#063034] flex flex-col relative overflow-hidden text-white p-20">
            <img src={activeItem.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#063034] via-[#063034]/60 to-transparent"></div>
            <div className="mt-auto relative z-10 space-y-8">
              <span className="bg-teal-500 px-6 py-2 rounded-full text-2xl font-bold">{activeItem.category}</span>
              <h2 className="text-7xl font-black leading-tight drop-shadow-xl">{activeItem.title}</h2>
              <div className="flex justify-between items-end border-t border-white/20 pt-10">
                <div>
                  <h1 className="text-6xl font-black tracking-tighter mb-2">{SITE_NAME}</h1>
                  <p className="text-xl text-teal-300">www.sironam.com</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold mb-1">{new Date(activeItem.createdAt).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <p className="text-xl italic text-white/70">প্রতিবেদক: {activeItem.author}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Controller
const App = () => {
  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('sironam_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  useEffect(() => {
    localStorage.setItem('sironam_news', JSON.stringify(news));
  }, [news]);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar news={news} />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
          <Routes>
            <Route path="/" element={<NewsPortal news={news} />} />
            <Route path="/news/:id" element={<NewsDetail news={news} />} />
            <Route path="/admin" element={<AdminPanel news={news} onAdd={(n: any) => setNews([n, ...news])} onDelete={(id: any) => setNews(news.filter(n => n.id !== id))} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="bg-[#063034] text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-black mb-4">{SITE_NAME}</h2>
            <p className="text-gray-400 mb-6">সঠিক সংবাদ, সবার আগে।</p>
            <div className="flex justify-center gap-6 mb-8 text-gray-400">
              <Facebook className="hover:text-white cursor-pointer" />
              <Twitter className="hover:text-white cursor-pointer" />
              <MessageCircle className="hover:text-white cursor-pointer" />
            </div>
            <div className="pt-8 border-t border-white/5 text-sm text-gray-500">
              © ২০২৫ {SITE_NAME} | <Link to="/admin" className="hover:text-white">এডমিন প্রবেশ</Link>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
