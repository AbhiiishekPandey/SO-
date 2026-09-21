import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenSizeGuide: () => void;
  onOpenAccount: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSizeGuide,
  onOpenAccount
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="footer" className="bg-[#151515] text-[#F8F6F2] pt-20 pb-12 px-6 md:px-14">
      <div className="max-w-7xl mx-auto">
        
        {/* Newsletter Section */}
        <div className="pb-16 mb-16 border-b border-[#2B2B2B]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-6">
              <span className="text-[10px] tracking-[0.32em] uppercase text-[#B9A58C] block mb-2 font-sans">
                PRIVATE MAILING LIST
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.02em] text-[#F8F6F2] mb-3">
                STAY CLOSE.
              </h3>
              <p className="text-xs sm:text-sm text-[#D8CEC1]/80 font-light max-w-md">
                Be the first to discover new styles, private edits and stories from SÓ.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="bg-[#242424] p-4 text-xs tracking-[0.16em] uppercase text-[#B9A58C] flex items-center space-x-3">
                  <Check size={16} />
                  <span>THANK YOU. YOU HAVE BEEN ADDED TO THE SÓ PRIVATE LIST.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex items-center border-b border-[#D8CEC1]/40 pb-2 focus-within:border-[#F8F6F2] transition-colors">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                    className="w-full bg-transparent text-xs tracking-[0.2em] uppercase text-[#F8F6F2] placeholder-[#7A7570] focus:outline-none py-1 font-light"
                  />
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    className="text-[#F8F6F2] hover:text-[#B9A58C] transition-colors p-1"
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Major Editorial Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20 text-[11px] tracking-[0.2em] uppercase">
          
          {/* Shop Column */}
          <div className="space-y-4">
            <span className="text-[#B9A58C] font-semibold block text-[10px] tracking-[0.28em]">
              COLLECTIONS
            </span>
            <ul className="space-y-3 font-light text-[#D8CEC1]/80">
              <li>
                <button onClick={() => onNavigate('new-edit')} className="hover:text-[#F8F6F2] transition-colors">
                  THE NEW EDIT
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collection')} className="hover:text-[#F8F6F2] transition-colors">
                  MIDI DRESSES
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collection')} className="hover:text-[#F8F6F2] transition-colors">
                  OCCASION & WEDDING
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collection')} className="hover:text-[#F8F6F2] transition-colors">
                  PRE-ORDER ARCHIVE
                </button>
              </li>
            </ul>
          </div>

          {/* Maison Column */}
          <div className="space-y-4">
            <span className="text-[#B9A58C] font-semibold block text-[10px] tracking-[0.28em]">
              MAISON SÓ
            </span>
            <ul className="space-y-3 font-light text-[#D8CEC1]/80">
              <li>
                <button onClick={() => onNavigate('editorial')} className="hover:text-[#F8F6F2] transition-colors">
                  THE ART OF DRESSING
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#F8F6F2] transition-colors">
                  ATELIER PHILOSOPHY
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#F8F6F2] transition-colors">
                  SUSTAINABLE FABRICS
                </button>
              </li>
              <li>
                <button onClick={onOpenAccount} className="hover:text-[#F8F6F2] transition-colors">
                  PRIVATE STYLING
                </button>
              </li>
            </ul>
          </div>

          {/* Client Care Column */}
          <div className="space-y-4">
            <span className="text-[#B9A58C] font-semibold block text-[10px] tracking-[0.28em]">
              CLIENT CARE
            </span>
            <ul className="space-y-3 font-light text-[#D8CEC1]/80">
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-[#F8F6F2] transition-colors">
                  SIZE & MEASURE GUIDE
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#F8F6F2] transition-colors">
                  COMPLIMENTARY SHIPPING
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#F8F6F2] transition-colors">
                  RETURNS & EXCHANGES
                </button>
              </li>
              <li>
                <button onClick={onOpenAccount} className="hover:text-[#F8F6F2] transition-colors">
                  ORDER TRACKING
                </button>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <span className="text-[#B9A58C] font-semibold block text-[10px] tracking-[0.28em]">
              PRESENCE
            </span>
            <ul className="space-y-3 font-light text-[#D8CEC1]/80">
              <li>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-[#F8F6F2] transition-colors"
                >
                  INSTAGRAM
                </a>
              </li>
              <li>
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-[#F8F6F2] transition-colors"
                >
                  TIKTOK
                </a>
              </li>
              <li>
                <a 
                  href="mailto:concierge@so-boutiques.com" 
                  className="hover:text-[#F8F6F2] transition-colors"
                >
                  ATELIER CONCIERGE
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Enormous SÓ Brand Wordmark */}
        <div className="py-12 border-t border-[#262626] text-center select-none overflow-hidden">
          <span className="font-editorial text-[16vw] sm:text-[14vw] md:text-[12vw] font-light text-[#F8F6F2]/12 leading-none block tracking-[0.06em]">
            SÓ BOUTIQUE
          </span>
        </div>

        {/* Bottom Legal & Rights */}
        <div className="pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#7A7570]">
          <p>&copy; {new Date().getFullYear()} SÓ BOUTIQUE. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <span>PRIVACY</span>
            <span>&bull;</span>
            <span>TERMS</span>
            <span>&bull;</span>
            <span>ACCESSIBILITY</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
