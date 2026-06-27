import Link from "next/link";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import Container from "./Container";
import HorizontalCarousel from "./HorizontalCarousel";

interface ProductSectionProps {
  title: string;
  products: Product[];
  menuParam?: string;
}

export default function ProductSection({
  title,
  products,
  menuParam,
}: ProductSectionProps) {
  if (products.length === 0) return null;

  return (
    <section style={{ paddingTop: 10, paddingBottom: 14 }}>
      <Container>
        <div
          className="flex items-center justify-between"
          style={{ marginTop: 26, marginBottom: 16 }}
        >
          <h2
            className="premium-section-heading"
          >
            {title}
          </h2>
          <Link
            href={`/?menu=${encodeURIComponent(menuParam ?? title)}`}
            className="border text-[#B68A35] border-[#B68A35] hover:bg-[#001B54] hover:border-[#001B54] hover:text-white transition-colors font-semibold whitespace-nowrap"
            style={{ borderRadius: 2, padding: "3px 10px", fontSize: 11 }}
          >
            View All
          </Link>
        </div>

        <HorizontalCarousel
          itemWidthClass="w-[calc(50%-7px)] sm:w-[calc(33.333%-10px)] lg:w-[calc(16.666%-12px)]"
          gap={14}
          autoplay
          interval={6000}
          showArrows={false}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </HorizontalCarousel>
      </Container>
    </section>
  );
}
