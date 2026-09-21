import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { CAMPAIGN_CONTENT } from '../data/editorial';

interface HeroCampaignProps {
  onShopClick: () => void;
  onExploreNewEdit: () => void;
}

export const HeroCampaign: React.FC<HeroCampaignProps> = ({
  onShopClick,
  onExploreNewEdit
}) => {
  return (
    <section 
      id="hero-campaign" 
      className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-end pt-28 pb-14 px-6 md:px-14 overflow-hidden bg-[#151515] text-[#F8F6F2]"
    >
      {/* Editorial Background Image with Cinematic Tone */}
      <div className="absolute inset-0 z-0">
        <img
          src={CAMPAIGN_CONTENT.hero.backgroundImage}
          alt="SÓ Boutique Haute Couture Editorial"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-65 filter saturate-[0.85] contrast-[1.05] transition-transform duration-1000 scale-[1.01]"
        />
        {/* Subtle Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151515]/70 via-transparent to-transparent hidden md:block" />
      </div>

      {/* Floating Haute Monogram watermark */}
      <div className="absolute top-36 right-8 md:right-16 z-10 pointer-events-none select-none hidden sm:block">
        <span className="font-editorial text-[90px] md:text-[160px] font-light text-[#F8F6F2]/10 leading-none">
          SÓ
        </span>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto md:mx-0 w-full">
        
        {/* Micro Season Indicator */}
        <div className="flex items-center space-x-3 mb-4 md:mb-6">
          <span className="h-[1px] w-8 bg-[#B9A58C]"></span>
          <span className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-[#B9A58C] font-sans font-light">
            EDITION 2026 / SILHOUETTE NO. 04
          </span>
        </div>

        {/* Major Editorial Headline */}
        <div className="space-y-1 mb-6 md:mb-8">
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.04em] text-[#F8F6F2] leading-[0.95]">
            <span className="block italic font-normal text-[#D8CEC1]">The New</span>
            <span className="block font-medium tracking-[0.06em]">FEMININE.</span>
          </h1>
        </div>

        {/* Restrained Supporting Text */}
        <p className="text-sm md:text-base text-[#D8CEC1]/90 max-w-md font-sans font-light leading-relaxed tracking-wide mb-8 md:mb-10">
          {CAMPAIGN_CONTENT.hero.tagline}
        </p>

        {/* Minimal CTAs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            id="hero-cta-shop"
            onClick={onShopClick}
            className="group relative inline-flex items-center justify-center bg-[#F8F6F2] text-[#151515] px-8 py-3.5 text-[11px] tracking-[0.24em] uppercase font-medium transition-all duration-300 hover:bg-[#D8CEC1] hover:text-[#151515]"
          >
            <span>SHOP THE EDIT</span>
            <ArrowRight size={14} className="ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            id="hero-cta-editorial"
            onClick={onExploreNewEdit}
            className="inline-flex items-center text-[11px] tracking-[0.22em] uppercase text-[#F8F6F2] hover:text-[#B9A58C] transition-colors py-2 group"
          >
            <span>VIEW CURATION</span>
            <span className="ml-2 w-4 h-[1px] bg-[#B9A58C] transition-all group-hover:w-7"></span>
          </button>
        </div>
      </div>

      {/* Bottom Scroll Indicator & Quiet Statement */}
      <div className="relative z-10 pt-12 mt-8 border-t border-[#F8F6F2]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#D8CEC1]/70">
        <div className="flex items-center space-x-6">
          <span>HAUTE READY-TO-WEAR</span>
          <span>&bull;</span>
          <span>LIMITED ATELIER PRODUCTION</span>
        </div>

        <button 
          onClick={onExploreNewEdit}
          className="mt-4 sm:mt-0 flex items-center space-x-2 text-[#F8F6F2]/80 hover:text-[#F8F6F2] transition-colors"
        >
          <span>EXPLORE</span>
          <ArrowDown size={12} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
};
