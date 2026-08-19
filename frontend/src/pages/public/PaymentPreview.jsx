import { Link } from 'react-router-dom';
import { ArrowLeft, BadgeCheck, Building2, CreditCard, LockKeyhole, MapPin, ShieldCheck } from 'lucide-react';

const money = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' });

export default function PaymentPreview() {
  const serviceAmount = 125;
  const platformFee = 9.5;
  const total = serviceAmount + platformFee;

  return (
    <div className="min-h-[calc(100vh-52px)] bg-[#f8f5ef] px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link to="/services" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-apple-blue no-underline hover:underline">
          <ArrowLeft size={16} /> Back to service requests
        </Link>

        <div className="grid gap-7 lg:grid-cols-[1.1fr_.9fr]">
          <section className="rounded-[2rem] border border-[#e5ddd0] bg-white p-6 shadow-[0_20px_70px_rgba(36,45,59,.08)] sm:p-9">
            <div className="mb-8 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#193b75] text-white"><LockKeyhole size={21} /></div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[.16em] text-[#bd5d4d]">Payment experience preview</p>
                <h1 className="text-3xl font-bold tracking-tight text-[#17233a]">A clear checkout, before money moves.</h1>
                <p className="mt-3 max-w-xl text-[15px] leading-6 text-[#5b6472]">This Toronto public beta demonstrates the future booking-payment flow. BookEase does not collect cards, bank details, or live payment credentials in this version.</p>
              </div>
            </div>

            <div className="mb-6 rounded-2xl border border-[#f2c6ae] bg-[#fff7f1] p-4 text-sm leading-6 text-[#8a402f]">
              <strong>Demo only.</strong> Selecting a payment method below will not charge you, confirm payment, or change a booking. Customers and providers should agree on payment directly until live payments are announced.
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[.14em] text-[#5b6472]">Future payment methods</p>
              {[
                { icon: CreditCard, title: 'Card payment', detail: 'Visa, Mastercard, and Interac-compatible payment options.' },
                { icon: Building2, title: 'Interac e-Transfer', detail: 'A familiar Canada-first option for local service coordination.' },
              ].map(({ icon: Icon, title, detail }) => (
                <button key={title} type="button" disabled className="flex w-full items-center gap-4 rounded-2xl border border-[#e6e8ec] bg-[#fafafa] p-4 text-left opacity-75">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#193b75] shadow-sm"><Icon size={19} /></span>
                  <span className="flex-1"><span className="block text-sm font-bold text-[#17233a]">{title}</span><span className="mt-1 block text-xs leading-5 text-[#697386]">{detail}</span></span>
                  <span className="rounded-full bg-[#edf1f7] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#51617a]">Coming soon</span>
                </button>
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-[2rem] bg-[#17233a] p-6 text-white shadow-[0_20px_70px_rgba(23,35,58,.2)] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#f4b08e]">Example order summary</p>
            <h2 className="mt-3 text-2xl font-bold">Toronto faucet repair</h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-[#c7d1e1]"><MapPin size={15} /> Toronto, Ontario</p>
            <div className="my-7 h-px bg-white/15" />
            <div className="space-y-3 text-sm text-[#dbe3ef]">
              <div className="flex justify-between"><span>Provider offer</span><span>{money.format(serviceAmount)}</span></div>
              <div className="flex justify-between"><span>Illustrative platform fee</span><span>{money.format(platformFee)}</span></div>
              <div className="mt-4 flex justify-between border-t border-white/15 pt-4 text-lg font-bold text-white"><span>Example total</span><span>{money.format(total)}</span></div>
            </div>
            <div className="mt-7 rounded-2xl bg-white/10 p-4 text-xs leading-5 text-[#dbe3ef]">
              <div className="mb-2 flex items-center gap-2 font-bold text-white"><ShieldCheck size={16} /> Trust principle</div>
              The final paid product will show fees, cancellation rules, and payment status before any funds are captured.
            </div>
            <Link to="/cancellations" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#f7c0a1] no-underline hover:underline"><BadgeCheck size={15} /> Review cancellation guidance</Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
