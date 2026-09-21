import React, { useState, useMemo } from 'react';
import { Eye, Heart, SlidersHorizontal, Grid2X2, LayoutGrid, Check } from 'lucide-react';
import { Product, SortOption, GridMode } from '../types';

interface CollectionMidiProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: number) => boolean;
}

export const CollectionMidi: React.FC<CollectionMidiProps> = ({
  products,
  onSelectProduct,
  onQuickView,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeSort, setActiveSort] = useState<SortOption>('featured');
  const [gridMode, setGridMode] = useState<GridMode>('compact');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);

  // Filter options
  const filterTabs = [
    { id: 'all', label: 'ALL PIECES' },
    { id: 'pre-order', label: 'PRE-ORDER' },
    { id: 'wedding-occasion', label: 'OCCASION & WEDDING' },
    { id: 'wrap-silhouettes', label: 'WRAP SILHOUETTES' },
    { id: 'convertible', label: 'CONVERTIBLE' }
  ];

  // Filtering logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeFilter === 'pre-order') {
      list = list.filter(p => p.isPreOrder);
    } else if (activeFilter === 'wedding-occasion') {
      list = list.filter(p => 
        p.tags.some(t => t.toLowerCase().includes('wedding') || t.toLowerCase().includes('formal') || t.toLowerCase().includes('occasion'))
      );
    } else if (activeFilter === 'wrap-silhouettes') {
      list = list.filter(p => 
        p.title.toLowerCase().includes('wrap') || p.description.toLowerCase().includes('wrap')
      );
    } else if (activeFilter === 'convertible') {
      list = list.filter(p => 
        p.title.toLowerCase().includes('valentina') || p.silhouette.toLowerCase().includes('convertible')
      );
    }

    if (activeSort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (activeSort === 'name-asc') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [products, activeFilter, activeSort]);

  return (
    <section id="collection" className="py-20 md:py-28 px-6 md:px-14 bg-[#F8F6F2] transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Collection Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-[10px] tracking-[0.34em] uppercase text-[#B9A58C] font-sans block mb-3">
            PERMANENT COLLECTION
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal tracking-[0.06em] text-[#151515] leading-none mb-4">
            MIDI
          </h2>
          <div className="w-10 h-[1px] bg-[#B9A58C] mx-auto mb-5" />
          <p className="font-editorial text-lg md:text-xl italic text-[#4A4744] font-light leading-relaxed">
            A study in movement, silhouette and femininity.
          </p>
        </div>

        {/* Minimal Editorial Filter Bar */}
        <div className="border-t border-b border-[#D8CEC1]/70 py-4 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px] tracking-[0.2em] uppercase text-[#151515]">
          
          {/* Left Category Tabs */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`transition-colors py-1 relative ${
                  activeFilter === tab.id 
                    ? 'text-[#151515] font-semibold' 
                    : 'text-[#4A4744]/70 hover:text-[#151515]'
                }`}
              >
                {tab.label}
                {activeFilter === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#151515]" />
                )}
              </button>
            ))}
          </div>

          {/* Right Controls: Sort & Grid View Mode */}
          <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-[#D8CEC1]/50">
            {/* Sort selection */}
            <div className="flex items-center space-x-2">
              <span className="text-[#4A4744]/70">SORT:</span>
              <select
                id="collection-sort-select"
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value as SortOption)}
                className="bg-transparent text-[#151515] font-medium text-[11px] tracking-[0.16em] uppercase focus:outline-none cursor-pointer py-0.5"
              >
                <option value="featured">FEATURED</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
                <option value="name-asc">ALPHABETICAL</option>
              </select>
            </div>

            {/* Grid Density Toggle */}
            <div className="hidden sm:flex items-center space-x-2 text-[#4A4744]">
              <button
                onClick={() => setGridMode('editorial')}
                className={`p-1.5 transition-colors ${gridMode === 'editorial' ? 'text-[#151515] bg-[#EFECE6]' : 'hover:text-[#151515]'}`}
                title="Editorial 2-column view"
              >
                <Grid2X2 size={15} />
              </button>
              <button
                onClick={() => setGridMode('compact')}
                className={`p-1.5 transition-colors ${gridMode === 'compact' ? 'text-[#151515] bg-[#EFECE6]' : 'hover:text-[#151515]'}`}
                title="Catalog 4-column view"
              >
                <LayoutGrid size={15} />
              </button>
            </div>

            {/* Piece Count */}
            <span className="text-[#4A4744]/80 font-mono text-[10px]">
              {filteredProducts.length} PIECES
            </span>
          </div>

        </div>

        {/* Product Grid */}
        <div 
          id="product-collection-grid"
          className={`grid gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16 ${
            gridMode === 'editorial' 
              ? 'grid-cols-1 md:grid-cols-2' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {filteredProducts.map((product) => {
            const hasMultipleImages = product.images.length > 1;
            const isHovered = hoveredProductId === product.id;
            const currentImg = isHovered && hasMultipleImages ? product.images[1] : product.images[0];

            return (
              <article 
                key={product.id}
                className="group flex flex-col"
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
              >
                {/* Image Container with Restrained Luxury Canvas */}
                <div className="relative aspect-[3/4] bg-[#EFECE6] overflow-hidden">
                  <img
                    src={currentImg}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter contrast-[1.02] transition-all duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Pre-Order Subtle Tag */}
                  {product.isPreOrder && (
                    <div className="absolute top-3.5 left-3.5 bg-[#151515] text-[#F8F6F2] text-[8px] tracking-[0.24em] uppercase px-2.5 py-1 font-medium font-sans">
                      PRE-ORDER
                    </div>
                  )}

                  {/* Wishlist Heart Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className={`absolute top-3.5 right-3.5 p-2 transition-all duration-300 ${
                      isWishlisted(product.id)
                        ? 'bg-[#151515] text-[#F8F6F2] opacity-100'
                        : 'bg-[#F8F6F2]/85 text-[#151515] opacity-0 group-hover:opacity-100 hover:bg-[#151515] hover:text-[#F8F6F2]'
                    }`}
                    aria-label={`Save ${product.title} to wishlist`}
                  >
                    <Heart size={14} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} strokeWidth={1.3} />
                  </button>

                  {/* Quick View Button at Bottom of Card on Desktop Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-between gap-2 bg-gradient-to-t from-[#151515]/60 to-transparent">
                    <button
                      onClick={() => onQuickView(product)}
                      className="w-full bg-[#F8F6F2] text-[#151515] text-[10px] tracking-[0.2em] uppercase py-2.5 font-medium hover:bg-[#151515] hover:text-[#F8F6F2] transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye size={12} />
                      <span>QUICK VIEW</span>
                    </button>
                  </div>
                </div>

                {/* Minimal Editorial Product Details */}
                <div className="mt-4 flex flex-col space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="text-left font-editorial text-lg md:text-xl text-[#151515] hover:text-[#4A4744] transition-colors leading-snug tracking-[0.01em]"
                    >
                      {product.title}
                    </button>
                    <span className="font-sans text-xs md:text-sm text-[#151515] tracking-wide whitespace-nowrap">
                      €{product.price} EUR
                    </span>
                  </div>

                  {/* Subtitle / Silhouette Specifier */}
                  <p className="text-[11px] text-[#4A4744]/80 font-light truncate">
                    {product.subtitle}
                  </p>

                  {/* Available Sizes preview */}
                  <div className="pt-1 flex items-center space-x-1.5 text-[9px] text-[#4A4744]/70">
                    <span className="tracking-[0.16em] uppercase">SIZES:</span>
                    {product.sizes.map((s, idx) => (
                      <span 
                        key={idx}
                        className={s.available ? 'font-medium text-[#151515]' : 'line-through text-[#4A4744]/40'}
                      >
                        {s.size}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Editorial Atelier Note Footer */}
        <div className="mt-20 pt-10 border-t border-[#D8CEC1]/50 flex flex-col md:flex-row items-center justify-between text-[10px] tracking-[0.22em] uppercase text-[#4A4744]">
          <span>EXCLUSIVE PRODUCTION RUNS</span>
          <span className="my-2 md:my-0">CURATED IN IRELAND &bull; CRAFTED IN EUROPE</span>
          <span>COMPLIMENTARY ATELIER CONSULTATION</span>
        </div>

      </div>
    </section>
  );
};
