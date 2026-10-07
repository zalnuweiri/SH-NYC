import ReservationNotice from "../components/ReservationNotice";
import SEO from "../components/SEO";

export default function Reservations() {
  return (
    <main className="min-h-[65vh] px-6 pt-36 pb-20 text-sh-cream flex items-center justify-center">
      <SEO title="Reservations Coming Soon | Silent H NYC" description="Silent H is opening soon at 420 West 13th Street in NYC. Online reservations are coming soon." url="https://www.silenthnyc.com/reservations" />
      <div className="max-w-[600px]"><ReservationNotice /></div>
    </main>
  );
}
