export function MapGoogleSatellite() {
  const embed =
    "https://maps.google.com/maps?q=HUITRES+LEBON+CABANE+135,135+Rue+du+Port,17137+Nieul-sur-Mer&z=14&t=h&output=embed";

  return (
    <div className="relative h-full w-full overflow-hidden bg-[var(--navy)]">
      <iframe
        src={embed}
        title="Google Maps satellite — Cabane 135"
        width="100%"
        height="100%"
        style={{
          border: 0,
          position: "absolute",
          inset: 0,
        }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(10,22,40,0.55) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
