import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Check, Sparkles, Phone, Ruler } from 'lucide-react';
import { KidsProduct, STORE_INFO } from '../data/storeData';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: KidsProduct | null;
  onClose: () => void;
  onAddToCart: (
    product: KidsProduct,
    swatchName: string,
    sizeLabel: string,
    quantity: number
  ) => void;
  onInspectIn3D: (product: KidsProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onInspectIn3D,
}) => {
  const [selectedSwatchIdx, setSelectedSwatchIdx] = useState(0);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedConfirm, setAddedConfirm] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSwatchIdx(0);
      setSelectedSizeIdx(0);
      setQuantity(1);
      setAddedConfirm(false);
    }
  }, [product]);

  if (!product) return null;

  const activeSwatch =
    product.swatches[selectedSwatchIdx] || product.swatches[0];
  const activeMeasurement =
    product.measurements[selectedSizeIdx] || product.measurements[0];

  const handleAdd = () => {
    onAddToCart(
      product,
      activeSwatch.name,
      activeMeasurement.sizeLabel,
      quantity
    );
    setAddedConfirm(true);
    setTimeout(() => setAddedConfirm(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FAF8F6] border border-[#E6DDD8] shadow-2xl grid grid-cols-1 md:grid-cols-12">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-[#191516] hover:bg-[#C81E2B] hover:text-white border border-[#E6DDD8] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Column: Sticky Product Gallery */}
        <div className="md:col-span-5 bg-[#F3EFEA] p-6 flex flex-col justify-between">
          <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-white border border-[#E6DDD8]">
            <ResilientImage
              src={product.image}
              alt={product.name}
              fallbackTitle={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-4">
            <p className="text-[11px] text-[#6E6566] text-center">
              Available for in-store trial at Asha Dresses NX, near Hanuman Mandir, Civil Lines
            </p>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            {/* Clean Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E6566]">
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.ageRange}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#C81E2B] font-medium">{product.statusTag}</span>
            </div>

            <h2
              id="pdp-modal-title"
              className="font-display text-2xl sm:text-3xl font-bold text-[#191516] mt-1.5"
            >
              {product.name}
            </h2>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mt-3">
              <span className="font-mono-tabular text-2xl font-bold text-[#191516]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="font-mono-tabular text-sm text-[#8C8284] line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs text-[#6E6566]">
                Inclusive of all taxes · Free Bilaspur alteration
              </span>
            </div>

            <p className="text-sm text-[#3D3537] leading-relaxed mt-4">
              {product.description}
            </p>

            {/* Swatch Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#191516]">
                  Color & Weave: <span className="font-normal text-[#6E6566]">{activeSwatch.name}</span>
                </span>
                <span className="text-[#6E6566]">{product.fabric}</span>
              </div>
              <div className="flex items-center gap-3 mt-2.5">
                {product.swatches.map((sw, idx) => (
                  <button
                    key={sw.id}
                    type="button"
                    onClick={() => setSelectedSwatchIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-2 transition-colors ${
                      selectedSwatchIdx === idx
                        ? 'border-[#C81E2B] bg-[#C81E2B]/5 font-semibold text-[#191516]'
                        : 'border-[#DFD5D0] bg-white text-[#6E6566] hover:text-[#191516]'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${sw.primaryHex} 55%, ${sw.secondaryHex} 45%)`,
                      }}
                    />
                    <span className="whitespace-nowrap">{sw.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size & Measurements Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#191516] flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-[#C81E2B]" />
                  <span>Select Age & Fit Size</span>
                </span>
                <span className="font-mono-tabular text-[#6E6566]">
                  Chest: {activeMeasurement.chestInches} · Length: {activeMeasurement.lengthInches}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.measurements.map((m, idx) => (
                  <button
                    key={m.sizeLabel}
                    type="button"
                    onClick={() => setSelectedSizeIdx(idx)}
                    className={`p-2.5 rounded-lg border text-left transition-colors ${
                      selectedSizeIdx === idx
                        ? 'border-[#C81E2B] bg-[#C81E2B] text-white'
                        : 'border-[#DFD5D0] bg-white text-[#191516] hover:border-[#191516]'
                    }`}
                  >
                    <div className="text-xs font-semibold whitespace-nowrap">
                      {m.sizeLabel}
                    </div>
                    <div
                      className={`font-mono-tabular text-[11px] mt-0.5 ${
                        selectedSizeIdx === idx ? 'text-white/85' : 'text-[#6E6566]'
                      }`}
                    >
                      Chest {m.chestInches}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tailoring Notes */}
            <div className="mt-6 pt-5 border-t border-[#E6DDD8]">
              <div className="text-xs font-semibold text-[#191516] mb-2">
                Atelier Craftsmanship & Comfort Details
              </div>
              <ul className="space-y-1.5 text-xs text-[#4A4143]">
                {product.craftsmanshipNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C81E2B] font-bold">·</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contiguous Action Row */}
          <div className="pt-4 border-t border-[#E6DDD8] flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-[#DFD5D0] rounded-lg bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-sm font-semibold text-[#191516] hover:bg-[#F3EFEA]"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="px-3 py-2 font-mono-tabular text-xs font-semibold text-[#191516]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-sm font-semibold text-[#191516] hover:bg-[#F3EFEA]"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 py-3 px-5 text-xs font-semibold text-white bg-[#C81E2B] hover:bg-[#A91622] rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {addedConfirm ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Shopping Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Add to Bag · ₹{(product.price * quantity).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </button>

            <a
              href={`tel:${STORE_INFO.phoneDial}`}
              className="py-3 px-4 text-xs font-semibold text-[#191516] bg-white hover:bg-[#F3EFEA] border border-[#DFD5D0] rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap font-mono-tabular"
            >
              <Phone className="w-3.5 h-3.5 text-[#C81E2B]" />
              <span>{STORE_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
