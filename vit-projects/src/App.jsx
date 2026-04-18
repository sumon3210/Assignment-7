import React, { useState } from 'react';

const KeenKeeperProApp = () => {
  const [activeTab, setActiveTab] = useState('home'); 
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [displayMessage, setDisplayMessage] = useState(""); 
  

  const [filter, setFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const friends = [
    { id: 1, name: 'David Kim', lastSeen: '62d ago', status: 'Almost Due', color: 'bg-[#FF9F43]', tags: ['WORK'], img: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Emma Wilson', lastSeen: '62d ago', status: 'Overdue', color: 'bg-[#FF4D4F]', tags: ['FAMILY'], img: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Lisa Nakamura', lastSeen: '62d ago', status: 'Overdue', color: 'bg-[#FF4D4F]', tags: ['WORK'], img: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: 'James Wright', lastSeen: '62d ago', status: 'Overdue', color: 'bg-[#FF4D4F]', tags: ['HOBBY', 'TRAVEL'], img: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, name: 'David Kim', lastSeen: '62d ago', status: 'Almost Due', color: 'bg-[#FF9F43]', tags: ['WORK'], img: 'https://i.pravatar.cc/150?u=1' },
    { id: 6, name: 'Emma Wilson', lastSeen: '62d ago', status: 'Overdue', color: 'bg-[#FF4D4F]', tags: ['FAMILY'], img: 'https://i.pravatar.cc/150?u=2' },
    { id: 7, name: 'Lisa Nakamura', lastSeen: '62d ago', status: 'Overdue', color: 'bg-[#FF4D4F]', tags: ['WORK'], img: 'https://i.pravatar.cc/150?u=3' },
    { id: 8, name: 'James Wright', lastSeen: '62d ago', status: 'Overdue', color: 'bg-[#FF4D4F]', tags: ['HOBBY', 'TRAVEL'], img: 'https://i.pravatar.cc/150?u=4' },
  ];

  const trackInteraction = (type) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const icons = { Call: '📞', Text: '💬', Video: '🎥' };
    
    const newEvent = {
      type: type,
      with: selectedFriend.name,
      date: formattedDate,
      icon: icons[type]
    };

    setTimelineEvents([newEvent, ...timelineEvents]);
    setDisplayMessage(`✅${type} With ${selectedFriend.name}!`);
    setTimeout(() => setDisplayMessage(""), 3000);
  };

  const totalInteractions = timelineEvents.length;
  const countType = (type) => timelineEvents.filter(ev => ev.type === type).length;
  
  
  const textCount = countType('Text');
  const callCount = countType('Call');
  const videoCount = countType('Video');


  const textPerc = totalInteractions > 0 ? (textCount / totalInteractions) * 100 : 0;
  const callPerc = totalInteractions > 0 ? (callCount / totalInteractions) * 100 : 0;
  const videoPerc = totalInteractions > 0 ? (videoCount / totalInteractions) * 100 : 0;

  
const filteredEvents =
  filter === "All"
    ? timelineEvents
    : timelineEvents.filter(ev => ev.type === filter);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col text-[#1A2B3B] relative">
      
      {displayMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-500">
          <div className="bg-[#1E3F31] text-white px-8 py-4 rounded-2xl shadow-2xl font-black text-sm md:text-base whitespace-nowrap border-2 border-[#42995D] animate-bounce">
            {displayMessage}
          </div>
        </div>
      )}

      {/* --- NAVBAR --- */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 md:px-10 py-5 max-w-7xl mx-auto">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl focus:outline-none p-1">
            {isMenuOpen ? '✕' : '☰'} 
          </button>
          <h1 className="text-xl font-bold text-[#1E3F31] cursor-pointer" onClick={() => {setSelectedFriend(null); setActiveTab('home'); setIsMenuOpen(false);}}>
            KeenKeeper
          </h1>
          <div className="hidden md:flex gap-4 text-sm font-semibold">
            <button onClick={() => {setSelectedFriend(null); setActiveTab('home');}} className={`px-4 py-2 rounded-lg ${activeTab === 'home' ? 'bg-[#1E3F31] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Home</button>
            <button onClick={() => setActiveTab('timeline')} className={`px-4 py-2 rounded-lg ${activeTab === 'timeline' ? 'bg-[#1E3F31] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Timeline</button>
            <button onClick={() => setActiveTab('stats')} className={`px-4 py-2 rounded-lg ${activeTab === 'stats' ? 'bg-[#1E3F31] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Stats</button>
          </div>
          <div className="md:hidden w-8"></div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl px-6 py-4 flex flex-col gap-2">
            <button onClick={() => {setSelectedFriend(null); setActiveTab('home'); setIsMenuOpen(false);}} className={`text-left px-4 py-3 rounded-xl font-bold ${activeTab === 'home' ? 'bg-[#E6F7F0] text-[#1E3F31]' : 'text-gray-600'}`}>Home</button>
            <button onClick={() => {setActiveTab('timeline'); setIsMenuOpen(false);}} className={`text-left px-4 py-3 rounded-xl font-bold ${activeTab === 'timeline' ? 'bg-[#E6F7F0] text-[#1E3F31]' : 'text-gray-600'}`}>Timeline</button>
            <button onClick={() => {setActiveTab('stats'); setIsMenuOpen(false);}} className={`text-left px-4 py-3 rounded-xl font-bold ${activeTab === 'stats' ? 'bg-[#E6F7F0] text-[#1E3F31]' : 'text-gray-600'}`}>Stats</button>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {/* --- TIMELINE PAGE --- */}
        {activeTab === 'timeline' && (
          <div className="max-w-4xl mx-auto py-8 md:py-12 px-6">
            <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tighter">Timeline</h2>
            
            {/* --- NEW FILTER DROPDOWN (Based on Image) --- */}
            <div className="relative mb-10 w-full max-w-md">
              <div 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full bg-white border-2 border-gray-800 rounded-xl p-4 flex justify-between items-center cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
              >
                <span className="font-bold text-gray-800">{filter}</span>
                <span className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}>▼</span>
              </div>

              {isFilterOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white border-2 border-gray-800 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 overflow-hidden">
                  <div className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Filter timeline</div>
                  {['All', 'Text', 'Call', 'Video'].map((option) => (
                    <div 
                      key={option}
                      onClick={() => { setFilter(option); setIsFilterOpen(false); }}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer font-bold text-gray-700 flex items-center gap-2"
                    >
                      {filter === option && <span className="text-green-600">✓</span>}
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {filteredEvents.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium">No {filter} interactions recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((ev, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-xl">{ev.icon}</div>
                    <div>
                      <p className="font-bold text-gray-800">{ev.type} with <span className="text-[#1E3F31]">{ev.with}</span></p>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">{ev.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- STATS PAGE --- */}
        {activeTab === 'stats' && (
          <div className="w-full">
            {totalInteractions > 0 && (
              <div className="max-w-4xl mx-auto py-12 md:py-16 px-6">
                <h2 className="text-3xl md:text-4xl font-black mb-10 tracking-tighter text-[#1A2B3B]">Friendship Analytics</h2>
                <div className="bg-white p-8 md:p-12 rounded-[32px] border border-gray-100 shadow-sm">
                  <p className="text-xs font-bold text-gray-400 mb-12 uppercase tracking-widest text-center">By Interaction Type</p>
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-56 h-56 md:w-64 md:h-64 rounded-full relative flex items-center justify-center"
                      style={{ background: `conic-gradient(#A171F8 0% ${textPerc}%, #22553F ${textPerc}% ${textPerc + callPerc}%, #42995D ${textPerc + callPerc}% 100%)` }}
                    >
                      <div className="w-[80%] h-[80%] bg-white rounded-full flex items-center justify-center shadow-inner">
                        <p className="text-4xl md:text-5xl font-black text-[#1E3F31]">{totalInteractions}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-14 text-[11px] font-black uppercase tracking-widest text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <span className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#A171F8]"></div> Text</span>
                        <span className="text-lg text-[#1A2B3B]">{textCount}</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <span className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#22553F]"></div> Call</span>
                        <span className="text-lg text-[#1A2B3B]">{callCount}</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <span className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#42995D]"></div> Video</span>
                        <span className="text-lg text-[#1A2B3B]">{videoCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- HOME PAGE --- */}
        {activeTab === 'home' && !selectedFriend && (
          <>
            <header className="bg-[#E6F7F0] py-16 md:py-20 text-center border-b border-gray-50 px-6">
              <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">Friends to keep close in your life</h1>
              <p className="text-gray-400 max-w-xl mx-auto text-base mb-10 leading-relaxed">Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.</p>
              <button className="bg-[#1E3F31] text-white px-10 py-3.5 rounded-lg shadow-xl font-bold text-sm hover:scale-105 transition-transform">+ Add a Friend</button>
            </header>
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 px-6 -mt-10 mb-16">
              {[{l:'Total Friends', v:'10'}, {l:'On Track', v:'3'}, {l:'Need Attention', v:'6'}, {l:'Interactions', v: totalInteractions}].map((s, i) => (
                <div key={i} className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
                  <div className="text-2xl md:text-3xl font-black text-[#1E3F31]">{s.v}</div>
                  <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="max-w-6xl mx-auto px-6 mb-24">
              <h2 className="text-xl font-black mb-8 px-2">Your Friends</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {friends.map((f, index) => (
                  <div key={index} onClick={() => setSelectedFriend(f)} className="bg-white p-9 md:p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl cursor-pointer transition-all flex flex-col items-center text-center group">
                    <img src={f.img} alt={f.name} className="w-24 h-24 rounded-full mb-5 object-cover border-4 border-gray-50 group-hover:border-[#E6F7F0]" />
                    <h4 className="font-black text-xl text-gray-800">{f.name}</h4>
                    <p className="text-[11px] text-gray-300 font-bold mb-5">{f.lastSeen}</p>
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {f.tags.map(t => <span key={t} className="bg-[#E6F7F0] text-[#1E3F31] text-[9px] font-black px-2.5 py-1 rounded uppercase">{t}</span>)}
                    </div>
                    <span className={`${f.color} text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest`}>{f.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* --- DETAIL VIEW --- */}
        {activeTab === 'home' && selectedFriend && (
          <div className="max-w-7xl mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6">
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-white p-10 md:p-12 rounded-[40px] border border-gray-100 shadow-sm text-center">
                <img src={selectedFriend.img} alt={selectedFriend.name} className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-gray-50 shadow-lg" />
                <h3 className="text-3xl font-black">{selectedFriend.name}</h3>
                <div className="flex flex-col gap-2 items-center mt-4">
                  <span className={`${selectedFriend.color} text-white text-[10px] px-6 py-2 rounded-lg font-black tracking-widest uppercase`}>{selectedFriend.status}</span>
                  <span className="bg-[#E6F7F0] text-[#1E3F31] text-[10px] font-black px-6 py-2 rounded-lg uppercase">FAMILY</span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <button className="w-full bg-white py-4 rounded-2xl border border-gray-100 text-xs font-black text-gray-600">⏰ Snooze 2 Weeks</button>
                <button className="w-full bg-white py-4 rounded-2xl border border-gray-100 text-xs font-black text-gray-600">📁 Archive</button>
                <button onClick={() => setSelectedFriend(null)} className="w-full bg-white py-4 rounded-2xl border border-red-50 text-xs font-black text-red-500 shadow-sm hover:bg-red-50">🗑️ Delete</button>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {[{v:'62',l:'Days Since Contact'}, {v:'30',l:'Goal (Days)'}, {v:'Feb 27, 2026',l:'Next Due'}].map((item, i) => (
                  <div key={i} className="bg-white p-8 md:p-10 rounded-[32px] border border-gray-100 shadow-sm text-center">
                    <div className="text-3xl md:text-2xl font-black">{item.v}</div>
                    <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-3">{item.l}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white p-6 md:p-7 rounded-[32px] border border-gray-100 shadow-sm">
                <p className="font-black mb-8 uppercase text-sm tracking-widest">Quick Check-in</p>
                <div className="grid grid-cols-3 gap-4 md:gap-8">
                  {['Call', 'Text', 'Video'].map((type) => (
                    <button key={type} onClick={() => trackInteraction(type)} className="bg-[#F8FAFC] py-8 md:py-10 rounded-3xl flex flex-col items-center gap-4 border border-transparent hover:border-gray-200 transition-all shadow-sm">
                      <span className="text-2xl md:text-2xl">{type === 'Call' ? '📞' : type === 'Text' ? '💬' : '🎥'}</span>
                      <span className="text-[11px] font-black text-gray-500 uppercase">{type}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- FOOTER --- */}
      <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
        </aside>
      </footer>
    </div>
  );
};

export default KeenKeeperProApp;