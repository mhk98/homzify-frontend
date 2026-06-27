import Link from "next/link";

const DEFAULT_MARQUEE =
  "আপনার ব্যবসার জন্য কাস্টমাইজড, স্কেলেবল এবং পেশাদার ই-কমার্স সল্যুশন তৈরি করতে প্রতিশ্রুতিবদ্ধ।   ★   " +
  "Best level ecommerce in Bangladesh   ★   Free Shipping on selected products";

const topLinks = [
  { label: "Login / Sign Up", href: "/login" },
  { label: "Order Track", href: "/track-order" },
  { label: "Contact Us", href: "/contact" },
];

interface Props {
  text?: string | null;
}

export default function MarqueeBanner({ text }: Props) {
  // Duplicate text so the marquee scrolls continuously
  const display = (text || DEFAULT_MARQUEE) + "   ★   " + (text || DEFAULT_MARQUEE) + "   ★   ";
  return (
    <div
      className="hidden sm:flex items-center"
      style={{ background: "#001B54", height: 50 }}
    >
      <div style={{ width: "90%", margin: "0 auto" }} className="flex items-center justify-between gap-4 overflow-hidden">
        {/* Scrolling marquee text */}
        <div className="flex-1 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="text-white font-medium" style={{ fontSize: 13 }}>
              {display}
            </span>
          </div>
        </div>

        {/* Right links — white bordered buttons */}
        <div className="flex items-center gap-1 shrink-0">
          {topLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-white font-medium flex items-center justify-center rounded transition-colors hover:bg-[#B68A35]"
              style={{
                fontSize: 12,
                border: "1px solid rgba(182,138,53,0.68)",
                borderRadius: 5,
                height: 30,
                padding: "0 8px",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
