import React from 'react';
import { CAMPAIGN_CONTENT } from '../data/editorial';

export const EditorialStory: React.FC = () => {
  const { artOfDressing } = CAMPAIGN_CONTENT;

  return (
    <section id="editorial" className="py-24 md:py-36 px-6 md:px-14 bg-[#151515] text-[#F8F6F2] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Eyebrow & Main Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-20">
          <div className="lg:col-span-5">
            <span className="text-[10px] tracking-[0.34em] uppercase text-[#B9A58C] font-sans block mb-3">
              THE SÓ ESSAY
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.03em] leading-[0.95] text-[#F8F6F2]">
              THE ART<br />
              <span className="italic font-normal text-[#D8CEC1]">of</span><br />
              DRESSING.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pt-8">
            <p className="font-editorial text-xl sm:text-2xl md:text-3xl text-[#D8CEC1] font-light leading-relaxed mb-8">
              “{artOfDressing.statement}”
            </p>
            <div className="h-[1px] w-16 bg-[#B9A58C]/60 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {artOfDressing.pillars.map((pillar) => (
                <div key={pillar.number} className="space-y-2">
                  <span className="font-editorial text-xl text-[#B9A58C] block">
                    {pillar.number}
                  </span>
                  <h3 className="text-[11px] tracking-[0.24em] uppercase text-[#F8F6F2] font-medium">
                    {pillar.label}
                  </h3>
                  <p className="text-xs text-[#D8CEC1]/80 font-light leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dual Editorial Image Composition */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Large Atmospheric Image */}
          <div className="md:col-span-8 relative aspect-[16/10] overflow-hidden bg-[#262626]">
            <img
              src={artOfDressing.editorialImage}
              alt="Editorial movement and silhouette"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter saturate-[0.85] contrast-[1.08] hover:scale-[1.02] transition-transform duration-1000"
            />
            <div className="absolute bottom-6 left-6 text-[9px] tracking-[0.26em] uppercase text-[#F8F6F2] bg-[#151515]/70 px-3 py-1.5 backdrop-blur-sm">
              PLATE NO. 08 — MOVEMENT STUDY
            </div>
          </div>

          {/* Close-up Texture & Detail */}
          <div className="md:col-span-4 space-y-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#262626]">
              <img
                src={artOfDressing.detailImage}
                alt="Tactile fabric weave and drape"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter saturate-[0.8] contrast-[1.1] hover:scale-[1.02] transition-transform duration-1000"
              />
              <div className="absolute bottom-4 right-4 text-[9px] tracking-[0.22em] uppercase text-[#F8F6F2] bg-[#151515]/70 px-2.5 py-1 backdrop-blur-sm">
                TACTILE DRAPING
              </div>
            </div>

            <div className="p-4 border-l border-[#B9A58C]/40 text-xs text-[#D8CEC1]/80 font-light italic">
              Each piece is designed to inhabit movement—turning the wearer into the focal point of every room.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
