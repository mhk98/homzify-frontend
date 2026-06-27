"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import OrderModal from "./OrderModal";
import { useCart } from "@/context/CartContext";
import { useCustomer } from "@/context/CustomerContext";
import { trackPixelEvent } from "@/lib/pixel";

const PRIMARY = "#B68A35";
const SECONDARY = "#001B54";
const formatPrice = (value: number) => value.toLocaleString("en-US");

export default function ProductCard({ product }: { product: Product }) {
  const [showModal, setShowModal] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { customer } = useCustomer();

  const pixelProductData = {
    content_ids: [product.id],
    content_name: product.name,
    content_type: "product",
    value: product.discountedPrice,
    currency: "BDT",
    num_items: 1,
  };

  const pixelUserData = customer
    ? { customerId: customer.Id, name: customer.name, phone: customer.phone }
    : undefined;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
    trackPixelEvent("AddToCart", pixelProductData, pixelUserData);
  };

  const handleOrderNow = () => {
    if (product.inStock === false) return;
    trackPixelEvent("OrderNow", pixelProductData, pixelUserData);
    setShowModal(true);
  };

  return (
    <>
      <div className="premium-product-card group relative flex h-full flex-col overflow-hidden" style={{ borderRadius: 6 }}>

        {product.inStock === false && (
          <span
            className="absolute z-10 text-white font-bold leading-tight"
            style={{ top: 8, left: 8, background: "#6b7280", borderRadius: 999, padding: "3px 8px", fontSize: 9 }}
          >
            Stock Out
          </span>
        )}

        {product.inStock !== false && product.discount > 0 && (
          <span
            className="absolute z-10 text-white font-bold leading-tight"
            style={{ top: 8, left: 8, background: SECONDARY, borderRadius: 999, padding: "3px 8px", fontSize: 9 }}
          >
            -{product.discount}%
          </span>
        )}

        {product.freeShipping && (
          <span
            className="absolute z-10 text-white font-bold leading-tight"
            style={{ top: 8, right: 8, background: PRIMARY, padding: "3px 8px", borderRadius: 999, fontSize: 8 }}
          >
            Free Shipping
          </span>
        )}

        <Link href={`/product/${product.id}`} className="block overflow-hidden">
          <div className="premium-product-media relative w-full overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain object-center p-3 transition-transform duration-300 group-hover:scale-105"
              draggable={false}
              unoptimized
            />
          </div>
        </Link>

        <Link
          href={`/product/${product.id}`}
          className="block overflow-hidden px-2 text-center font-medium text-[#222] transition-colors hover:text-[#B68A35]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: 36,
            lineHeight: "18px",
            fontSize: 12,
            marginTop: 9,
          }}
        >
          {product.name}
        </Link>

        <div className="mt-1 flex items-center justify-center gap-1.5 px-2">
          <span className="text-gray-400 line-through" style={{ fontSize: 11 }}>
            ৳{formatPrice(product.originalPrice)}
          </span>
          <span className="font-extrabold" style={{ color: SECONDARY, fontSize: 14 }}>
            ৳{formatPrice(product.discountedPrice)}
          </span>
        </div>

        <div className="mt-auto" style={{ display: "grid", gridTemplateColumns: "1fr 32px", gap: 6, padding: "10px 9px 9px" }}>
          <button
            onClick={handleOrderNow}
            disabled={product.inStock === false}
            className="whitespace-nowrap text-white font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-70"
            style={{ borderRadius: 4, height: 30, background: product.inStock === false ? "#b8bec8" : PRIMARY, fontSize: 10, letterSpacing: "0.04em" }}
          >
            {product.inStock === false ? "STOCK OUT" : "ORDER NOW"}
          </button>
          <button
            onClick={handleAddToCart}
            disabled={product.inStock === false}
            className="flex items-center justify-center text-white transition-colors disabled:cursor-not-allowed disabled:opacity-70"
            style={{ width: 32, height: 30, borderRadius: 4, background: product.inStock === false ? "#b8bec8" : added ? "#16a34a" : SECONDARY }}
            title="Add to Cart"
          >
            {added ? (
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {showModal && <OrderModal product={product} onClose={() => setShowModal(false)} />}

    </>
  );
}
