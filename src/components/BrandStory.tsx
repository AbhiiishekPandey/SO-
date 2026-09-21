import React from 'react';
import { CAMPAIGN_CONTENT } from '../data/editorial';

export const BrandStory: React.FC = () => {
  const { brandStory } = CAMPAIGN_CONTENT;

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-14 bg-[#F8F6F2] border-t border-b border-[#D8CEC1]/60">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Subtle Brand Origin */}
        <span className="text-[10px] tracking-[0.38em] uppercase text-[#B9A58C] font-sans block mb-4">
          THE SÓ PHILOSOPHY
        </span>

        {/* Large Editorial Headline */}
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.04em] text-[#151515] leading-tight mb-8">
          MADE FOR<br />
          <span className="italic font-light text-[#4A4744]">the moments</span><br />
          THAT MATTER.
        </h2>

        {/* Two concise, impactful paragraphs */}
        <div className="space-y-4 text-sm sm:text-base text-[#4A4744] font-light leading-relaxed max-w-2xl mx-auto mb-10">
          <p>{brandStory.copyPrimary}</p>
          <p className="text-xs sm:text-sm text-[#4A4744]/80">{brandStory.copySecondary}</p>
        </div>

        {/* Studio Marks */}
        <div className="pt-8 border-t border-[#D8CEC1]/50 flex items-center justify-center space-x-6 text-[10px] tracking-[0.3em] uppercase text-[#151515] font-sans font-medium">
          <span>DUBLIN</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B9A58C]" />
          <span>MILAN</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B9A58C]" />
          <span>PARIS</span>
        </div>

      </div>
    </section>
  );
};
