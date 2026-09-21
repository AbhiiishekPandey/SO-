import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, size: string, delta: number) => void;
  onRemoveItem: (productId: number, size: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const [orderNote, setOrderNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckoutClick = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      onCheckout();
      setCheckoutComplete(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#151515]/60 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-in Drawer Container */}
      <div 
        id="cart-drawer-panel"
        className="relative z-10 w-full max-w-md bg-[#F8F6F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#D8CEC1]/80 animate-in slide-in-from-right duration-300"
      >
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#D8CEC1]/60 flex items-center justify-between">
          <div>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#B9A58C] font-sans block">
              SÓ ATELIER
            </span>
            <h2 className="font-editorial text-2xl text-[#151515] font-normal tracking-[0.06em]">
              SHOPPING BAG
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#151515] hover:opacity-60 transition-opacity"
            aria-label="Close bag"
          >
            <X size={20} strokeWidth={1.3} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#EFECE6] px-6 py-3 border-b border-[#D8CEC1]/50 text-xs">
          {remainingForFreeShipping > 0 ? (
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#4A4744]">
              ADD <span className="font-medium text-[#151515]">€{remainingForFreeShipping.toFixed(2)} EUR</span> FOR COMPLIMENTARY SHIPPING
            </p>
          ) : (
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#151515] font-medium flex items-center space-x-1">
              <Check size={12} className="text-[#B9A58C]" />
              <span>YOU HAVE QUALIFIED FOR COMPLIMENTARY EXPRESS SHIPPING</span>
            </p>
          )}
          <div className="w-full bg-[#D8CEC1]/60 h-[2px] mt-2 overflow-hidden">
            <div 
              className="bg-[#151515] h-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#D8CEC1]/50">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EFECE6] flex items-center justify-center text-[#4A4744]">
                <ShoppingBag size={24} strokeWidth={1.2} />
              </div>
              <p className="font-editorial text-xl text-[#151515]">
                Your shopping bag is empty.
              </p>
              <p className="text-xs text-[#7A7570] font-light max-w-xs">
                Explore our curated midi collection to select your keynote pieces.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-3 bg-[#151515] text-[#F8F6F2] text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-[#333333] transition-colors"
              >
                DISCOVER THE COLLECTION
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}`} className="py-5 flex space-x-4">
                {/* Product Thumbnail */}
                <div className="w-20 h-28 bg-[#EFECE6] overflow-hidden shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter contrast-[1.02]"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-editorial text-lg text-[#151515] leading-snug">
                        {item.product.title}
                      </h3>
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                        className="text-[#7A7570] hover:text-[#151515] transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} strokeWidth={1.3} />
                      </button>
                    </div>

                    <p className="text-[10px] tracking-[0.16em] uppercase text-[#7A7570] mt-0.5">
                      SIZE: <span className="text-[#151515] font-medium">{item.selectedSize}</span>
                    </p>

                    {item.product.isPreOrder && (
                      <span className="inline-block text-[8px] tracking-[0.18em] uppercase text-[#B9A58C] font-semibold mt-1">
                        PRE-ORDER
                      </span>
                    )}
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#D8CEC1] text-xs h-7 px-1.5 bg-white/40">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                        className="px-1 text-sm text-[#4A4744] hover:text-[#151515]"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-mono text-[11px]">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                        className="px-1 text-sm text-[#4A4744] hover:text-[#151515]"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-sans text-xs font-medium text-[#151515]">
                      €{(item.product.price * item.quantity).toFixed(2)} EUR
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#D8CEC1]/70 bg-[#F8F6F2] space-y-4">
            
            {/* Special Instruction Note toggle */}
            <div>
              <button
                onClick={() => setShowNoteInput(!showNoteInput)}
                className="text-[10px] tracking-[0.18em] uppercase text-[#4A4744] underline hover:text-[#151515] transition-colors"
              >
                {showNoteInput ? 'HIDE ATELIER GIFT NOTE' : '+ ADD GIFT NOTE OR ORDER INSTRUCTION'}
              </button>
              {showNoteInput && (
                <textarea
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Personal inscription for luxury gift packaging..."
                  className="w-full mt-2 p-2 bg-white/60 border border-[#D8CEC1] text-xs font-light focus:outline-none focus:border-[#151515]"
                  rows={2}
                />
              )}
            </div>

            {/* Subtotal Calculation */}
            <div className="space-y-1.5 pt-2 border-t border-[#D8CEC1]/50 text-xs">
              <div className="flex justify-between text-[#4A4744]">
                <span className="text-[10px] tracking-[0.2em] uppercase">SUBTOTAL</span>
                <span className="font-sans font-medium text-[#151515] text-sm">
                  €{subtotal.toFixed(2)} EUR
                </span>
              </div>
              <div className="flex justify-between text-[10px] tracking-[0.16em] uppercase text-[#7A7570]">
                <span>SHIPPING</span>
                <span>{subtotal >= freeShippingThreshold ? 'COMPLIMENTARY' : 'CALCULATED AT CHECKOUT'}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              id="cart-checkout-button"
              onClick={handleCheckoutClick}
              disabled={checkoutComplete}
              className="w-full py-4 bg-[#151515] text-[#F8F6F2] text-[11px] tracking-[0.26em] uppercase font-medium hover:bg-[#333333] transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {checkoutComplete ? (
                <>
                  <Check size={16} className="text-[#B9A58C]" />
                  <span>PREPARING ATELIER CHECKOUT...</span>
                </>
              ) : (
                <>
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>

            {/* Trust badge */}
            <div className="flex items-center justify-center space-x-2 text-[9px] tracking-[0.2em] uppercase text-[#7A7570] pt-1">
              <ShieldCheck size={12} className="text-[#B9A58C]" />
              <span>SECURE ENCRYPTED CHECKOUT &bull; LUXURY PRESENTATION PACKAGING</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
