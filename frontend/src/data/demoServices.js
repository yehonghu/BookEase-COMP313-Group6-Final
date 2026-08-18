export const demoServices = [
  {
    _id: 'demo-plumbing-01',
    title: 'Kitchen faucet repair and replacement check',
    description: 'A slow leak has developed beneath the kitchen sink. Looking for a careful assessment, a clear explanation of the parts needed, and a tidy repair visit.',
    serviceType: 'plumbing',
    status: 'open',
    location: 'Riverside, Toronto',
    preferredDate: '2026-08-24T00:00:00.000Z',
    preferredTime: '10:30 AM',
    budget: { min: 120, max: 190 },
    customer: { _id: 'demo-customer-1', name: 'Elena Park' },
    bids: [
      { _id: 'demo-bid-1', price: 145, message: 'I can inspect the cartridge and bring common replacements.', estimatedDuration: 75, provider: { _id: 'demo-provider-1', name: 'Maya Nguyen', profile: { rating: 4.9 } } },
      { _id: 'demo-bid-2', price: 165, message: 'Available late morning with a written parts estimate before work begins.', estimatedDuration: 90, provider: { _id: 'demo-provider-2', name: 'Sam Ortega', profile: { rating: 4.8 } } },
    ],
  },
  {
    _id: 'demo-cleaning-02',
    title: 'Deep clean for a bright one-bedroom reset',
    description: 'A one-bedroom apartment needs a detailed clean before a family visit. The focus is kitchen surfaces, bathroom, floors, and a calm reset of the main living area.',
    serviceType: 'cleaning',
    status: 'open',
    location: 'Kensington Market, Toronto',
    preferredDate: '2026-08-26T00:00:00.000Z',
    preferredTime: '1:00 PM',
    budget: { min: 110, max: 170 },
    customer: { _id: 'demo-customer-2', name: 'Ari Singh' },
    bids: [{ _id: 'demo-bid-3', price: 138, message: 'I can bring low-scent supplies and plan for a three-hour visit.', estimatedDuration: 180, provider: { _id: 'demo-provider-3', name: 'Nora Bell', profile: { rating: 4.9 } } }],
  },
  {
    _id: 'demo-garden-03',
    title: 'Shared courtyard garden tidy-up',
    description: 'Looking for help with pruning, weeding, and setting up two herb planters for a shared courtyard before the end of summer.',
    serviceType: 'gardening',
    status: 'open',
    location: 'The Junction, Toronto',
    preferredDate: '2026-08-29T00:00:00.000Z',
    preferredTime: '9:00 AM',
    budget: { min: 90, max: 150 },
    customer: { _id: 'demo-customer-3', name: 'Mina Chen' },
    bids: [],
  },
  {
    _id: 'demo-moving-04',
    title: 'Two-person assist for a studio move',
    description: 'Moving a few pieces from a studio apartment to a nearby building. Elevator is booked, and the items are already packed and labelled.',
    serviceType: 'moving',
    status: 'in_progress',
    location: 'West Queen West, Toronto',
    preferredDate: '2026-08-22T00:00:00.000Z',
    preferredTime: '2:00 PM',
    budget: { min: 180, max: 260 },
    customer: { _id: 'demo-customer-4', name: 'Jordan Wells' },
    bids: [{ _id: 'demo-bid-4', price: 220, message: 'Confirmed with van and moving blankets.', estimatedDuration: 150, provider: { _id: 'demo-provider-4', name: 'Relay Moving Co.', profile: { rating: 4.7 } } }],
  },
  {
    _id: 'demo-tutoring-05',
    title: 'Weekly mathematics tutoring for Grade 10',
    description: 'Seeking a patient tutor for one weekly session focused on algebra and confidence before the fall term begins.',
    serviceType: 'tutoring',
    status: 'open',
    location: 'Davisville, Toronto',
    preferredDate: '2026-08-30T00:00:00.000Z',
    preferredTime: '4:30 PM',
    budget: { min: 45, max: 70 },
    customer: { _id: 'demo-customer-5', name: 'Claire Morgan' },
    bids: [{ _id: 'demo-bid-5', price: 60, message: 'I can create a focused first-session plan and share practice notes.', estimatedDuration: 60, provider: { _id: 'demo-provider-5', name: 'Hassan Malik', profile: { rating: 5.0 } } }],
  },
];

export function listDemoServices(params = {}) {
  const search = String(params.search || '').toLowerCase().trim();
  const serviceType = String(params.serviceType || '').toLowerCase().trim();
  const data = demoServices.filter((service) => {
    const haystack = `${service.title} ${service.description} ${service.location} ${service.serviceType}`.toLowerCase();
    return (!search || haystack.includes(search)) && (!serviceType || service.serviceType === serviceType);
  });
  return { data, pagination: { page: 1, pages: 1, total: data.length } };
}
