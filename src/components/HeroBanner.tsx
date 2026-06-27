"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Container from "./Container";
import type { BannerItem } from "@/services/bannerService";

interface Props {
  slides?: BannerItem[];
  sideBanners?: BannerItem[];
}

export default function HeroBanner({ slides: slidesProp, sideBanners: sideProp }: Props) {
  const slides = slidesProp ?? [];
  const sideBanners = sideProp ?? [];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, [slides.length]);

  // Reset index when slides change
  useEffect(() => { setCurrent(0); }, [slides]);

  const slide = slides[current] ?? slides[0];
  if (!slide) return null;

  return (
    <div className="py-3">
      <Container>
        {/* ── Main wrapper (slider + desktop side banners) ── */}
        <div className="hero-banner-wrapper">

          {/* ── Main slider ── */}
          <div
            style={{
              flex: 1,
              position: "relative",
              overflow: "hidden",
              borderRadius: 8,
              border: "1px solid rgba(182,138,53,0.22)",
              boxShadow: "0 18px 45px rgba(11,11,10,0.12)",
              background: "#001B54",
            }}
          >
            {slide.linkUrl ? (
              <a href={slide.linkUrl} target="_blank" rel="noreferrer" style={{ display: "block", width: "100%", height: "100%", position: "relative" }}>
                <Image src={slide.file} alt={slide.alt} fill style={{ objectFit: "cover", objectPosition: "center" }} unoptimized priority />
              </a>
            ) : (
              <Image src={slide.file} alt={slide.alt} fill style={{ objectFit: "cover", objectPosition: "center" }} unoptimized priority />
            )}

            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(11,11,10,0.22), rgba(11,11,10,0.04) 52%, rgba(182,138,53,0.12)), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(11,11,10,0.12))",
                pointerEvents: "none",
              }}
            />

            {/* Dot indicators */}
            {slides.length > 1 && (
              <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6, zIndex: 10 }}>
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      borderRadius: 99,
                      width: i === current ? 24 : 10,
                      height: 10,
                      background: i === current ? "#B68A35" : "rgba(255,255,255,0.65)",
                      border: "1px solid rgba(255,255,255,0.35)",
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 0.3s",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Prev arrow */}
            {slides.length > 1 && (
              <button
                onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
                style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(182,138,53,0.36)", background: "rgba(0,27,84,0.72)", color: "#fff", fontSize: 24, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}
              >‹</button>
            )}

            {/* Next arrow */}
            {slides.length > 1 && (
              <button
                onClick={() => setCurrent((c) => (c + 1) % slides.length)}
                style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(182,138,53,0.36)", background: "rgba(0,27,84,0.72)", color: "#fff", fontSize: 24, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}
              >›</button>
            )}
          </div>

          {/* ── Right side banners — desktop only ── */}
          {sideBanners.length > 0 && (
            <div className="hidden lg:flex flex-col" style={{ width: "35%", flexShrink: 0, gap: 12 }}>
              {sideBanners.map((b) => (
                <a
                  key={b.Id}
                  href={b.linkUrl || "#"}
                  target={b.linkUrl ? "_blank" : "_self"}
                  rel="noreferrer"
                  style={{ flex: 1, position: "relative", overflow: "hidden", borderRadius: 8, display: "block", border: "1px solid rgba(182,138,53,0.22)", boxShadow: "0 12px 28px rgba(11,11,10,0.1)" }}
                  className="group"
                  onClick={b.linkUrl ? undefined : (e) => e.preventDefault()}
                >
                  <Image
                    src={b.file}
                    alt={b.alt}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    className="group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(90deg, rgba(11,11,10,0.12), rgba(182,138,53,0.12))",
                    }}
                  />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* ── Side banners — mobile only: 2-column row below slider ── */}
        {sideBanners.length > 0 && (
          <div className="flex lg:hidden gap-3 mt-3">
            {sideBanners.map((b) => (
              <a
                key={b.Id}
                href={b.linkUrl || "#"}
                target={b.linkUrl ? "_blank" : "_self"}
                rel="noreferrer"
                className="group"
                style={{ flex: 1, position: "relative", height: 85, overflow: "hidden", borderRadius: 8, display: "block", border: "1px solid rgba(182,138,53,0.22)" }}
                onClick={b.linkUrl ? undefined : (e) => e.preventDefault()}
              >
                <Image
                  src={b.file}
                  alt={b.alt}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(90deg, rgba(11,11,10,0.12), rgba(182,138,53,0.12))",
                  }}
                />
              </a>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
