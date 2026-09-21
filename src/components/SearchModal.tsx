import React, { useState, useMemo } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [products, query]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#151515]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#F8F6F2] shadow-2xl border border-[#D8CEC1] p-6 sm:p-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#151515] hover:opacity-60 transition-opacity"
          aria-label="Close search"
        >
          <X size={20} strokeWidth={1.3} />
        </button>

        {/* Search Input */}
        <div className="border-b border-[#151515] pb-3 flex items-center space-x-4">
          <Search size={22} className="text-[#151515]" strokeWidth={1.4} />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH BY SILHOUETTE, DRESS NAME, OCCASION..."
            className="w-full bg-transparent font-editorial text-xl sm:text-2xl text-[#151515] placeholder-[#7A7570] focus:outline-none tracking-wide"
          />
        </div>

        {/* Popular searches / Suggestions */}
        {!query && (
          <div className="pt-6">
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#B9A58C] font-sans block mb-3">
              SUGGESTED DISCOVERIES
            </span>
            <div className="flex flex-wrap gap-2 text-xs text-[#151515]">
              {['Valentina', 'Wrap Dress', 'Lara Pre-Order', 'Wedding Guest', 'Plum', 'Floral', 'Corset'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-1.5 border border-[#D8CEC1] hover:border-[#151515] transition-colors text-[11px] tracking-[0.14em] uppercase"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div className="mt-8 max-h-[50vh] overflow-y-auto divide-y divide-[#D8CEC1]/50">
            <div className="pb-3 text-[10px] tracking-[0.2em] uppercase text-[#7A7570]">
              {searchResults.length} RESULTS FOUND FOR "{query.toUpperCase()}"
            </div>

            {searchResults.length === 0 ? (
              <div className="py-10 text-center text-xs text-[#7A7570] font-light">
                No bespoke silhouettes matched your query. Contact our atelier concierge for custom requests.
              </div>
            ) : (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                  className="py-4 flex items-center justify-between group cursor-pointer hover:bg-[#EFECE6]/50 px-2 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-16 object-cover object-top bg-[#EFECE6]"
                    />
                    <div>
                      <h4 className="font-editorial text-lg text-[#151515] group-hover:text-[#4A4744] transition-colors">
                        {product.title}
                      </h4>
                      <p className="text-[11px] text-[#7A7570] font-light">
                        {product.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-sans text-xs font-medium text-[#151515]">
                      €{product.price} EUR
                    </span>
                    <ArrowRight size={14} className="text-[#151515] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
