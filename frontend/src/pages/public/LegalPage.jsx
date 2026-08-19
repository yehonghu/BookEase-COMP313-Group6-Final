import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, MapPin, ShieldCheck } from 'lucide-react';

const copy = {
  terms: {
    eyebrow: 'Public beta terms',
    title: 'Using BookEase in Toronto',
    summary: 'BookEase is a local-service coordination platform for the Greater Toronto Area public beta.',
    sections: [
      ['Platform role', 'BookEase helps customers describe a need and helps independent providers respond with offers. Providers are responsible for the services they offer, their qualifications, insurance, pricing, and the quality of their work.'],
      ['Account conduct', 'Use accurate information, communicate respectfully, and do not use BookEase to arrange unlawful, unsafe, discriminatory, or misleading activity. We may suspend accounts that compromise the community or platform security.'],
      ['Offers and bookings', 'An accepted offer creates a coordination record between a customer and provider. Customers and providers should confirm scope, access requirements, timing, and any changes in writing through their agreed communication channel.'],
      ['Payments in this beta', 'BookEase does not process, hold, or store payment card, bank, or wallet information in the current public beta. Any payment arranged between a customer and provider is outside the BookEase platform until live payments are formally introduced.'],
    ],
  },
  privacy: {
    eyebrow: 'Public beta privacy notice',
    title: 'How BookEase handles your information',
    summary: 'This notice explains the information used to operate the Toronto/GTA public beta.',
    sections: [
      ['Information we use', 'Account details, service-request content, provider offers, booking status, ratings, and messages are used to operate the marketplace, present relevant workspaces, prevent misuse, and support the community.'],
      ['Location and contact details', 'Location and contact information are shared only where needed to coordinate a service request or booking. Do not enter payment card details, government ID numbers, or other sensitive information into service descriptions or messages.'],
      ['Payments', 'The current beta has a payment-preview interface only. BookEase does not collect card numbers, CVC values, bank information, or payment credentials in this version.'],
      ['Questions and controls', 'You may contact BookEase to ask about your account information or request support. Before a paid commercial launch, the platform owner should have this beta notice reviewed and finalize its retention, consent, and legal-contact details.'],
    ],
  },
  cancellations: {
    eyebrow: 'Cancellation guidance',
    title: 'Clear changes, fair expectations',
    summary: 'The Toronto public beta is designed around direct, documented communication between customers and providers.',
    sections: [
      ['Before work begins', 'Customers should cancel as early as possible if a service is no longer needed. Providers should promptly communicate any availability changes. The current beta does not automatically assess cancellation fees.'],
      ['Scope or timing changes', 'Use the booking details and direct communication to confirm changes to price, materials, date, arrival window, or service scope before work begins. A material change should be acknowledged by both parties.'],
      ['Concerns and disputes', 'If a concern arises, preserve a clear written record of the service scope and communication. Use the contact form to report platform issues or safety concerns.'],
      ['Payment preview limitation', 'Because live payments are not enabled, BookEase cannot issue refunds, reversals, or payout adjustments in the current beta. This page will be updated before payment processing launches.'],
    ],
  },
};

export default function LegalPage({ type }) {
  const page = copy[type] || copy.terms;
  return (
    <div className="min-h-[calc(100vh-52px)] bg-[#f8f5ef] px-5 py-14 sm:px-8">
      <article className="mx-auto max-w-3xl rounded-[2rem] border border-[#e5ddd0] bg-white p-7 shadow-[0_20px_70px_rgba(36,45,59,.08)] sm:p-11">
        <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-apple-blue no-underline hover:underline"><ArrowLeft size={16} /> Return home</Link>
        <div className="mb-9 flex gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#193b75] text-white"><FileText size={21} /></span>
          <div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#bd5d4d]">{page.eyebrow}</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-[#17233a] sm:text-4xl">{page.title}</h1></div>
        </div>
        <p className="mb-8 text-lg leading-8 text-[#515e71]">{page.summary}</p>
        <div className="mb-9 flex flex-wrap gap-3 text-xs font-semibold text-[#51617a]"><span className="inline-flex items-center gap-2 rounded-full bg-[#eef2f7] px-3 py-2"><MapPin size={14} /> Toronto/GTA first launch</span><span className="inline-flex items-center gap-2 rounded-full bg-[#eef2f7] px-3 py-2"><ShieldCheck size={14} /> Review before paid launch</span></div>
        <div className="space-y-8">
          {page.sections.map(([heading, body]) => <section key={heading}><h2 className="text-xl font-bold text-[#17233a]">{heading}</h2><p className="mt-3 text-[15px] leading-7 text-[#5b6472]">{body}</p></section>)}
        </div>
        <div className="mt-10 rounded-2xl border border-[#e5ddd0] bg-[#fcfaf6] p-4 text-sm leading-6 text-[#5b6472]">Last updated: August 2026. This public-beta content describes the current product experience and should be reviewed by the owner’s legal advisor before processing payments or broad commercial launch.</div>
      </article>
    </div>
  );
}
