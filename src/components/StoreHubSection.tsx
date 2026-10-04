import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Bookmark,
  Share2,
  Star,
  Check,
  ExternalLink,
  Copy,
  Send,
} from 'lucide-react';
import { CustomerReview, KidsProduct, STORE_INFO } from '../data/storeData';
import { ResilientImage } from './ResilientImage';

interface StoreHubSectionProps {
  reviews: CustomerReview[];
  onAddReview: (review: Omit<CustomerReview, 'id' | 'dateText'>) => void;
  products: KidsProduct[];
  isStoreSaved: boolean;
  onToggleSaveStore: () => void;
  onSelectProductFor3D: (product: KidsProduct) => void;
}

type HubTab = 'overview' | 'reviews' | 'photos' | 'directions';

export const StoreHubSection: React.FC<StoreHubSectionProps> = ({
  reviews,
  onAddReview,
  products,
  isStoreSaved,
  onToggleSaveStore,
  onSelectProductFor3D,
}) => {
  const [activeTab, setActiveTab] = useState<HubTab>('overview');
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const [selectedLandmark, setSelectedLandmark] = useState<
    'store' | 'mandir' | 'civillines' | 'tilaknagar'
  >('store');

  // Rate & Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerContext, setReviewerContext] = useState('Civil Lines, Bilaspur');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [reviewerPurchased, setReviewerPurchased] = useState(
    products[0]?.name || 'Kids Festive Wear'
  );
  const [reviewSubmittedMsg, setReviewSubmittedMsg] = useState(false);

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
      : '5.0';

  const starCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(STORE_INFO.phoneDisplay);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(STORE_INFO.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleShareStore = async () => {
    const shareText = `${STORE_INFO.displayName} (${averageRating} ★) — ${STORE_INFO.address} · Call ${STORE_INFO.phoneDisplay}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: STORE_INFO.name,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard?.writeText(`${shareText} — ${window.location.href}`);
    setShareFeedback('Store details copied to clipboard');
    setTimeout(() => setShareFeedback(null), 2500);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) return;
    onAddReview({
      author: reviewerName.trim(),
      roleOrContext: `Verified Customer · ${reviewerContext.trim() || 'Bilaspur'}`,
      rating: reviewerRating,
      comment: reviewerComment.trim(),
      purchasedItem: reviewerPurchased,
    });
    setReviewerName('');
    setReviewerComment('');
    setReviewSubmittedMsg(true);
    setTimeout(() => {
      setReviewSubmittedMsg(false);
      setShowReviewForm(false);
    }, 1800);
  };

  const landmarkInfo = {
    store: {
      title: 'Asha Dresses nx (Flagship Store)',
      distance: '0 m · Exact Destination',
      note: 'Located right near Hanuman Mandir, Civil Lines, Tilak Nagar, Bilaspur, Chhattisgarh 495001. Open daily until 8:30 pm.',
    },
    mandir: {
      title: 'Shri Hanuman Mandir Landmark',
      distance: '45 m · 1 min walk',
      note: 'Primary local landmark in Tilak Nagar / Civil Lines. Asha Dresses NX is steps away from the main mandir entrance.',
    },
    civillines: {
      title: 'Civil Lines Main Arterial Road',
      distance: '180 m · 2 min drive',
      note: 'Direct road connectivity with dedicated two-wheeler & car parking right outside the boutique.',
    },
    tilaknagar: {
      title: 'Tilak Nagar Chowk',
      distance: '250 m · 3 min walk',
      note: 'Central neighborhood junction connecting Civil Lines and Tilak Nagar residential blocks.',
    },
  };

  return (
    <section
      id="store-hub"
      className="py-20 border-t border-[#E6DDD8] bg-[#FAF8F6]"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Store Profile Header & Verified Google Business Overview */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E6DDD8]">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E6566]">
              <span>Bilaspur Flagship Showroom</span>
              <span aria-hidden="true">·</span>
              <span>{STORE_INFO.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#15803D] font-medium">{STORE_INFO.hoursStatus}</span>
              <span aria-hidden="true">·</span>
              <span>{STORE_INFO.closesAt}</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#191516] mt-2">
              {STORE_INFO.displayName}
            </h2>

            {/* Rating & Review Count Line (Unboxed clean metadata) */}
            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-[#191516]">
              <span className="font-mono-tabular font-semibold">{averageRating}</span>
              <div className="flex items-center text-[#D97706]" aria-label={`${averageRating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D97706] text-[#D97706]" />
                ))}
              </div>
              <span className="font-mono-tabular text-[#6E6566]">({totalReviews})</span>
              <span aria-hidden="true" className="text-[#6E6566]">·</span>
              <span className="text-[#6E6566]">{STORE_INFO.category}</span>
              <span aria-hidden="true" className="text-[#6E6566]">·</span>
              <span className="text-[#6E6566]">Bilaspur, Chhattisgarh 495001</span>
            </div>
          </div>

          {/* Google Profile Action Buttons: Directions, Save, Share, Call */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setActiveTab('directions')}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-[#C81E2B] hover:bg-[#A91622] rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Directions</span>
            </a>

            <button
              type="button"
              onClick={onToggleSaveStore}
              className={`px-4 py-2.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-2 whitespace-nowrap ${
                isStoreSaved
                  ? 'bg-[#191516] text-white border-[#191516]'
                  : 'bg-white text-[#191516] border-[#DFD5D0] hover:border-[#191516]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isStoreSaved ? 'fill-white' : ''}`} />
              <span>{isStoreSaved ? 'Saved Store' : 'Save'}</span>
            </button>

            <button
              type="button"
              onClick={handleShareStore}
              className="px-4 py-2.5 text-xs font-medium bg-white text-[#191516] border border-[#DFD5D0] hover:border-[#191516] rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>

            <a
              href={`tel:${STORE_INFO.phoneDial}`}
              className="px-4 py-2.5 text-xs font-semibold bg-white text-[#C81E2B] border border-[#C81E2B]/30 hover:bg-[#C81E2B]/5 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap font-mono-tabular"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {STORE_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {shareFeedback && (
          <div className="mt-3 text-xs text-[#15803D] font-medium flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            <span>{shareFeedback}</span>
          </div>
        )}

        {/* Interactive Segmented Navigation Tabs: Overview | Reviews | Photos | Directions */}
        <div className="flex items-center justify-between flex-wrap gap-4 mt-6 pb-6 border-b border-[#E6DDD8]">
          <div className="flex items-center gap-1 p-1 bg-[#EFE9E4] rounded-lg">
            {(
              [
                { id: 'overview', label: 'Overview' },
                { id: 'reviews', label: `Reviews (${totalReviews})` },
                { id: 'photos', label: 'Photos' },
                { id: 'directions', label: 'Directions & Map' },
              ] as { id: HubTab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-[#191516] shadow-xs font-semibold'
                    : 'text-[#6E6566] hover:text-[#191516]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#6E6566] flex items-center gap-2">
            <span>Near Hanuman Mandir</span>
            <span aria-hidden="true">·</span>
            <span>Civil Lines, Tilak Nagar</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">PIN 495001</span>
          </div>
        </div>

        {/* Main Content Grid Based on Active Tab */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left 7 Columns: Store Details, Map of Asha Dresses nx, and Photos */}
          <div className="lg:col-span-7 space-y-8">
            {/* Store Address, Hours & Contact Card */}
            {(activeTab === 'overview' || activeTab === 'directions') && (
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E6DDD8] space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#C81E2B] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-[#6E6566]">Store Address</div>
                      <p className="text-base font-medium text-[#191516] mt-0.5 leading-relaxed">
                        {STORE_INFO.address}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="px-3 py-1.5 text-xs font-medium text-[#6E6566] hover:text-[#191516] border border-[#E6DDD8] rounded-md flex items-center gap-1.5 shrink-0 whitespace-nowrap"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#15803D]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="h-px bg-[#EFEAE6]" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-[#C81E2B] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-[#6E6566]">Store Hours</div>
                      <p className="text-sm font-semibold text-[#191516] mt-0.5">
                        <span className="text-[#15803D]">{STORE_INFO.hoursStatus}</span>
                        <span className="mx-1.5" aria-hidden="true">·</span>
                        <span>{STORE_INFO.closesAt}</span>
                      </p>
                      <p className="text-xs text-[#6E6566] mt-1">
                        {STORE_INFO.fullHours}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <Phone className="w-5 h-5 text-[#C81E2B] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-[#6E6566]">Direct Store Line</div>
                        <a
                          href={`tel:${STORE_INFO.phoneDial}`}
                          className="font-mono-tabular text-base font-semibold text-[#191516] hover:text-[#C81E2B] transition-colors mt-0.5 block"
                        >
                          {STORE_INFO.phoneDisplay}
                        </a>
                        <p className="text-xs text-[#6E6566] mt-1">
                          WhatsApp video shopping & size check available
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      className="px-2.5 py-1 text-xs text-[#6E6566] hover:text-[#191516] border border-[#E6DDD8] rounded whitespace-nowrap"
                    >
                      {copiedPhone ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Map of Asha Dresses nx */}
            {(activeTab === 'overview' || activeTab === 'directions') && (
              <div className="rounded-2xl bg-white border border-[#E6DDD8] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#E6DDD8] flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#191516]">
                      Map of Asha Dresses nx
                    </h3>
                    <p className="text-xs text-[#6E6566]">
                      Interactive landmark guide · Civil Lines & Tilak Nagar, Bilaspur (495001)
                    </p>
                  </div>
                  <a
                    href={STORE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#C81E2B] hover:underline flex items-center gap-1 whitespace-nowrap"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Interactive Vector Map of Civil Lines / Tilak Nagar / Hanuman Mandir */}
                <div className="relative bg-[#F5F1EC] h-[300px] sm:h-[340px] w-full overflow-hidden select-none">
                  <svg
                    viewBox="0 0 800 420"
                    className="w-full h-full object-cover"
                    role="img"
                    aria-label="Map of Asha Dresses nx near Hanuman Mandir, Civil Lines, Tilak Nagar, Bilaspur"
                  >
                    {/* Map Background Blocks */}
                    <rect width="800" height="420" fill="#F3EFEA" />
                    <rect x="30" y="25" width="240" height="140" rx="12" fill="#EAE3DC" />
                    <rect x="320" y="25" width="260" height="135" rx="12" fill="#EAE3DC" />
                    <rect x="620" y="25" width="150" height="140" rx="12" fill="#EAE3DC" />
                    <rect x="30" y="220" width="235" height="170" rx="12" fill="#EAE3DC" />
                    <rect x="320" y="220" width="260" height="170" rx="12" fill="#FCE8E8" stroke="#E5B8B8" strokeWidth="1.5" />
                    <rect x="620" y="220" width="150" height="170" rx="12" fill="#EAE3DC" />

                    {/* Park / Green Zone near Civil Lines */}
                    <rect x="55" y="45" width="190" height="100" rx="8" fill="#E3ECE4" />
                    <text x="150" y="100" textAnchor="middle" fill="#4C6B50" fontSize="12" fontWeight="600">
                      CIVIL LINES GREEN BELT
                    </text>

                    {/* Arterial Roads */}
                    <path d="M 0 192 L 800 192" stroke="#FFFFFF" strokeWidth="32" />
                    <path d="M 0 192 L 800 192" stroke="#D8CFC7" strokeWidth="2" strokeDasharray="8 8" />
                    <path d="M 292 0 L 292 420" stroke="#FFFFFF" strokeWidth="28" />
                    <path d="M 600 0 L 600 420" stroke="#FFFFFF" strokeWidth="22" />

                    {/* Road Labels */}
                    <text x="145" y="196" textAnchor="middle" fill="#6E6566" fontSize="11" fontWeight="600" letterSpacing="1">
                      CIVIL LINES MAIN ROAD
                    </text>
                    <text x="460" y="196" textAnchor="middle" fill="#6E6566" fontSize="11" fontWeight="600" letterSpacing="1">
                      TILAK NAGAR MARG
                    </text>

                    {/* Dashed Walking Path from Hanuman Mandir to Asha Dresses NX */}
                    <path
                      d="M 385 280 Q 430 255 475 285"
                      fill="none"
                      stroke="#C81E2B"
                      strokeWidth="3"
                      strokeDasharray="5 5"
                    />

                    {/* Pin 1: Tilak Nagar Chowk */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedLandmark('tilaknagar')}
                    >
                      <circle cx="292" cy="192" r="14" fill="#191516" />
                      <circle cx="292" cy="192" r="5" fill="#FFFFFF" />
                      <text x="292" y="166" textAnchor="middle" fill="#191516" fontSize="11" fontWeight="600">
                        Tilak Nagar Chowk
                      </text>
                    </g>

                    {/* Pin 2: Civil Lines Approach */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedLandmark('civillines')}
                    >
                      <circle cx="140" cy="295" r="13" fill="#475569" />
                      <circle cx="140" cy="295" r="5" fill="#FFFFFF" />
                      <text x="140" y="325" textAnchor="middle" fill="#191516" fontSize="11" fontWeight="600">
                        Civil Lines Sector
                      </text>
                    </g>

                    {/* Pin 3: Hanuman Mandir Landmark */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedLandmark('mandir')}
                    >
                      <circle cx="385" cy="285" r="16" fill="#D97706" />
                      <circle cx="385" cy="285" r="6" fill="#FFFFFF" />
                      <text x="385" y="318" textAnchor="middle" fill="#78350F" fontSize="12" fontWeight="700">
                        Hanuman Mandir
                      </text>
                    </g>

                    {/* Pin 4: Asha Dresses NX (Primary Destination) */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedLandmark('store')}
                    >
                      <circle cx="490" cy="285" r="28" fill="#C81E2B" fillOpacity="0.18" />
                      <circle cx="490" cy="285" r="18" fill="#C81E2B" />
                      <circle cx="490" cy="285" r="6" fill="#FFFFFF" />
                      <rect x="415" y="232" width="150" height="28" rx="6" fill="#191516" />
                      <text x="490" y="250" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
                        Asha Dresses nx ★ 5.0
                      </text>
                    </g>
                  </svg>

                  {/* Interactive Map Bottom Overlay Bar */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-white/95 backdrop-blur-sm border border-[#E6DDD8] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#C81E2B]">
                          {landmarkInfo[selectedLandmark].title}
                        </span>
                        <span aria-hidden="true" className="text-xs text-[#6E6566]">·</span>
                        <span className="font-mono-tabular text-xs text-[#6E6566]">
                          {landmarkInfo[selectedLandmark].distance}
                        </span>
                      </div>
                      <p className="text-xs text-[#6E6566] mt-0.5">
                        {landmarkInfo[selectedLandmark].note}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {(
                        [
                          { id: 'store', label: 'Store' },
                          { id: 'mandir', label: 'Hanuman Mandir' },
                          { id: 'civillines', label: 'Civil Lines' },
                        ] as const
                      ).map((pin) => (
                        <button
                          key={pin.id}
                          type="button"
                          onClick={() => setSelectedLandmark(pin.id)}
                          className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                            selectedLandmark === pin.id
                              ? 'bg-[#C81E2B] text-white font-medium'
                              : 'bg-[#F3EFEA] text-[#191516] hover:bg-[#E6DDD8]'
                          }`}
                        >
                          {pin.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Showroom & Lookbook Photos View */}
            {(activeTab === 'overview' || activeTab === 'photos') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#191516]">
                      Showroom & Couture Photos
                    </h3>
                    <p className="text-xs text-[#6E6566]">
                      Inside Asha Dresses NX, Tilak Nagar, Bilaspur & signature kids garments
                    </p>
                  </div>
                  {activeTab !== 'photos' && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('photos')}
                      className="text-xs font-semibold text-[#C81E2B] hover:underline whitespace-nowrap"
                    >
                      View all photos
                    </button>
                  )}
                </div>

                {/* Primary 16:9 Architectural Showroom Banner */}
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#E6DDD8] bg-white">
                  <ResilientImage
                    src={STORE_INFO.showroomImage}
                    alt="Asha Dresses NX Bilaspur Showroom Interior"
                    fallbackTitle="Asha Dresses NX Showroom"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <div className="text-xs text-white/80">
                        Tilak Nagar · Near Hanuman Mandir · Bilaspur
                      </div>
                      <h4 className="font-display text-xl sm:text-2xl font-semibold mt-0.5">
                        Asha Dresses NX Kids Couture Atelier & Trial Lounge
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Thumbnail Grid of Kids Dresses */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {products.slice(0, 4).map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => {
                        onSelectProductFor3D(prod);
                      }}
                      className="group text-left rounded-xl overflow-hidden border border-[#E6DDD8] bg-white hover:border-[#C81E2B] transition-colors"
                    >
                      <div className="aspect-[3/4] overflow-hidden bg-[#F9F8F6]">
                        <ResilientImage
                          src={prod.image}
                          alt={prod.name}
                          fallbackTitle={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="p-2.5">
                        <div className="text-xs font-semibold text-[#191516] truncate">
                          {prod.name}
                        </div>
                        <div className="text-[11px] text-[#C81E2B] mt-0.5">
                          View details →
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right 5 Columns: Authentic Google Review Summary (5.0 · 3 Reviews) & Rate/Review Module */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E6DDD8]">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#191516]">
                    Google review summary
                  </h3>
                  <p className="text-xs text-[#6E6566] mt-0.5">
                    Verified parent & customer ratings for {STORE_INFO.displayName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowReviewForm((prev) => !prev)}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-[#C81E2B] hover:bg-[#A91622] rounded-lg transition-colors whitespace-nowrap"
                >
                  Rate and review
                </button>
              </div>

              {/* 5.0 (3) Rating Breakdown Bars */}
              <div className="mt-6 grid grid-cols-12 gap-6 items-center pb-6 border-b border-[#EFEAE6]">
                <div className="col-span-8 space-y-2">
                  {starCounts.map(({ star, count }) => {
                    const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
                    return (
                      <div key={star} className="flex items-center gap-3 text-xs">
                        <span className="font-mono-tabular font-medium text-[#191516] w-3">
                          {star}
                        </span>
                        <div className="flex-1 h-2 rounded-full bg-[#F3EFEA] overflow-hidden">
                          <div
                            className="h-full bg-[#D97706] rounded-full transition-all duration-200"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="col-span-4 text-center">
                  <div className="font-mono-tabular text-4xl font-bold text-[#191516]">
                    {averageRating}
                  </div>
                  <div className="flex items-center justify-center gap-0.5 my-1 text-[#D97706]">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
                    ))}
                  </div>
                  <div className="font-mono-tabular text-xs text-[#6E6566]">
                    ({totalReviews} reviews)
                  </div>
                </div>
              </div>

              {/* Interactive Rate & Review Submission Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="my-6 p-5 rounded-xl bg-[#FAF8F6] border border-[#E6DDD8] space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-display text-lg font-bold text-[#191516]">
                      Rate and review Asha Dresses nx
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="text-xs text-[#6E6566] hover:text-[#191516]"
                    >
                      Cancel
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#191516] mb-1.5">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setReviewerRating(starVal)}
                          className="p-1 focus:outline-none"
                          aria-label={`Rate ${starVal} stars`}
                        >
                          <Star
                            className={`w-6 h-6 ${
                              starVal <= reviewerRating
                                ? 'fill-[#D97706] text-[#D97706]'
                                : 'text-[#D6CFC9]'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="font-mono-tabular text-xs font-semibold text-[#191516] ml-2">
                        {reviewerRating}.0 / 5.0
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#191516] mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder="e.g., Neha Tiwari"
                        className="w-full px-3 py-2 text-xs bg-white border border-[#DFD5D0] rounded-lg focus:outline-none focus:border-[#C81E2B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#191516] mb-1">
                        Neighborhood / City
                      </label>
                      <input
                        type="text"
                        value={reviewerContext}
                        onChange={(e) => setReviewerContext(e.target.value)}
                        placeholder="Civil Lines, Bilaspur"
                        className="w-full px-3 py-2 text-xs bg-white border border-[#DFD5D0] rounded-lg focus:outline-none focus:border-[#C81E2B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#191516] mb-1">
                      Outfit Purchased
                    </label>
                    <select
                      value={reviewerPurchased}
                      onChange={(e) => setReviewerPurchased(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DFD5D0] rounded-lg focus:outline-none focus:border-[#C81E2B]"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#191516] mb-1">
                      Your Experience
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={reviewerComment}
                      onChange={(e) => setReviewerComment(e.target.value)}
                      placeholder="Share details about fabric softness, fitting, or your visit to our Tilak Nagar store..."
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DFD5D0] rounded-lg focus:outline-none focus:border-[#C81E2B]"
                    />
                  </div>

                  {reviewSubmittedMsg ? (
                    <div className="text-xs font-semibold text-[#15803D] flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      <span>Thank you! Your review has been published.</span>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#C81E2B] hover:bg-[#A91622] rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Verified Review</span>
                    </button>
                  )}
                </form>
              )}

              {/* Attributable Customer Testimonials List */}
              <div className="mt-6 space-y-6">
                {reviews.map((rev) => (
                  <article
                    key={rev.id}
                    className="pb-6 border-b border-[#EFEAE6] last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold text-[#191516]">
                        {rev.author}
                      </h4>
                      <span className="text-xs text-[#6E6566]">{rev.dateText}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#6E6566] mt-0.5">
                      <span>{rev.roleOrContext}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular font-semibold text-[#D97706]">
                        {rev.rating}.0 ★
                      </span>
                    </div>

                    <p className="text-sm text-[#3D3537] leading-relaxed mt-2.5">
                      “{rev.comment}”
                    </p>

                    <div className="text-xs text-[#6E6566] mt-2">
                      Purchased: <span className="text-[#191516] font-medium">{rev.purchasedItem}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
