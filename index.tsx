import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Heart, Music, Check, X, Gift, Calendar, HeartCrack, ChevronDown, Sparkles } from 'lucide-react';

// ==========================================
// 1. TYPES
// ==========================================

export interface ApologyData {
  partnerName: string;
  yourName: string;
  incident: string;
  relationshipDuration: string;
  tone: ApologyTone;
}

export enum ApologyTone {
  SINCERE = 'Sincere & Deep',
  ROMANTIC = 'Romantic & Poetic',
  LIGHTHEARTED = 'Lighthearted & Cute',
}

export interface GeneratedContent {
  headline: string;
  letter: string;
  poem: string;
  apologyReasons: {
    reason: string;
    explanation: string;
  }[];
  dateIdeas: {
    title: string;
    description: string;
  }[];
}

// ==========================================
// 2. APOLOGY PAGE COMPONENT
// ==========================================

interface ApologyPageProps {
  data: ApologyData;
  content: GeneratedContent;
}

const ApologyPage: React.FC<ApologyPageProps> = ({ data, content }) => {
  const [forgiven, setForgiven] = useState<boolean | null>(null);
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);

  const moveNoButton = () => {
    // Make it harder to click "No"
    const newX = (Math.random() - 0.5) * 200;
    const newY = (Math.random() - 0.5) * 200;
    setNoBtnPosition({ x: newX, y: newY });
    setAttempts(prev => prev + 1);
  };

  if (forgiven) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center space-y-8 animate-fade-in relative overflow-hidden bg-rose-50">
         <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
             {/* Enhanced Confetti */}
             {[...Array(30)].map((_, i) => (
                 <div key={i} className="absolute animate-float text-rose-400 opacity-60" 
                      style={{ 
                          left: `${Math.random() * 100}%`, 
                          top: `${Math.random() * 100}%`,
                          fontSize: `${Math.random() * 2 + 1}rem`,
                          animationDelay: `${Math.random() * 5}s`,
                          animationDuration: `${Math.random() * 5 + 5}s`
                      }}>
                     {i % 3 === 0 ? '❤️' : i % 3 === 1 ? '✨' : '🌸'}
                 </div>
             ))}
         </div>

        <div className="z-10 bg-white/80 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border-4 border-rose-200 max-w-lg mx-auto transform hover:scale-105 transition-transform duration-500 animate-slide-up">
            <div className="relative">
              <Heart className="w-32 h-32 text-rose-500 fill-rose-500 mx-auto mb-6 animate-pulse-slow" />
              <Sparkles className="absolute top-0 right-1/3 w-8 h-8 text-yellow-400 animate-bounce-subtle" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-4">
              Thank You!
            </h1>
            <p className="text-xl text-slate-600 mb-8 font-serif italic">
              "My heart is whole again because of you."
            </p>
            <div className="text-rose-600 font-medium tracking-wide">
                I promise to cherish this second chance.
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-200/40 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-pink-200/40 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-white/40 rounded-full blur-[80px]" />
      </div>

      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 bg-gradient-to-b from-rose-50/90 to-transparent pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 text-rose-900/80">
          <Heart className="w-5 h-5 fill-rose-300 text-rose-400" />
          <span className="font-serif font-bold tracking-widest text-sm uppercase">Mend My Heart</span>
        </div>
      </nav>

      <main className="relative z-10 pt-24 pb-20 px-4 max-w-4xl mx-auto space-y-32">
        
        {/* Hero Section */}
        <section className="text-center space-y-8 animate-fade-in min-h-[80vh] flex flex-col justify-center items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-rose-100/80 backdrop-blur-sm border border-rose-200 text-rose-600 font-serif tracking-widest uppercase text-xs font-bold shadow-sm">
              For {data.partnerName}
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-slate-900 leading-[1.1] drop-shadow-sm">
                {content.headline}
            </h1>
          </div>
          
          <div className="w-1 h-24 bg-gradient-to-b from-rose-400 to-transparent mx-auto rounded-full opacity-50"></div>

          <div className="max-w-xl mx-auto bg-white/60 backdrop-blur-md p-10 rounded-2xl shadow-lg border border-white/50 rotate-1 transform hover:rotate-0 transition-transform duration-500 hover:shadow-xl hover:bg-white/80">
             <div className="font-serif text-2xl md:text-3xl text-rose-500 mb-2 italic">
                "{content.poem}"
             </div>
          </div>
          
          <div className="absolute bottom-10 animate-bounce-subtle opacity-50">
            <ChevronDown className="w-8 h-8 text-rose-400" />
          </div>
        </section>

        {/* The Apology Letter */}
        <section className="group">
            <div className="bg-white/70 backdrop-blur-xl p-8 md:p-16 rounded-[2.5rem] shadow-xl border border-white/60 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:bg-white/80">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-200 via-rose-400 to-rose-200 opacity-50"></div>
                
                <div className="flex items-center gap-4 mb-10">
                    <span className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-serif font-bold text-lg shadow-inner">1</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800">My Apology</h2>
                </div>

                <div className="prose prose-lg prose-rose text-slate-600 leading-relaxed font-serif whitespace-pre-wrap first-letter:text-5xl first-letter:font-bold first-letter:text-rose-400 first-letter:mr-2 first-letter:float-left">
                    {content.letter}
                </div>
                
                <div className="mt-16 flex items-center gap-6 opacity-80">
                    <div className="h-px bg-rose-200 flex-1"></div>
                    <div className="font-serif italic text-xl text-slate-800">With love, <span className="text-rose-500 font-semibold">{data.yourName}</span></div>
                </div>
            </div>
        </section>

        {/* Why I'm Sorry (Reasons) Section */}
        {content.apologyReasons && content.apologyReasons.length > 0 && (
          <section className="space-y-12">
              <div className="text-center">
                <span className="inline-block w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-serif font-bold text-xl shadow-sm mb-4 mx-auto">2</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800">Reflecting on my mistakes</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {content.apologyReasons.map((item, idx) => (
                  <div key={idx} className="bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-white/50 hover:bg-white/80 hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-md">
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-400 shadow-inner">
                        <HeartCrack className="w-6 h-6" />
                      </div>
                    </div>
                    <h3 className="font-serif font-bold text-xl text-slate-800 mb-3">{item.reason}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
          </section>
        )}

        {/* Memory Lane / Peace Offerings */}
        <section className="space-y-12">
            <div className="text-center">
                <span className="inline-block w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-serif font-bold text-xl shadow-sm mb-4 mx-auto">3</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800">Let me make it up to you</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.dateIdeas.map((idea, idx) => (
                    <div key={idx} className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-rose-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-400 mb-6 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300 shadow-sm group-hover:shadow-rose-200/50 group-hover:shadow-lg">
                            {idx === 0 ? <Gift className="w-7 h-7"/> : idx === 1 ? <Calendar className="w-7 h-7"/> : <Music className="w-7 h-7"/>}
                        </div>
                        <h3 className="font-bold text-lg text-slate-800 mb-3 font-serif">{idea.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{idea.description}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* The Big Question */}
        <section className="pt-20 pb-32 text-center space-y-10">
            <h2 className="text-5xl font-serif text-slate-800 font-medium">Will you forgive me?</h2>
            
            <div className="relative h-32 flex justify-center items-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 z-10">
                    <button 
                        onClick={() => setForgiven(true)}
                        className="bg-slate-900 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-slate-800 hover:scale-110 active:scale-95 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-3 group"
                    >
                        <Check className="w-6 h-6 group-hover:animate-bounce-subtle" />
                        Yes, I forgive you
                    </button>
                    
                    <div 
                      className="transition-all duration-300 ease-out"
                      style={{ 
                        transform: `translate(${noBtnPosition.x}px, ${noBtnPosition.y}px)`,
                        position: attempts > 0 ? 'absolute' : 'relative'
                      }}
                    >
                        <button 
                            onMouseEnter={moveNoButton}
                            onClick={moveNoButton}
                            className="bg-white/50 backdrop-blur-sm text-slate-400 px-12 py-5 rounded-full font-medium text-lg border border-slate-200 hover:border-rose-200 hover:text-rose-400 transition-colors flex items-center gap-3 shadow-sm"
                        >
                            <X className="w-6 h-6" />
                            {attempts > 3 ? "Pretty please?" : "Not yet"}
                        </button>
                    </div>
                </div>
            </div>
            
            <p className="text-sm text-rose-300/80 uppercase tracking-widest font-bold">
                (I promise to do better)
            </p>
        </section>

      </main>
    </div>
  );
};

// ==========================================
// 3. MAIN APP & DATA
// ==========================================

const DEDICATED_DATA: ApologyData = {
  partnerName: "My Lovey", // Change to their name
  yourName: "Yours Truly", // Change to your name
  incident: "making you worry", // Brief summary
  relationshipDuration: "forever",
  tone: ApologyTone.SINCERE,
};

const DEDICATED_CONTENT: GeneratedContent = {
  headline: "I'm sorry, and I love you.",
  poem: "In shadows cast by my mistake,\nI see the light I helped to break.\nBut in your eyes, I hope to find,\nA love that leaves the hurt behind.",
  letter: `I am writing or making this because I do really whole heartedly want to apologize for what happened last night, I really thought or I really remember na last time is you allowed me as long as malapit lang po ganyan. I know I messed up. I know I caused you pain, caused you disturbance and delay on reviewing, and for that, I am infinitely sorry.

You deserve to be treated with nothing but gentleness and love and care, and I failed to give you that. It wasn't my intention to hurt you, but I know that intentions don't cancel out impact. I want you to know that I see your pain, I validate it, and I am committed to healing the wound I caused and to making up to it.

Please take all the time you need. I am here, waiting, ready to do the work to earn back your love and your smile. You are my world and you are my everything.`,
  apologyReasons: [
    {
      reason: "I didn't ask",
      explanation: "I should've cleared it up to you first before going on what i remember and not making the decision already"
    },
    {
      reason: "I made you tired",
      explanation: "I know this thing has happened before that's why you got sick and tired"
    }
  ],
  dateIdeas: [
    {
      title: "Church Date",
      description: "A revisit to the place where we went on our first church date in the Sunken Shrine of Our Lady of Lourdes"
    },
    {
      title: "Home Date with Home Cooked Meal",
      description: "We'll go home to our place and I'll prepare your favorite food and we can just relax and enjoy."
    },
    {
      title: "Eat Out",
      description: "Let's eat outside and enjoy food po together, Like for example a resto then some TFTG afterwards?."
    }
  ]
};

const App: React.FC = () => {
  
  useEffect(() => {
    document.title = `For ${DEDICATED_DATA.partnerName} ❤️`;
  }, []);

  return (
    <div className="min-h-screen font-sans bg-rose-50 selection:bg-rose-200 selection:text-rose-800">
        <ApologyPage 
          data={DEDICATED_DATA} 
          content={DEDICATED_CONTENT} 
        />
    </div>
  );
};

// ==========================================
// 4. RENDER
// ==========================================

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
