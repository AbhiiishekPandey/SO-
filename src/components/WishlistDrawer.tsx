import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: number) => void;
  onSelectProduct: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onSelectProduct,
  onMoveToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#151515]/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        id="wishlist-drawer-panel"
        className="relative z-10 w-full max-w-md bg-[#F8F6F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#D8CEC1]/80 animate-in slide-in-from-right duration-300"
      >
        
        {/* Header */}
        <div className="p-6 border-b border-[#D8CEC1]/60 flex items-center justify-between">
          <div>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#B9A58C] font-sans block">
              PRIVATE ARCHIVE
            </span>
            <h2 className="font-editorial text-2xl text-[#151515] font-normal tracking-[0.06em]">
              SAVED PIECES ({wishlist.length})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#151515] hover:opacity-60 transition-opacity"
            aria-label="Close wishlist"
          >
            <X size={20} strokeWidth={1.3} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#D8CEC1]/50">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <p className="font-editorial text-xl text-[#151515]">
                No pieces currently saved.
              </p>
              <p className="text-xs text-[#7A7570] font-light max-w-xs">
                Select the heart icon on any silhouette to curate your private wishlist.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-3 bg-[#151515] text-[#F8F6F2] text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-[#333333] transition-colors"
              >
                BROWSE MIDI PIECES
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div key={product.id} className="py-5 flex space-x-4">
                <div 
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                  className="w-20 h-28 bg-[#EFECE6] overflow-hidden cursor-pointer shrink-0"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter contrast-[1.02] hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 
                        onClick={() => {
                          onClose();
                          onSelectProduct(product);
                        }}
                        className="font-editorial text-lg text-[#151515] cursor-pointer hover:text-[#4A4744] transition-colors"
                      >
                        {product.title}
                      </h3>
                      <button
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="text-[#7A7570] hover:text-[#151515] transition-colors p-1"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={14} strokeWidth={1.3} />
                      </button>
                    </div>
                    <span className="font-sans text-xs font-medium text-[#151515] mt-1 block">
                      €{product.price} EUR
                    </span>
                    {product.isPreOrder && (
                      <span className="text-[8px] tracking-[0.16em] uppercase text-[#B9A58C] font-semibold mt-0.5 block">
                        PRE-ORDER
                      </span>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        onMoveToCart(product);
                      }}
                      className="w-full py-2 bg-[#151515] text-[#F8F6F2] text-[9px] tracking-[0.2em] uppercase font-medium hover:bg-[#333333] transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <ShoppingBag size={12} />
                      <span>SELECT SIZE & ADD TO BAG</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-6 border-t border-[#D8CEC1]/70 text-center">
            <button
              onClick={onClose}
              className="text-[10px] tracking-[0.2em] uppercase text-[#4A4744] underline hover:text-[#151515]"
            >
              CONTINUE BROWSING
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
