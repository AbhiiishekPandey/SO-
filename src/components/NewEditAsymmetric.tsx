import React from 'react';
import { ArrowRight, Eye, Heart } from 'lucide-react';
import { Product } from '../types';

interface NewEditAsymmetricProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: number) => boolean;
  onViewAllMidi: () => void;
}

export const NewEditAsymmetric: React.FC<NewEditAsymmetricProps> = ({
  products,
  onSelectProduct,
  onQuickView,
  onToggleWishlist,
  isWishlisted,
  onViewAllMidi
}) => {
  // Let's pick 3 curated pieces: 1 hero featured piece (e.g. Ellie or Lara), and 2 side pieces (e.g. Lola and Susie)
  const featuredProduct = products.find(p => p.handle === 'ellie-midi-dress') || products[0];
  const sideProductA = products.find(p => p.handle === 'pre-order-lara-midi-dress') || products[2];
  const sideProductB = products.find(p => p.handle === 'untitled-25jun_11-50-28') || products[4];

  return (
    <section id="new-edit" className="py-20 md:py-28 px-6 md:px-14 bg-[#F8F6F2] border-b border-[#D8CEC1]/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 pb-6 border-b border-[#D8CEC1]/60">
          <div>
            <span className="text-[10px] tracking-[0.32em] uppercase text-[#B9A58C] font-sans block mb-2">
              VOL. IV — CURATED RELEASE
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.03em] text-[#151515] leading-tight">
              THE NEW EDIT
            </h2>
          </div>

          <div className="mt-4 md:mt-0 max-w-sm">
            <p className="text-xs md:text-sm text-[#4A4744] font-light leading-relaxed">
              A deliberate balance of architectural structure and fluid movement. 
              Sculpted waists, cascading hemlines, and tactile silks created for singular moments.
            </p>
          </div>
        </div>

        {/* Asymmetric Composition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Large Primary Featured Product (7 Cols) */}
          <div className="lg:col-span-7 group">
            <div className="relative aspect-[3/4] bg-[#EFECE6] overflow-hidden">
              <img
                src={featuredProduct.images[0]}
                alt={featuredProduct.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top filter contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              {/* Minimalist Floating Label */}
              <div className="absolute top-5 left-5 bg-[#151515] text-[#F8F6F2] text-[9px] tracking-[0.24em] uppercase px-3 py-1.5 font-medium">
                KEYNOTE SILHOUETTE
              </div>

              {/* Floating Quick Action Overlay */}
              <div className="absolute inset-0 bg-[#151515]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6 pointer-events-none">
                <div className="pointer-events-auto flex items-center space-x-3">
                  <button
                    onClick={() => onQuickView(featuredProduct)}
                    className="bg-[#F8F6F2] text-[#151515] text-[10px] tracking-[0.18em] uppercase px-4 py-2.5 font-medium hover:bg-[#151515] hover:text-[#F8F6F2] transition-colors flex items-center space-x-1.5"
                  >
                    <Eye size={13} />
                    <span>QUICK VIEW</span>
                  </button>
                  <button
                    onClick={() => onToggleWishlist(featuredProduct)}
                    className={`p-2.5 transition-colors ${
                      isWishlisted(featuredProduct.id) 
                        ? 'bg-[#151515] text-[#F8F6F2]' 
                        : 'bg-[#F8F6F2] text-[#151515] hover:bg-[#151515] hover:text-[#F8F6F2]'
                    }`}
                    aria-label="Save to wishlist"
                  >
                    <Heart size={14} fill={isWishlisted(featuredProduct.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <button
                  onClick={() => onSelectProduct(featuredProduct)}
                  className="pointer-events-auto bg-[#151515] text-[#F8F6F2] text-[10px] tracking-[0.2em] uppercase px-4 py-2.5 hover:bg-[#4A4744] transition-colors"
                >
                  VIEW PIECE
                </button>
              </div>
            </div>

            {/* Product Metadata */}
            <div className="mt-5 flex items-start justify-between">
              <div>
                <button
                  onClick={() => onSelectProduct(featuredProduct)}
                  className="text-left font-editorial text-2xl md:text-3xl text-[#151515] hover:text-[#4A4744] transition-colors tracking-[0.02em]"
                >
                  {featuredProduct.title}
                </button>
                <p className="text-xs text-[#4A4744] font-light mt-1">
                  {featuredProduct.subtitle}
                </p>
              </div>
              <span className="font-sans text-base font-normal tracking-wide text-[#151515]">
                €{featuredProduct.price} EUR
              </span>
            </div>
          </div>

          {/* Asymmetric Side Column with Editorial Vignette & Supporting Piece (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-10 lg:space-y-12">
            
            {/* Editorial Quote & Atelier Note */}
            <div className="bg-[#EFECE6]/80 p-8 border border-[#D8CEC1]/60">
              <span className="font-editorial text-5xl text-[#B9A58C] leading-none block -mb-4 select-none">“</span>
              <p className="font-editorial text-xl md:text-2xl text-[#151515] italic font-light leading-relaxed">
                Luxury is not about excess. It is the poise found when every proportion is exact.
              </p>
              <div className="mt-4 pt-4 border-t border-[#D8CEC1]/50 flex items-center justify-between text-[9px] tracking-[0.26em] uppercase text-[#4A4744]">
                <span>SÓ EDITORIAL NOTES</span>
                <span>LIMITED RUN</span>
              </div>
            </div>

            {/* Supporting Product Item 1 */}
            <div className="group">
              <div className="relative aspect-[3/4] bg-[#EFECE6] overflow-hidden">
                <img
                  src={sideProductA.images[0]}
                  alt={sideProductA.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {sideProductA.isPreOrder && (
                  <div className="absolute top-4 left-4 bg-[#B9A58C] text-[#151515] text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 font-medium">
                    PRE-ORDER
                  </div>
                )}

                <div className="absolute inset-0 bg-[#151515]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 pointer-events-none">
                  <button
                    onClick={() => onQuickView(sideProductA)}
                    className="pointer-events-auto bg-[#F8F6F2] text-[#151515] text-[9px] tracking-[0.16em] uppercase px-3 py-2 hover:bg-[#151515] hover:text-[#F8F6F2] transition-colors"
                  >
                    QUICK VIEW
                  </button>
                  <button
                    onClick={() => onSelectProduct(sideProductA)}
                    className="pointer-events-auto bg-[#151515] text-[#F8F6F2] text-[9px] tracking-[0.16em] uppercase px-3 py-2"
                  >
                    DISCOVER
                  </button>
                </div>
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <button
                  onClick={() => onSelectProduct(sideProductA)}
                  className="text-left font-editorial text-lg text-[#151515] hover:text-[#4A4744] transition-colors"
                >
                  {sideProductA.title}
                </button>
                <span className="text-xs font-sans text-[#151515]">
                  €{sideProductA.price} EUR
                </span>
              </div>
            </div>

            {/* CTA to complete collection */}
            <div className="pt-2">
              <button
                id="view-all-midi-btn"
                onClick={onViewAllMidi}
                className="w-full py-4 border border-[#151515] text-[11px] tracking-[0.24em] uppercase text-[#151515] font-medium hover:bg-[#151515] hover:text-[#F8F6F2] transition-all duration-300 flex items-center justify-center space-x-3 group"
              >
                <span>EXPLORE ALL 8 MIDI PIECES</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
