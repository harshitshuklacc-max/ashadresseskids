import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  Phone,
  MapPin,
  Star,
  ArrowUpRight,
  SlidersHorizontal,
  Eye,
} from 'lucide-react';
import {
  PRODUCTS,
  INITIAL_GOOGLE_REVIEWS,
  STORE_INFO,
  KidsProduct,
  CustomerReview,
} from './data/storeData';
import { StoreHubSection } from './components/StoreHubSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { ResilientImage } from './components/ResilientImage';

export default function App() {
  // Catalog Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('All Ages');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>(
    'featured'
  );
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);

  // Saved Products & Saved Store State
  const [savedProductIds, setSavedProductIds] = useState<string[]>([
    PRODUCTS[0].id,
  ]);
  const [isStoreSaved, setIsStoreSaved] = useState<boolean>(false);

  // Contiguous Purchase Modal State
  const [activeModalProduct, setActiveModalProduct] =
    useState<KidsProduct | null>(null);

  // Shopping Bag State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: `${PRODUCTS[0].id}-default`,
      product: PRODUCTS[0],
      swatchName: PRODUCTS[0].swatches[0].name,
      sizeLabel: PRODUCTS[0].measurements[1].sizeLabel,
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Verified Google Reviews State
  const [reviews, setReviews] = useState<CustomerReview[]>(
    INITIAL_GOOGLE_REVIEWS
  );

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  const handleToggleSaveProduct = (productId: string, productName: string) => {
    setSavedProductIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        triggerToast(`Removed ${productName} from saved outfits`);
        return prev.filter((id) => id !== productId);
      } else {
        triggerToast(`Saved ${productName} to your lookbook`);
        return [...prev, productId];
      }
    });
  };

  const handleAddToCart = (
    product: KidsProduct,
    swatchName: string,
    sizeLabel: string,
    quantity = 1
  ) => {
    const itemKey = `${product.id}-${swatchName}-${sizeLabel}`;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemKey);
      if (existing) {
        return prev.map((i) =>
          i.id === itemKey ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          swatchName,
          sizeLabel,
          quantity,
        },
      ];
    });
    triggerToast(`Added ${product.name} (${sizeLabel}) to Shopping Bag`);
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddReview = (newRev: Omit<CustomerReview, 'id' | 'dateText'>) => {
    const created: CustomerReview = {
      ...newRev,
      id: `rev-${Date.now()}`,
      dateText: 'Just now',
    };
    setReviews((prev) => [created, ...prev]);
    triggerToast('Thank you! Your 5-star review was added.');
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (showSavedOnly && !savedProductIds.includes(product.id)) {
        return false;
      }
      if (
        selectedCategory !== 'All' &&
        product.category !== selectedCategory
      ) {
        return false;
      }
      if (
        selectedAgeGroup !== 'All Ages' &&
        !product.ageGroups.includes(selectedAgeGroup)
      ) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchCat = product.category.toLowerCase().includes(q);
        const matchFabric = product.fabric.toLowerCase().includes(q);
        if (!matchName && !matchCat && !matchFabric) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [
    selectedCategory,
    selectedAgeGroup,
    searchQuery,
    sortBy,
    showSavedOnly,
    savedProductIds,
  ]);

  const totalCartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F6] text-[#191516]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 h-16 bg-[#FAF8F6]/95 backdrop-blur-md border-b border-[#E6DDD8] px-4 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Single Text Element Wordmark */}
        <a
          href="#atelier-hero"
          className="font-display text-2xl font-bold tracking-tight text-[#191516] whitespace-nowrap shrink-0"
        >
          Asha Dresses NX
        </a>

        {/* Zone 2: 4 Clean Navigation Links with Subtle Hover Underlines */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5A5052]"
        >
          <a
            href="#atelier-hero"
            className="hover:text-[#C81E2B] underline-offset-4 hover:underline transition-colors whitespace-nowrap"
          >
            Overview
          </a>
          <a
            href="#collections"
            className="hover:text-[#C81E2B] underline-offset-4 hover:underline transition-colors whitespace-nowrap"
          >
            Collections
          </a>
          <a
            href="#store-hub"
            className="hover:text-[#C81E2B] underline-offset-4 hover:underline transition-colors whitespace-nowrap"
          >
            Showroom & Map
          </a>
          <a
            href="#store-hub"
            className="hover:text-[#C81E2B] underline-offset-4 hover:underline transition-colors whitespace-nowrap"
          >
            Reviews
          </a>
        </nav>

        {/* Zone 3: 2 Primary Actions (Saved Filter & Shopping Bag) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              setShowSavedOnly((prev) => !prev);
              const el = document.getElementById('collections');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              showSavedOnly
                ? 'bg-[#191516] text-white border-[#191516]'
                : 'bg-white text-[#191516] border-[#DFD5D0] hover:border-[#191516]'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                savedProductIds.length > 0 ? 'fill-[#C81E2B] text-[#C81E2B]' : ''
              }`}
            />
            <span>Saved ({savedProductIds.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#C81E2B] hover:bg-[#A91622] rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag ({totalCartCount})</span>
          </button>
        </div>
      </header>

      {/* Subtle Floating Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-[#191516] text-white text-xs font-medium shadow-xl border border-white/10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C81E2B]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="flex-1">
        {/* SECTION 1: Storefront Hero */}
        <section
          id="atelier-hero"
          className="py-12 sm:py-16 lg:py-20 border-b border-[#E6DDD8]"
        >
          <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl space-y-6">
              {/* Unboxed Regional & Store Status Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E6566]">
                <span className="text-[#C81E2B] font-semibold">
                  {STORE_INFO.displayName}
                </span>
                <span aria-hidden="true">·</span>
                <span>Civil Lines, Tilak Nagar, Bilaspur</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#15803D] font-medium">
                  {STORE_INFO.hoursStatus} · {STORE_INFO.closesAt}
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#191516] leading-[1.08] tracking-tight">
                Handcrafted Crimson & Ivory Couture for Young Celebrations.
              </h1>

              <p className="text-base sm:text-lg text-[#4A4143] leading-relaxed max-w-[64ch]">
                Welcome to the official online showroom of{' '}
                <strong className="font-semibold text-[#191516]">
                  Asha Dresses NX
                </strong>
                , located near Hanuman Mandir, Civil Lines, Tilak Nagar,
                Bilaspur, Chhattisgarh 495001. Explore pure silk and organic
                mulmul cotton kids wear, and order online or reserve for an
                in-store trial before 8:30 pm.
              </p>

              {/* Primary CTA & Direct Call Action */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#collections"
                  className="px-6 py-3.5 text-xs font-semibold text-white bg-[#C81E2B] hover:bg-[#A91622] rounded-lg transition-colors whitespace-nowrap"
                >
                  Shop Kids Collection
                </a>
                <a
                  href={`tel:${STORE_INFO.phoneDial}`}
                  className="px-5 py-3.5 text-xs font-semibold text-[#191516] bg-white hover:bg-[#F3EFEA] border border-[#DFD5D0] rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap font-mono-tabular"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C81E2B]" />
                  <span>Call {STORE_INFO.phoneDisplay}</span>
                </a>
                <a
                  href="#store-hub"
                  className="px-4 py-3.5 text-xs font-medium text-[#5A5052] hover:text-[#191516] transition-colors flex items-center gap-1 whitespace-nowrap"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C81E2B]" />
                  <span>Directions</span>
                </a>
              </div>

              {/* Claim-to-Proof Adjacency: Authentic Google Rating & Bilaspur Store Highlights */}
              <div className="pt-8 border-t border-[#E6DDD8] grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-1 font-mono-tabular text-lg font-bold text-[#191516]">
                    <span>5.0</span>
                    <Star className="w-4 h-4 fill-[#D97706] text-[#D97706]" />
                  </div>
                  <div className="text-xs text-[#6E6566] mt-0.5">
                    Verified Google Rating ({reviews.length} Reviews)
                  </div>
                </div>

                <div>
                  <div className="font-mono-tabular text-lg font-bold text-[#191516]">
                    1–14 Yrs
                  </div>
                  <div className="text-xs text-[#6E6566] mt-0.5">
                    Zero-itch organic cotton inner linings
                  </div>
                </div>

                <div>
                  <div className="font-mono-tabular text-lg font-bold text-[#191516]">
                    8:30 PM
                  </div>
                  <div className="text-xs text-[#6E6566] mt-0.5">
                    Open daily near Hanuman Mandir
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Featured Kids Collection Catalog (3-Column Grid + Interactive Filter Controls) */}
        <section id="collections" className="py-16 sm:py-20">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E6DDD8]">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#6E6566]">
                  <span>01. Curated Catalog</span>
                  <span aria-hidden="true">·</span>
                  <span>Red & Alabaster Signature Series</span>
                  <span aria-hidden="true">·</span>
                  <span>Ages 1 to 14 Years</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#191516] mt-1.5">
                  Festive Couture & Everyday Kids Apparel
                </h2>
              </div>

              {/* Search & Sort Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#8C8284] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search lehenga, sherwani, frock..."
                    className="pl-8 pr-3 py-2 text-xs bg-white border border-[#DFD5D0] rounded-lg focus:outline-none focus:border-[#C81E2B] w-56"
                  />
                </div>

                <div className="flex items-center gap-1.5 bg-white border border-[#DFD5D0] rounded-lg px-3 py-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#6E6566]" />
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as 'featured' | 'price-asc' | 'price-desc'
                      )
                    }
                    aria-label="Sort products"
                    className="text-xs text-[#191516] bg-transparent focus:outline-none font-medium"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Interactive Category & Age Filter Bars (Functional Button Controls) */}
            <div className="py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#EFEAE6]">
              {/* Category Segmented Filter */}
              <div className="flex items-center gap-1 p-1 bg-[#EFE9E4] rounded-lg overflow-x-auto no-scrollbar">
                {(
                  [
                    'All',
                    'Girls Festive',
                    'Boys Ethnic',
                    'Party Frocks',
                    'Everyday Cotton',
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-white text-[#191516] shadow-xs font-semibold'
                        : 'text-[#6E6566] hover:text-[#191516]'
                    }`}
                  >
                    {cat === 'All' ? 'All Collections' : cat}
                  </button>
                ))}
              </div>

              {/* Age Group Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <span className="text-xs text-[#6E6566] mr-1 whitespace-nowrap">
                  Age Group:
                </span>
                {['All Ages', '1–3 Yrs', '4–6 Yrs', '7–10 Yrs', '11–14 Yrs'].map(
                  (age) => (
                    <button
                      key={age}
                      type="button"
                      onClick={() => setSelectedAgeGroup(age)}
                      className={`px-3 py-1.5 text-xs rounded-md border transition-colors whitespace-nowrap ${
                        selectedAgeGroup === age
                          ? 'bg-[#C81E2B] text-white border-[#C81E2B] font-semibold'
                          : 'bg-white text-[#5A5052] border-[#DFD5D0] hover:border-[#191516]'
                      }`}
                    >
                      {age}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Product Grid (3-Column Desktop, 2-Column Tablet, Generous Whitespace) */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <p className="font-display text-2xl font-semibold text-[#191516]">
                  No outfits match the current filter selection
                </p>
                <p className="text-xs text-[#6E6566]">
                  Try clearing your search query or switching to All Collections.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedAgeGroup('All Ages');
                    setSearchQuery('');
                    setShowSavedOnly(false);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#C81E2B] rounded-lg"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => {
                  const isSaved = savedProductIds.includes(product.id);

                  return (
                    <article
                      key={product.id}
                      className="group rounded-2xl bg-white border border-[#E6DDD8] overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      {/* Top Image Container (3:4 Aspect Ratio) */}
                      <div>
                        <div className="relative aspect-[3/4] w-full bg-[#F5F1EC] overflow-hidden">
                          <ResilientImage
                            src={product.image}
                            alt={product.name}
                            fallbackTitle={product.name}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-200"
                          />

                          {/* Save / Wishlist Affordance Icon */}
                          <button
                            type="button"
                            onClick={() =>
                              handleToggleSaveProduct(product.id, product.name)
                            }
                            aria-label={`Save ${product.name}`}
                            className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/90 hover:bg-white text-[#191516] border border-[#E6DDD8] transition-colors"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                isSaved
                                  ? 'fill-[#C81E2B] text-[#C81E2B]'
                                  : 'text-[#191516]'
                              }`}
                            />
                          </button>

                          {/* Subtle Hover Quick-Inspect Overlay */}
                          <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-150">
                            <button
                              type="button"
                              onClick={() => setActiveModalProduct(product)}
                              className="w-full py-2 px-3 text-xs font-semibold bg-[#191516]/85 text-white hover:bg-[#C81E2B] rounded-lg backdrop-blur-md transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Sizes & Fit Details</span>
                            </button>
                          </div>
                        </div>

                        {/* Card Body: Unboxed Metadata -> Title -> Swatches & Price */}
                        <div className="p-5">
                          {/* Clean Unboxed Metadata */}
                          <div className="flex items-center gap-2 text-xs text-[#6E6566]">
                            <span>{product.category}</span>
                            <span aria-hidden="true">·</span>
                            <span>{product.ageRange}</span>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#C81E2B] font-medium">
                              {product.statusTag}
                            </span>
                          </div>

                          <h3 className="text-base font-semibold text-[#191516] mt-1.5 leading-snug">
                            <button
                              type="button"
                              onClick={() => setActiveModalProduct(product)}
                              className="text-left hover:text-[#C81E2B] transition-colors"
                            >
                              {product.name}
                            </button>
                          </h3>

                          <p className="text-xs text-[#6E6566] mt-1 truncate">
                            {product.fabric}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer: Price Baseline & Add to Bag CTA */}
                      <div className="px-5 pb-5 pt-3 border-t border-[#F2ECE7] flex items-center justify-between gap-3">
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono-tabular text-[15px] font-bold text-[#191516]">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice && (
                            <span className="font-mono-tabular text-xs text-[#8C8284] line-through">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleAddToCart(
                              product,
                              product.swatches[0].name,
                              product.measurements[0].sizeLabel,
                              1
                            )
                          }
                          className="px-4 py-2 text-xs font-semibold text-white bg-[#C81E2B] hover:bg-[#A91622] rounded-lg transition-colors whitespace-nowrap"
                        >
                          Add to Bag
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: Bilaspur Flagship Store Hub, Map of Asha Dresses nx & Google Reviews */}
        <StoreHubSection
          reviews={reviews}
          onAddReview={handleAddReview}
          products={PRODUCTS}
          isStoreSaved={isStoreSaved}
          onToggleSaveStore={() => {
            setIsStoreSaved((prev) => !prev);
            triggerToast(
              !isStoreSaved
                ? 'Saved Asha Dresses nx (Bilaspur) to your stores'
                : 'Removed store from saved list'
            );
          }}
          onSelectProductFor3D={(prod) => setActiveModalProduct(prod)}
        />
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="bg-[#191516] text-white/85 py-14 border-t border-[#2D2628]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-3">
            <div className="font-display text-2xl font-bold text-white">
              {STORE_INFO.name}
            </div>
            <p className="text-xs text-white/70 max-w-sm leading-relaxed">
              Bilaspur’s premier kids clothing & festive couture destination.
              Handpicked crimson and ivory lehengas, Indo-Western sherwanis,
              organza party frocks, and breathable handloom cotton sets.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/80 pt-1">
              <span className="font-mono-tabular font-semibold text-[#F59E0B]">
                5.0 ★
              </span>
              <span aria-hidden="true">·</span>
              <span>{reviews.length} Google Reviews</span>
              <span aria-hidden="true">·</span>
              <span>{STORE_INFO.category}</span>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2 text-xs">
            <div className="font-semibold text-white">
              Bilaspur Showroom Address & Hours
            </div>
            <p className="text-white/70 leading-relaxed">
              {STORE_INFO.address}
            </p>
            <p className="text-white/80 pt-1">
              <span className="text-[#4ADE80] font-medium">
                {STORE_INFO.hoursStatus}
              </span>{' '}
              · {STORE_INFO.closesAt} ({STORE_INFO.fullHours})
            </p>
            <p className="font-mono-tabular text-white pt-1">
              Phone:{' '}
              <a
                href={`tel:${STORE_INFO.phoneDial}`}
                className="underline hover:text-[#FCA5A5]"
              >
                {STORE_INFO.phoneDisplay}
              </a>
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="font-semibold text-white">Quick Links</div>
            <ul className="space-y-2 text-white/70">
              <li>
                <a
                  href="#atelier-hero"
                  className="hover:text-white transition-colors"
                >
                  Store Overview
                </a>
              </li>
              <li>
                <a
                  href="#collections"
                  className="hover:text-white transition-colors"
                >
                  Festive & Casual Catalog
                </a>
              </li>
              <li>
                <a
                  href="#store-hub"
                  className="hover:text-white transition-colors"
                >
                  Map of Asha Dresses nx
                </a>
              </li>
              <li>
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Get Directions in Google Maps</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <span>
            © {new Date().getFullYear()} {STORE_INFO.name} (
            {STORE_INFO.displayName}). All rights reserved.
          </span>
          <span>
            Near Hanuman Mandir, Civil Lines, Tilak Nagar, Bilaspur,
            Chhattisgarh 495001
          </span>
        </div>
      </footer>

      {/* Contiguous Purchase Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onAddToCart={handleAddToCart}
        onInspectIn3D={() => {}}
      />

      {/* Slide-Over Shopping Bag & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}
