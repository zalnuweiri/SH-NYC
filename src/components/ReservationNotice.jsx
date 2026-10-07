export default function ReservationNotice() {
  return (
    <div className="text-center">
      <p className="font-body uppercase text-sm tracking-[0.16em] text-sh-pink">Silent H NYC</p>
      <h1 className="font-display text-3xl md:text-4xl leading-tight mt-4" id="reservation-title">Reservations<br />Coming soon</h1>
      <p className="font-body text-[clamp(20px,1.85vw,24px)] tracking-[0.025em] leading-[1.45] mt-5">We’re getting ready to welcome you at 420 West 13th Street. Online reservations will open here soon.</p>
      <p className="font-body text-[clamp(20px,1.85vw,24px)] tracking-[0.025em] leading-[1.45] mt-4">For opening and private-event enquiries, contact our NYC team.</p>
      <a className="inline-block mt-6 font-body text-[clamp(20px,1.85vw,24px)] tracking-[0.025em] leading-[1.45] underline underline-offset-4 hover:text-sh-pink" href="mailto:info@silenthnyc.com">info@silenthnyc.com</a>
    </div>
  );
}
