import type { CategoryMenuItem } from "@/services/menuService";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import HorizontalCarousel from "./HorizontalCarousel";

interface Props {
  items?: CategoryMenuItem[];
}

export default function TopCategories({ items }: Props) {
  const categories = items ?? [];

  if (categories.length === 0) return null;

  return (
    <section style={{ padding: "18px 0" }}>
      <Container>
        <h2 className="premium-section-heading" style={{ marginBottom: 16 }}>
          TOP CATEGORIES
        </h2>

        {/* mobile: 3 items | sm: 5 items | lg: 7 items — gap 10px */}
        <HorizontalCarousel
          itemWidthClass="w-[calc(33.333%-7px)] sm:w-[calc(20%-8px)] lg:w-[calc(14.286%-9px)]"
          gap={10}
          autoplay
          interval={5000}
          showArrows={false}
        >
          {categories.map((cat) => (
            <Link key={cat.Id} href={`/?menu=${encodeURIComponent(cat.label)}`} className="group flex flex-col items-center">
              <div
                className="cat-img-box w-full bg-white overflow-hidden hover:shadow-md transition-shadow"
                style={{ borderRadius: 6, border: "1px solid rgba(11,11,10,0.08)", boxShadow: "0 1px 2px rgba(11,11,10,0.04)" }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={cat.imageUrl!}
                    alt={cat.label}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                    draggable={false}
                    unoptimized
                  />
                </div>
              </div>
              <span
                className="group-hover:text-[#B68A35] transition-colors text-center mt-1 leading-tight line-clamp-2"
                style={{ fontSize: 12, textTransform: "capitalize", color: "#444" }}
              >
                {cat.label}
              </span>
            </Link>
          ))}
        </HorizontalCarousel>
      </Container>
    </section>
  );
}
