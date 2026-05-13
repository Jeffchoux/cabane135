export function MapGoogleStyled() {
  const embed =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101!2d-1.2020846!3d46.20422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4806abbb0675ed91%3A0xdb815905e96cb6a0!2sHUITRES%20LEBON%20CABANE%20135!5e0!3m2!1sfr!2sfr!4v1";

  return (
    <div className="relative h-full w-full overflow-hidden bg-[var(--navy)]">
      <iframe
        src={embed}
        title="Google Maps — Cabane 135"
        width="100%"
        height="100%"
        style={{
          border: 0,
          position: "absolute",
          inset: 0,
          filter:
            "invert(0.92) hue-rotate(180deg) saturate(0.55) brightness(0.95) contrast(0.92)",
        }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(10,22,40,0.35) 100%)",
        }}
      />
    </div>
  );
}
