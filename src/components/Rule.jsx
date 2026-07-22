/* Dotted cream rule (Figma LINE dashPattern [1,8], round caps, #ece1d4 w2):
   2px dots spaced 9px on-centre. Shared by the menu item lists and the event benefits. */
export default function Rule({ className = "" }) {
  return (
    <div
      className={`h-[2px] w-full ${className}`}
      style={{
        backgroundImage: "radial-gradient(circle, #ece1d4 1px, transparent 1.6px)",
        backgroundSize: "9px 2px",
        backgroundRepeat: "repeat-x",
        backgroundPosition: "left center",
      }}
    />
  );
}
