import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onNavigate: (sectionId: string) => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  onNavigate,
  currentView
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-colors duration-500">
      {/* Announcement Bar */}
      <div 
        id="announcement-bar" 
        className="w-full bg-[#151515] text-[#F8F6F2] py-1.5 px-4 text-[10px] tracking-[0.26em] uppercase flex items-center justify-between font-light border-b border-[#262626]"
      >
        <span className="hidden sm:inline-block text-[#B9A58C] text-[9px]">SÓ ATELIER</span>
        <div className="flex-1 text-center truncate px-2">
          <span>NEW STYLES COMING SOON</span>
          <span className="mx-3 opacity-40">|</span>
          <span className="opacity-90">COMPLIMENTARY SHIPPING OVER €150</span>
          <span className="hidden md:inline-block mx-3 opacity-40">|</span>
          <span className="hidden md:inline-block opacity-80">WORLDWIDE EXPRESS</span>
        </div>
        <span className="hidden sm:inline-block text-[9px] text-[#A69E94]">PARIS &bull; DUBLIN</span>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        id="main-navigation"
        className={`w-full transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-[#F8F6F2]/95 backdrop-blur-md border-[#D8CEC1]/60 shadow-[0_4px_24px_rgba(21,21,21,0.03)] py-3.5' 
            : 'bg-[#F8F6F2]/80 backdrop-blur-sm border-[#D8CEC1]/40 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 -ml-1.5 text-[#151515] hover:opacity-70 transition-opacity"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Left Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8 text-[11px] tracking-[0.2em] uppercase font-normal text-[#151515]">
            <button
              id="nav-link-new"
              onClick={() => handleNavClick('new-edit')}
              className={`transition-colors py-1 relative hover:text-[#4A4744] ${
                currentView === 'new-edit' ? 'text-[#151515] font-medium' : 'text-[#4A4744]/90'
              }`}
            >
              NEW
              {currentView === 'new-edit' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#151515]"></span>
              )}
            </button>
            <button
              id="nav-link-shop"
              onClick={() => handleNavClick('collection')}
              className={`transition-colors py-1 relative hover:text-[#4A4744] ${
                currentView === 'collection' ? 'text-[#151515] font-medium' : 'text-[#4A4744]/90'
              }`}
            >
              SHOP
              {currentView === 'collection' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#151515]"></span>
              )}
            </button>
            <button
              id="nav-link-dresses"
              onClick={() => handleNavClick('collection')}
              className="transition-colors py-1 hover:text-[#151515] text-[#4A4744]/90"
            >
              DRESSES
            </button>
            <button
              id="nav-link-edit"
              onClick={() => handleNavClick('editorial')}
              className="transition-colors py-1 hover:text-[#151515] text-[#4A4744]/90"
            >
              EDIT
            </button>
            <button
              id="nav-link-about"
              onClick={() => handleNavClick('about')}
              className="transition-colors py-1 hover:text-[#151515] text-[#4A4744]/90"
            >
              ABOUT
            </button>
          </div>

          {/* Center Brand Wordmark */}
          <div className="text-center flex-1 md:flex-none">
            <button
              id="brand-logo-button"
              onClick={() => handleNavClick('hero')}
              className="group inline-flex flex-col items-center tracking-tight"
            >
              <span className="font-editorial text-2xl md:text-3xl font-normal tracking-[0.14em] text-[#151515] leading-none transition-transform group-hover:scale-[1.01]">
                SÓ BOUTIQUE
              </span>
              <span className="text-[8px] tracking-[0.38em] uppercase text-[#4A4744]/70 mt-1 font-sans">
                CONTEMPORARY LUXURY
              </span>
            </button>
          </div>

          {/* Right Action Icons - Desktop & Mobile */}
          <div className="flex items-center space-x-5 md:space-x-7 text-[#151515]">
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="hover:opacity-60 transition-opacity p-1 text-[11px] flex items-center gap-1.5"
              aria-label="Search collection"
            >
              <Search size={17} strokeWidth={1.3} />
              <span className="hidden lg:inline text-[10px] tracking-[0.18em] uppercase font-light">
                SEARCH
              </span>
            </button>

            <button
              id="header-wishlist-btn"
              onClick={onOpenWishlist}
              className="relative hover:opacity-60 transition-opacity p-1"
              aria-label="Wishlist"
            >
              <Heart size={17} strokeWidth={1.3} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#151515] text-[#F8F6F2] text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-sans font-medium">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              id="header-account-btn"
              onClick={onOpenAccount}
              className="hidden sm:block hover:opacity-60 transition-opacity p-1 text-[11px]"
              aria-label="Account"
            >
              <User size={17} strokeWidth={1.3} />
            </button>

            <button
              id="header-bag-btn"
              onClick={onOpenCart}
              className="relative hover:opacity-60 transition-opacity p-1 flex items-center gap-2"
              aria-label="Shopping bag"
            >
              <ShoppingBag size={17} strokeWidth={1.3} />
              <span className="hidden lg:inline text-[10px] tracking-[0.18em] uppercase font-medium">
                BAG ({cartCount})
              </span>
              {cartCount > 0 && (
                <span className="lg:hidden absolute -top-1 -right-1.5 bg-[#151515] text-[#F8F6F2] text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-sans font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div 
            id="mobile-navigation-drawer"
            className="md:hidden border-t border-[#D8CEC1]/50 bg-[#F8F6F2] px-6 py-6 space-y-4 animate-in fade-in duration-200"
          >
            <div className="flex flex-col space-y-4 text-xs tracking-[0.2em] uppercase font-medium text-[#151515]">
              <button
                id="mobile-nav-new"
                onClick={() => handleNavClick('new-edit')}
                className="text-left py-2 border-b border-[#D8CEC1]/40 flex justify-between items-center"
              >
                <span>THE NEW EDIT</span>
                <span className="text-[10px] text-[#B9A58C]">01</span>
              </button>
              <button
                id="mobile-nav-midi"
                onClick={() => handleNavClick('collection')}
                className="text-left py-2 border-b border-[#D8CEC1]/40 flex justify-between items-center"
              >
                <span>MIDI DRESSES COLLECTION</span>
                <span className="text-[10px] text-[#B9A58C]">02</span>
              </button>
              <button
                id="mobile-nav-editorial"
                onClick={() => handleNavClick('editorial')}
                className="text-left py-2 border-b border-[#D8CEC1]/40 flex justify-between items-center"
              >
                <span>THE ART OF DRESSING</span>
                <span className="text-[10px] text-[#B9A58C]">03</span>
              </button>
              <button
                id="mobile-nav-about"
                onClick={() => handleNavClick('about')}
                className="text-left py-2 border-b border-[#D8CEC1]/40 flex justify-between items-center"
              >
                <span>ATELIER & CRAFTSMANSHIP</span>
                <span className="text-[10px] text-[#B9A58C]">04</span>
              </button>
            </div>

            <div className="pt-4 flex items-center justify-between text-[11px] tracking-[0.16em] uppercase text-[#4A4744]">
              <button onClick={onOpenAccount} className="underline hover:text-[#151515]">Client Login</button>
              <button onClick={onOpenSearch} className="underline hover:text-[#151515]">Search Styles</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
