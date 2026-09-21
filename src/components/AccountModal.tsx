import React, { useState } from 'react';
import { X, Sparkles, Calendar, PackageCheck, UserCheck } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'styling' | 'orders'>('profile');
  const [stylingBooked, setStylingBooked] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#151515]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#F8F6F2] shadow-2xl border border-[#D8CEC1] p-6 sm:p-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#151515] hover:opacity-60 transition-opacity"
          aria-label="Close client services"
        >
          <X size={20} strokeWidth={1.3} />
        </button>

        {/* Title */}
        <div className="mb-6">
          <span className="text-[10px] tracking-[0.32em] uppercase text-[#B9A58C] font-sans block mb-1">
            CLIENT CONCIERGE
          </span>
          <h2 className="font-editorial text-3xl text-[#151515] font-normal tracking-[0.02em]">
            MAISON SÓ PRIVATE CLIENT
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#D8CEC1] mb-6 text-[10px] tracking-[0.2em] uppercase font-medium">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 mr-6 relative transition-colors ${activeTab === 'profile' ? 'text-[#151515]' : 'text-[#7A7570]'}`}
          >
            CLIENT PROFILE
            {activeTab === 'profile' && <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#151515]" />}
          </button>
          <button
            onClick={() => setActiveTab('styling')}
            className={`pb-3 mr-6 relative transition-colors ${activeTab === 'styling' ? 'text-[#151515]' : 'text-[#7A7570]'}`}
          >
            PRIVATE STYLING
            {activeTab === 'styling' && <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#151515]" />}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 relative transition-colors ${activeTab === 'orders' ? 'text-[#151515]' : 'text-[#7A7570]'}`}
          >
            ORDER TRACKING
            {activeTab === 'orders' && <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#151515]" />}
          </button>
        </div>

        {/* Content */}
        {activeTab === 'profile' && (
          <div className="space-y-4 text-xs text-[#4A4744]">
            <p className="font-light leading-relaxed">
              Sign in to manage your preferred delivery addresses, saved silhouette measurements, and bespoke atelier appointments.
            </p>
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#7A7570] mb-1">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  placeholder="client@luxury.com"
                  className="w-full bg-white/60 border border-[#D8CEC1] p-2.5 text-xs focus:outline-none focus:border-[#151515]"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#7A7570] mb-1">
                  PASSWORD
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/60 border border-[#D8CEC1] p-2.5 text-xs focus:outline-none focus:border-[#151515]"
                />
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-4 py-3.5 bg-[#151515] text-[#F8F6F2] text-[10px] tracking-[0.24em] uppercase font-medium hover:bg-[#333333] transition-colors"
            >
              SIGN IN TO PRIVATE CLIENT ACCOUNT
            </button>
          </div>
        )}

        {activeTab === 'styling' && (
          <div className="space-y-4 text-xs text-[#4A4744]">
            <div className="flex items-start space-x-3 p-3.5 bg-[#EFECE6] border-l-2 border-[#151515]">
              <Sparkles size={16} className="text-[#B9A58C] shrink-0 mt-0.5" />
              <p className="font-light">
                Our in-house stylists provide 1-on-1 virtual consultations for weddings, race days, and gala galas to ensure tailored fit.
              </p>
            </div>

            {stylingBooked ? (
              <div className="py-6 text-center text-xs text-[#151515] font-light">
                <span className="font-medium text-[11px] tracking-[0.16em] uppercase block mb-1">
                  APPOINTMENT REQUEST RECEIVED
                </span>
                Our head stylist will contact your email within 24 hours with private lookbook selections.
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setStylingBooked(true);
                }}
                className="space-y-3 pt-2"
              >
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#7A7570] mb-1">
                    UPCOMING OCCASION
                  </label>
                  <input
                    required
                    placeholder="e.g. Summer Garden Wedding / Galas"
                    className="w-full bg-white/60 border border-[#D8CEC1] p-2.5 text-xs focus:outline-none focus:border-[#151515]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#7A7570] mb-1">
                    PREFERRED DATE
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full bg-white/60 border border-[#D8CEC1] p-2.5 text-xs focus:outline-none focus:border-[#151515]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#151515] text-[#F8F6F2] text-[10px] tracking-[0.24em] uppercase font-medium hover:bg-[#333333] transition-colors"
                >
                  REQUEST APPOINTMENT
                </button>
              </form>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4 text-xs text-[#4A4744]">
            <p className="font-light">
              Enter your Atelier order confirmation number to view dispatch status, tracking links, and estimated delivery dates.
            </p>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-[#7A7570] mb-1">
                ORDER NUMBER (E.G. #SO-8924)
              </label>
              <input
                placeholder="#SO-••••"
                className="w-full bg-white/60 border border-[#D8CEC1] p-2.5 text-xs focus:outline-none focus:border-[#151515]"
              />
            </div>
            <button
              onClick={() => alert("All recent orders dispatched within 24-48 hours with DHL Express track and trace.")}
              className="w-full py-3.5 bg-[#151515] text-[#F8F6F2] text-[10px] tracking-[0.24em] uppercase font-medium hover:bg-[#333333] transition-colors"
            >
              TRACK SHIPMENT
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
