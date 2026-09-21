import React, { useState, useEffect } from 'react';
import { X, Heart, ChevronDown, ChevronUp, Check, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: number) => boolean;
  onOpenSizeGuide: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onOpenSizeGuide
}) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('fit');
  const [addedNotice, setAddedNotice] = useState(false);

  // Set default size to first available
  useEffect(() => {
    if (!product) return;
    setSelectedImageIdx(0);
    setQuantity(1);
    const firstAvail = product.sizes.find(s => s.available);
    if (firstAvail) {
      setSelectedSize(firstAvail.size);
    } else {
      setSelectedSize(product.sizes[0]?.size || '');
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart(product, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-8 bg-[#151515]/75 backdrop-blur-md overflow-y-auto">
      {/* Modal Container */}
      <div 
        id="product-detail-modal"
        className="relative w-full max-w-6xl bg-[#F8F6F2] shadow-2xl border border-[#D8CEC1]/80 min-h-screen sm:min-h-0 my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-300"
      >
        {/* Top Minimal Close Bar */}
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-3">
          <button
            onClick={() => onToggleWishlist(product)}
            className="p-2.5 rounded-full bg-[#F8F6F2]/90 hover:bg-[#151515] text-[#151515] hover:text-[#F8F6F2] transition-colors border border-[#D8CEC1]"
            aria-label="Wishlist"
          >
            <Heart size={16} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#F8F6F2]/90 hover:bg-[#151515] text-[#151515] hover:text-[#F8F6F2] transition-colors border border-[#D8CEC1]"
            aria-label="Close modal"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* 2-Column Luxury Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[750px]">
          
          {/* Left: Large Product Imagery & Thumbnails (7 Cols) */}
          <div className="lg:col-span-7 bg-[#EFECE6] p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#D8CEC1]/70">
            {/* Primary Big Image */}
            <div className="relative aspect-[3/4] max-h-[620px] w-full overflow-hidden mx-auto bg-[#EFECE6]">
              <img
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top filter contrast-[1.03]"
              />

              {product.isPreOrder && (
                <div className="absolute top-4 left-4 bg-[#151515] text-[#F8F6F2] text-[9px] tracking-[0.22em] uppercase px-3 py-1.5 font-medium">
                  PRE-ORDER ITEM
                </div>
              )}
            </div>

            {/* Image Thumbnails if multiple exist */}
            {product.images.length > 1 && (
              <div className="mt-4 flex items-center justify-center space-x-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-14 h-18 border transition-all overflow-hidden ${
                      selectedImageIdx === idx 
                        ? 'border-[#151515] scale-105' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} view ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Editorial Information (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto">
            
            <div className="space-y-6">
              {/* Category Breadcrumb / Micro label */}
              <div className="flex items-center space-x-2 text-[10px] tracking-[0.28em] uppercase text-[#B9A58C]">
                <span>SÓ MIDI COLLECTION</span>
                <span>/</span>
                <span>SILHOUETTE</span>
              </div>

              {/* Title & Price */}
              <div>
                <h1 className="font-editorial text-3xl sm:text-4xl text-[#151515] font-normal tracking-[0.02em] leading-tight">
                  {product.title}
                </h1>
                <p className="text-xs text-[#4A4744] font-light mt-1">
                  {product.subtitle}
                </p>
                <div className="mt-3 flex items-baseline space-x-3">
                  <span className="font-sans text-xl font-normal text-[#151515] tracking-wide">
                    €{product.price} EUR
                  </span>
                  <span className="text-[10px] tracking-[0.16em] uppercase text-[#7A7570]">
                    VAT INCLUDED
                  </span>
                </div>
              </div>

              {/* Minimal Description */}
              <p className="text-xs sm:text-sm text-[#4A4744] font-light leading-relaxed">
                {product.description}
              </p>

              {/* Pre-order notification box if applicable */}
              {product.isPreOrder && (
                <div className="p-3.5 bg-[#EFECE6] border-l-2 border-[#151515] text-[11px] text-[#151515] font-light space-y-1">
                  <span className="font-medium tracking-[0.16em] uppercase block text-[10px]">
                    Atelier Pre-Order:
                  </span>
                  <p>{product.preOrderNote}</p>
                </div>
              )}

              {/* Size Selection */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] tracking-[0.2em] uppercase font-medium text-[#151515]">
                    SELECT SIZE
                  </span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-[10px] tracking-[0.16em] uppercase text-[#4A4744] underline hover:text-[#151515] transition-colors"
                  >
                    SIZE GUIDE
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      disabled={!s.available}
                      onClick={() => setSelectedSize(s.size)}
                      className={`py-3 text-xs tracking-[0.14em] uppercase border transition-all text-center ${
                        selectedSize === s.size
                          ? 'bg-[#151515] text-[#F8F6F2] border-[#151515] font-medium'
                          : s.available
                            ? 'bg-transparent text-[#151515] border-[#D8CEC1] hover:border-[#151515]'
                            : 'opacity-35 bg-[#EFECE6] border-dashed border-[#D8CEC1] line-through cursor-not-allowed text-[#7A7570]'
                      }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>

                {/* Selected size indicator */}
                {selectedSize && (
                  <p className="text-[10px] tracking-[0.16em] uppercase text-[#7A7570] mt-2">
                    FITTING: {product.sizes.find(s => s.size === selectedSize)?.available ? 'IN STOCK & READY TO DISPATCH' : 'CURRENTLY OUT OF ATELIER STOCK'}
                  </p>
                )}
              </div>

              {/* Quantity Selector & Add To Bag */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-[#D8CEC1] h-12 bg-white/50 px-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 text-base text-[#4A4744] hover:text-[#151515]"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-mono">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 text-base text-[#4A4744] hover:text-[#151515]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    id="product-add-to-bag-btn"
                    onClick={handleAdd}
                    disabled={!selectedSize}
                    className="flex-1 h-12 bg-[#151515] text-[#F8F6F2] text-[11px] tracking-[0.24em] uppercase font-medium hover:bg-[#333333] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {addedNotice ? (
                      <>
                        <Check size={16} className="text-[#B9A58C]" />
                        <span>ADDED TO BAG</span>
                      </>
                    ) : (
                      <span>{product.isPreOrder ? 'PRE-ORDER NOW' : 'ADD TO BAG'}</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Accordion Information (Size Guide, Delivery, Returns, Fabric) */}
              <div className="pt-4 border-t border-[#D8CEC1]/60 space-y-3 text-xs">
                
                {/* Accordion: Fit Notes */}
                <div className="border-b border-[#D8CEC1]/40 pb-3">
                  <button
                    onClick={() => toggleAccordion('fit')}
                    className="w-full flex items-center justify-between text-left text-[11px] tracking-[0.2em] uppercase font-medium text-[#151515]"
                  >
                    <span>FIT & SILHOUETTE NOTES</span>
                    {openAccordion === 'fit' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  {openAccordion === 'fit' && (
                    <div className="mt-2 text-[#4A4744] font-light space-y-1.5 leading-relaxed">
                      <p>{product.fitNote || "Engineered for an exact, flattering drape."}</p>
                      <p className="text-[11px] text-[#7A7570]">Silhouette: {product.silhouette}</p>
                    </div>
                  )}
                </div>

                {/* Accordion: Fabric & Care */}
                <div className="border-b border-[#D8CEC1]/40 pb-3">
                  <button
                    onClick={() => toggleAccordion('fabric')}
                    className="w-full flex items-center justify-between text-left text-[11px] tracking-[0.2em] uppercase font-medium text-[#151515]"
                  >
                    <span>FABRIC & CARE</span>
                    {openAccordion === 'fabric' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  {openAccordion === 'fabric' && (
                    <div className="mt-2 text-[#4A4744] font-light space-y-1.5 leading-relaxed">
                      <p className="font-medium text-[#151515]">{product.fabric}</p>
                      <ul className="list-disc list-inside text-[11px] space-y-1 text-[#7A7570]">
                        {product.careInstructions?.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Accordion: Delivery & Pre-Order */}
                <div className="border-b border-[#D8CEC1]/40 pb-3">
                  <button
                    onClick={() => toggleAccordion('delivery')}
                    className="w-full flex items-center justify-between text-left text-[11px] tracking-[0.2em] uppercase font-medium text-[#151515]"
                  >
                    <span>DELIVERY & COMPLIMENTARY RETURNS</span>
                    {openAccordion === 'delivery' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  {openAccordion === 'delivery' && (
                    <div className="mt-2 text-[#4A4744] font-light space-y-2 leading-relaxed text-[11px]">
                      <div className="flex items-start space-x-2">
                        <Truck size={14} className="mt-0.5 text-[#B9A58C] shrink-0" />
                        <p>Complimentary tracked delivery on all orders over €150. Standard EU delivery 2-4 business days.</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RotateCcw size={14} className="mt-0.5 text-[#B9A58C] shrink-0" />
                        <p>14-day hassle-free returns. Garments must be unworn with original atelier security tags attached.</p>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Bottom Atelier Badge */}
            <div className="mt-8 pt-4 border-t border-[#D8CEC1]/40 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#7A7570]">
              <span className="flex items-center space-x-1.5">
                <Sparkles size={12} className="text-[#B9A58C]" />
                <span>ATELIER AUTHENTICITY</span>
              </span>
              <span>SÓ BOUTIQUE EDITION</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
