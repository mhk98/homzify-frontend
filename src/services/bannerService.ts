import { BASE, IMAGES } from "@/lib/api";

export interface BannerItem {
  Id: number;
  file: string;
  type: "slider" | "side" | "popup" | "custom";
  category?: string;
  linkUrl: string | null;
  alt: string;
  sortOrder: number;
}

export interface BannersResult {
  slides: BannerItem[];
  sideBanners: BannerItem[];
  popupBanners: BannerItem[];
}

function isGeneratedPlaceholder(file: string | null | undefined): boolean {
  if (!file) return true;
  return file.startsWith("data:image/svg+xml") || file.includes("placeholder");
}

function bannerQuery(banner: BannerItem): string {
  const text = `${banner.alt || ""} ${banner.category || ""}`.toLowerCase();

  if (text.includes("modest") || text.includes("fashion") || text.includes("hijab")) {
    return "hijab,fashion";
  }

  if (text.includes("book") || text.includes("quran") || text.includes("islamic books")) {
    return "islamic,books";
  }

  if (text.includes("popup") || text.includes("welcome") || text.includes("offer")) {
    return "perfume,gift,box";
  }

  if (text.includes("attar") || text.includes("perfume") || text.includes("fragrance")) {
    return "perfume,bottle,luxury";
  }

  if (banner.type === "side") return "perfume,bottle,luxury";
  return "hijab,fashion";
}

function realBannerUrl(banner: BannerItem): string {
  const width = banner.type === "side" ? 900 : 1200;
  const height = banner.type === "side" ? 420 : 620;
  const lock = Number(banner.Id || 1) + 1000;
  return `https://loremflickr.com/${width}/${height}/${bannerQuery(banner)}?lock=${lock}`;
}

function toUrl(file: string, banner: BannerItem): string {
  if (isGeneratedPlaceholder(file)) return realBannerUrl(banner);
  if (file.startsWith("http") || file.startsWith("data:")) return file;
  return `${IMAGES}/${file}`;
}

export async function fetchBanners(): Promise<BannersResult> {
  try {
    const res = await fetch(`${BASE}/banners/public`, { next: { revalidate: 60 }, signal: AbortSignal.timeout(15_000) });
    if (!res.ok) return { slides: [], sideBanners: [], popupBanners: [] };
    const json = await res.json();
    const items: BannerItem[] = (json.data || []).map((b: BannerItem) => ({
      ...b,
      file: toUrl(b.file, b),
    }));
    return {
      slides: items.filter((b) => b.type === "slider"),
      sideBanners: items.filter((b) => b.type === "side"),
      popupBanners: items.filter((b) => b.type === "popup"),
    };
  } catch {
    return { slides: [], sideBanners: [], popupBanners: [] };
  }
}
