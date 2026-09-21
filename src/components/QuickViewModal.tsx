import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Check, Eye } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onOpenFullDetail: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenFullDetail
}) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!product) return;
    const firstAvail = product.sizes.find(s => s.available);
    if (firstAvail) setSelectedSize(firstAvail.size);
    else setSelectedSize(product.sizes[0]?.size || '');
    setAdded(false);
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart(product, selectedSize, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#151515]/65 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#F8F6F2] shadow-2xl border border-[#D8CEC1] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#151515] hover:opacity-60 transition-opacity bg-white/60 rounded-full"
          aria-label="Close quick view"
        >
          <X size={16} />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] bg-[#EFECE6]">
            <img
              src={product.images[0]}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top filter contrast-[1.02]"
            />
            {product.isPreOrder && (
              <span className="absolute top-3 left-3 bg-[#151515] text-[#F8F6F2] text-[8px] tracking-[0.2em] uppercase px-2.5 py-1">
                PRE-ORDER
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[9px] tracking-[0.28em] uppercase text-[#B9A58C] font-sans block">
                QUICK LOOK
              </span>

              <div>
                <h3 className="font-editorial text-2xl text-[#151515] leading-snug">
                  {product.title}
                </h3>
                <p className="font-sans text-sm font-normal text-[#151515] mt-1">
                  €{product.price} EUR
                </p>
              </div>

              <p className="text-xs text-[#4A4744] font-light line-clamp-3">
                {product.description}
              </p>

              {/* Sizes */}
              <div>
                <div className="flex justify-between text-[10px] tracking-[0.18em] uppercase text-[#151515] mb-2 font-medium">
                  <span>SELECT SIZE</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      disabled={!s.available}
                      onClick={() => setSelectedSize(s.size)}
                      className={`w-10 h-10 text-xs tracking-wider border transition-all flex items-center justify-center ${
                        selectedSize === s.size
                          ? 'bg-[#151515] text-[#F8F6F2] border-[#151515] font-medium'
                          : s.available
                            ? 'bg-transparent text-[#151515] border-[#D8CEC1] hover:border-[#151515]'
                            : 'opacity-30 line-through border-dashed border-[#D8CEC1] cursor-not-allowed'
                      }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 space-y-3">
              <button
                onClick={handleAdd}
                disabled={!selectedSize}
                className="w-full py-3.5 bg-[#151515] text-[#F8F6F2] text-[10px] tracking-[0.22em] uppercase font-medium hover:bg-[#333333] transition-colors flex items-center justify-center space-x-2"
              >
                {added ? (
                  <>
                    <Check size={14} className="text-[#B9A58C]" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <span>ADD TO BAG</span>
                )}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenFullDetail(product);
                }}
                className="w-full text-center text-[10px] tracking-[0.18em] uppercase text-[#4A4744] underline hover:text-[#151515] transition-colors"
              >
                VIEW FULL EDITORIAL PIECE DETAILS
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
