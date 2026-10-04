import React, { useState } from 'react';
import {
  X,
  Trash2,
  ShoppingBag,
  CheckCircle2,
  MapPin,
  Truck,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { KidsProduct, STORE_INFO } from '../data/storeData';
import { ResilientImage } from './ResilientImage';

export interface CartItem {
  id: string;
  product: KidsProduct;
  swatchName: string;
  sizeLabel: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

interface ConfirmedOrder {
  orderId: string;
  customerName: string;
  phone: string;
  deliveryMethod: 'cod' | 'pickup';
  address: string;
  postalCode: string;
  totalAmount: number;
  items: CartItem[];
  timestamp: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState<'cod' | 'pickup'>('cod');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('Civil Lines, Tilak Nagar, Bilaspur');
  const [postalCode, setPostalCode] = useState('495001');
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(
    null
  );

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const freeDeliveryThreshold = 1500;
  const shippingFee =
    deliveryMethod === 'pickup' || subtotal >= freeDeliveryThreshold || subtotal === 0
      ? 0
      : 90;
  const grandTotal = subtotal + shippingFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || !customerName.trim() || !phone.trim()) return;

    const generatedId = `AD-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrder({
      orderId: generatedId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      deliveryMethod,
      address:
        deliveryMethod === 'pickup'
          ? STORE_INFO.address
          : address.trim(),
      postalCode: postalCode.trim() || '495001',
      totalAmount: grandTotal,
      items: [...items],
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
    onClearCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag and Checkout"
    >
      <div className="w-full max-w-lg bg-[#FAF8F6] h-full flex flex-col justify-between border-l border-[#E6DDD8] shadow-2xl overflow-hidden">
        {/* Drawer Header */}
        <div className="px-6 py-5 bg-white border-b border-[#E6DDD8] flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#191516]">
              {confirmedOrder ? 'Order Confirmation' : 'Your Shopping Bag'}
            </h2>
            <p className="text-xs text-[#6E6566]">
              {STORE_INFO.name} · {STORE_INFO.shortLocation}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setConfirmedOrder(null);
              onClose();
            }}
            className="p-2 rounded-lg text-[#6E6566] hover:text-[#191516] hover:bg-[#F3EFEA] transition-colors"
            aria-label="Close shopping bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {confirmedOrder ? (
            <div className="p-6 rounded-2xl bg-white border border-[#E6DDD8] space-y-5">
              <div className="flex items-center gap-3 text-[#15803D]">
                <CheckCircle2 className="w-7 h-7 shrink-0" />
                <div>
                  <div className="font-mono-tabular text-xs font-semibold">
                    ORDER #{confirmedOrder.orderId} CONFIRMED
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#191516]">
                    {confirmedOrder.deliveryMethod === 'pickup'
                      ? 'Reserved for In-Store Trial & Pickup'
                      : 'Preparing Bilaspur Express Shipment'}
                  </h3>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F6] border border-[#E6DDD8] text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#6E6566]">Customer:</span>
                  <span className="font-semibold text-[#191516]">
                    {confirmedOrder.customerName} ({confirmedOrder.phone})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E6566]">Fulfillment:</span>
                  <span className="font-semibold text-[#191516]">
                    {confirmedOrder.deliveryMethod === 'pickup'
                      ? 'Store Pickup (Open till 8:30 pm)'
                      : 'Cash on Delivery (COD)'}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#6E6566] shrink-0">Location:</span>
                  <span className="text-[#191516] text-right">
                    {confirmedOrder.address} ({confirmedOrder.postalCode})
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-semibold text-[#191516]">
                  Itemized Summary
                </div>
                {confirmedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-xs py-2 border-b border-[#EFEAE6]"
                  >
                    <div>
                      <div className="font-semibold text-[#191516]">
                        {item.product.name} × {item.quantity}
                      </div>
                      <div className="text-[#6E6566]">
                        Size: {item.sizeLabel} · {item.swatchName}
                      </div>
                    </div>
                    <span className="font-mono-tabular font-semibold text-[#191516]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-2 text-sm font-bold text-[#191516]">
                  <span>Total Payable</span>
                  <span className="font-mono-tabular text-base text-[#C81E2B]">
                    ₹{confirmedOrder.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EFEAE6] flex flex-col sm:flex-row gap-2.5">
                <a
                  href={`tel:${STORE_INFO.phoneDial}`}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-[#C81E2B] hover:bg-[#A91622] rounded-lg transition-colors flex items-center justify-center gap-2 font-mono-tabular"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Store: {STORE_INFO.phoneDisplay}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmedOrder(null);
                    onClose();
                  }}
                  className="py-2.5 px-4 text-xs font-semibold text-[#191516] bg-[#F3EFEA] hover:bg-[#E6DDD8] rounded-lg transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#F3EFEA] text-[#C81E2B] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-2xl font-semibold text-[#191516]">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#6E6566] max-w-xs mx-auto">
                  Explore our 3D Kids Couture Turntable or browse festive lehengas, sherwanis, and party frocks.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#C81E2B] hover:bg-[#A91622] rounded-lg transition-colors"
              >
                Browse Kids Collection
              </button>
            </div>
          ) : (
            <>
              {/* Free Delivery Indicator */}
              <div className="p-3.5 rounded-xl bg-white border border-[#E6DDD8] text-xs flex items-center justify-between">
                <span className="text-[#191516]">
                  {subtotal >= freeDeliveryThreshold
                    ? '✓ Eligible for complimentary Bilaspur express delivery'
                    : `Add ₹${(freeDeliveryThreshold - subtotal).toLocaleString('en-IN')} more for free delivery`}
                </span>
                <span className="font-mono-tabular font-semibold text-[#C81E2B]">
                  PIN 495001
                </span>
              </div>

              {/* Cart Items List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-white border border-[#E6DDD8] flex gap-3.5"
                  >
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-[#F3EFEA] shrink-0">
                      <ResilientImage
                        src={item.product.image}
                        alt={item.product.name}
                        fallbackTitle={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-[#191516] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-[#8C8284] hover:text-[#C81E2B] transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#6E6566] mt-0.5">
                        Size: {item.sizeLabel} · {item.swatchName}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#DFD5D0] rounded-md">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-0.5 text-xs font-semibold text-[#191516] hover:bg-[#F3EFEA]"
                          >
                            −
                          </button>
                          <span className="px-2 py-0.5 font-mono-tabular text-xs font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-0.5 text-xs font-semibold text-[#191516] hover:bg-[#F3EFEA]"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-mono-tabular text-xs font-bold text-[#191516]">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fulfillment Mode Selector */}
              <div className="p-4 rounded-xl bg-white border border-[#E6DDD8] space-y-4">
                <div className="text-xs font-semibold text-[#191516]">
                  Select Fulfillment Method
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('cod')}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      deliveryMethod === 'cod'
                        ? 'border-[#C81E2B] bg-[#C81E2B]/5 text-[#191516]'
                        : 'border-[#DFD5D0] text-[#6E6566]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#191516]">
                      <Truck className="w-3.5 h-3.5 text-[#C81E2B]" />
                      <span>Home Delivery (COD)</span>
                    </div>
                    <p className="text-[11px] text-[#6E6566] mt-1">
                      Pay via Cash or UPI on doorstep delivery
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      deliveryMethod === 'pickup'
                        ? 'border-[#C81E2B] bg-[#C81E2B]/5 text-[#191516]'
                        : 'border-[#DFD5D0] text-[#6E6566]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#191516]">
                      <MapPin className="w-3.5 h-3.5 text-[#C81E2B]" />
                      <span>Store Pickup</span>
                    </div>
                    <p className="text-[11px] text-[#6E6566] mt-1">
                      Near Hanuman Mandir, Civil Lines (Open till 8:30 pm)
                    </p>
                  </button>
                </div>

                {/* Customer Verification Form */}
                <form
                  id="checkout-form"
                  onSubmit={handleCheckoutSubmit}
                  className="space-y-3 pt-2"
                >
                  <div>
                    <label className="block text-xs font-medium text-[#191516] mb-1">
                      Parent / Customer Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F6] border border-[#DFD5D0] rounded-lg focus:outline-none focus:border-[#C81E2B]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-medium text-[#191516] mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="098269 21422"
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F6] border border-[#DFD5D0] rounded-lg focus:outline-none focus:border-[#C81E2B] font-mono-tabular"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#191516] mb-1">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="495001"
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F6] border border-[#DFD5D0] rounded-lg focus:outline-none focus:border-[#C81E2B] font-mono-tabular"
                      />
                    </div>
                  </div>

                  {deliveryMethod === 'cod' && (
                    <div>
                      <label className="block text-xs font-medium text-[#191516] mb-1">
                        Delivery Address (Bilaspur / Chhattisgarh)
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House No, Street, Civil Lines, Tilak Nagar, Bilaspur"
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F6] border border-[#DFD5D0] rounded-lg focus:outline-none focus:border-[#C81E2B]"
                      />
                    </div>
                  )}
                </form>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {!confirmedOrder && items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#E6DDD8] space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#6E6566]">
                <span>Subtotal</span>
                <span className="font-mono-tabular">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[#6E6566]">
                <span>
                  {deliveryMethod === 'pickup'
                    ? 'In-Store Pickup (Tilak Nagar)'
                    : 'Delivery Charge'}
                </span>
                <span className="font-mono-tabular">
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#191516] pt-2 border-t border-[#EFEAE6]">
                <span>Total Amount</span>
                <span className="font-mono-tabular text-base text-[#C81E2B]">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="w-full py-3 px-5 text-xs font-semibold text-white bg-[#C81E2B] hover:bg-[#A91622] rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>
                {deliveryMethod === 'pickup'
                  ? 'Confirm Free Store Reservation'
                  : 'Place Order (Cash on Delivery)'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
