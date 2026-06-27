import { BASE, IMAGES } from "@/lib/api";

export interface SiteSetting {
  logoUrl: string | null;
  faviconUrl: string | null;
  marqueeText: string | null;
  metaTitle: string | null;
  metaKeyword: string | null;
  metaDescription: string | null;
  bkashNumber: string | null;
  nagadNumber: string | null;
  rocketNumber: string | null;
  orderBlockLimit: string | null;
  blockTime: string | null;
  timeUnit: string | null;
  // Footer
  hotlineNumber: string | null;
  hotMail: string | null;
  phoneNumber: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  whatsappNumber: string | null;
  mapLink: string | null;
  copyrightText: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  whatsappUrl: string | null;
  messengerUrl: string | null;
  telegramUrl: string | null;
  twitterUrl: string | null;
  linkedinUrl: string | null;
  tiktokUrl: string | null;
  deliveryPartnerUrl: string | null;
}

function toUrl(file: string | null | undefined): string | null {
  if (!file) return null;
  if (file.startsWith("http") || file.startsWith("data:") || file.startsWith("/")) return file;
  return `${IMAGES}/${file}`;
}

export async function fetchSiteSettings(): Promise<SiteSetting> {
  const empty: SiteSetting = {
    logoUrl: null, faviconUrl: null, marqueeText: null,
    metaTitle: null, metaKeyword: null, metaDescription: null,
    bkashNumber: null, nagadNumber: null, rocketNumber: null,
    orderBlockLimit: null, blockTime: null, timeUnit: null,
    hotlineNumber: null, hotMail: null, phoneNumber: null,
    address: null, phone: null, email: null, whatsappNumber: null,
    mapLink: null, copyrightText: null,
    facebookUrl: null, instagramUrl: null, youtubeUrl: null,
    whatsappUrl: null, messengerUrl: null, telegramUrl: null,
    twitterUrl: null, linkedinUrl: null, tiktokUrl: null,
    deliveryPartnerUrl: null,
  };
  try {
    const res = await fetch(`${BASE}/site-settings/public`, { cache: "no-store", signal: AbortSignal.timeout(15_000) });
    if (!res.ok) return empty;
    const json = await res.json();
    const d = json.data || {};
    const logoFile = d.logoFile || d.whiteLogo || d.darkLogo || null;
    const faviconFile = d.faviconFile || d.faviconLogo || null;
    return {
      logoUrl:            toUrl(logoFile),
      faviconUrl:         toUrl(faviconFile),
      marqueeText:        d.marqueeText || d.scrollText || null,
      metaTitle:          d.metaTitle          || null,
      metaKeyword:        d.metaKeyword        || null,
      metaDescription:    d.metaDescription    || null,
      bkashNumber:        d.bkashNumber        || null,
      nagadNumber:        d.nagadNumber        || null,
      rocketNumber:       d.rocketNumber       || null,
      orderBlockLimit:    d.orderBlockLimit    || null,
      blockTime:          d.blockTime          || null,
      timeUnit:           d.timeUnit           || null,
      hotlineNumber:      d.hotlineNumber      || null,
      hotMail:            d.hotMail            || null,
      phoneNumber:        d.phoneNumber        || null,
      address:            d.address            || null,
      phone:              d.phone              || d.phoneNumber || d.hotlineNumber || null,
      email:              d.email              || d.hotMail || null,
      whatsappNumber:     d.whatsappNumber     || null,
      mapLink:            d.mapLink            || null,
      copyrightText:      d.copyrightText      || d.footer?.copyrightText || null,
      facebookUrl:        d.facebookUrl        || null,
      instagramUrl:       d.instagramUrl       || null,
      youtubeUrl:         d.youtubeUrl         || null,
      whatsappUrl:        d.whatsappUrl        || null,
      messengerUrl:       d.messengerUrl       || null,
      telegramUrl:        d.telegramUrl        || null,
      twitterUrl:         d.twitterUrl         || d.xUrl || null,
      linkedinUrl:        d.linkedinUrl        || null,
      tiktokUrl:          d.tiktokUrl          || null,
      deliveryPartnerUrl: toUrl(d.deliveryPartnerFile || d.footer?.deliveryPartnerFile),
    };
  } catch {
    return empty;
  }
}
