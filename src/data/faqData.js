// src/data/faqData.js
//
// Site FAQ, single source of truth. Consumed by:
//   • src/pages/FAQ.jsx           — the rendered /faq page + its FAQPage JSON-LD
//   • src/lib/routeContent.js     — the pre-JS crawler HTML injected at the edge
// Keeping the array here (instead of inline in FAQ.jsx) means the crawler HTML and
// the browser DOM can never disagree.

export const faqs = [
  { q: "Where is Silent H located?", a: "Silent H is at 416 West 13th Street in NYC's Meatpacking District. Our late-night agave lounge, Aitch, shares the same address." },
  { q: "What are Silent H's hours?", a: "Silent H serves dinner from 5pm Tuesday to Sunday and is closed on Mondays. We close at midnight Tuesday to Thursday and Sunday, and at 2am on Friday and Saturday. Aitch is open Thursday to Sunday from 9pm." },
  { q: "Do I need a reservation?", a: "Reservations are recommended, especially Thursday to Saturday, and can be booked at silenthnyc.com. Walk-ins are welcome. Parties over 15 should contact us directly and a deposit may apply." },
  { q: "What food does Silent H serve?", a: "Modern Mexican by Chef Gerardo Álvarez Saucedo: charred guacamole, crispy chicharrón tacos, mesquite rib-eye espadas, a 44oz tomahawk and house desserts." },
  { q: "Is Silent H good for date night?", a: "Yes. Silent H is one of NYC's favourite date-night spots, with an intimate room, shareable plates and the Aitch agave lounge for a nightcap." },
  { q: "What is Aitch?", a: "Aitch is Silent H's late-night agave cocktail lounge in NYC, pouring artisanal tequila and mezcal with elevated bites and guest DJs, Thursday to Sunday from 9pm. Aitch is 21 and over." },
  { q: "When is happy hour?", a: "Every day from 5 to 7pm: $10 house margaritas and $4 Mexican bites. Tuesdays also feature a $20 rib-eye cachetada all day." },
  { q: "Are there vegetarian or vegan options?", a: "Yes, several dishes are vegetarian or can be made vegan. Let your server know and the kitchen will guide you." },
  { q: "Can I host a private event?", a: "Yes. Silent H offers private dining, corporate dinners and full buyouts across two Mexican-inspired spaces with chef-curated menus. Call 416 900 3535 or use Plan an Event to enquire." },
  { q: "How do I get there and where do I park?", a: "Silent H is on West 13th Street in the Meatpacking District, near the 14th Street subway stations (A, C, E and L lines), with paid parking garages nearby." }
,
  { q: "What's the difference between Silent H and Aitch?", a: "Silent H is our modern Mexican restaurant on the main floor at 416 West 13th Street, serving shareable regional dishes and cocktails. Aitch is our intimate agave lounge downstairs, focused on tequila, mezcal and a deeper cocktail list, the same address with two distinct experiences." },
  { q: "Does Silent H have a tequila and mezcal selection?", a: "Yes. Downstairs at Aitch, our agave lounge, we pour an extensive tequila and mezcal selection alongside agave-forward cocktails. Upstairs, the restaurant runs a regional Mexican cocktail program." },
  { q: "Who is the chef at Silent H?", a: "Our kitchen is led by Monterrey-born chef Gerardo Álvarez Saucedo, whose menu reimagines regional Mexican cooking for NYC, from ceviches and tacos to a 44 oz tomahawk." },
  { q: "What are Silent H's signature dishes?", a: "Standout plates include the charred guacamole (guacamole quemado), crispy chicharrón tacos, rib-eye dishes and the 44 oz tomahawk, all built for sharing." },
  { q: "Can I come to Aitch just for drinks?", a: "Absolutely. Aitch, our downstairs agave lounge, is a great spot for tequila, mezcal and cocktails whether or not you're dining upstairs at the restaurant." },
  { q: "Is Silent H a good spot for a birthday or celebration?", a: "Yes. The shareable Mexican menu, cocktail program and agave lounge make Silent H a popular choice for birthdays and celebrations in NYC. For larger or private gatherings, ask about our private event options." },
  { q: "How much does dinner cost at Silent H?", a: "Silent H is a mid-to-upper range ($$) modern Mexican restaurant, with most plates designed to share. Happy hour runs every day from 5 to 7pm with $10 house margaritas and $4 Mexican bites for a lighter spend." },
  { q: "Does Silent H have a patio?", a: "Yes. Along with the main dining room, Silent H has patio seating at 416 West 13th Street, plus the downstairs Aitch agave lounge." },
  { q: "Are there gluten-free options at Silent H?", a: "Yes. Many of our Mexican dishes are corn-based and naturally gluten-free, and several plates can be adapted. Let your server know about any allergies and the kitchen will guide you." },
  { q: "What is the atmosphere like at Silent H?", a: "Silent H pairs a warm, design-forward dining room with the spirit of modern Mexico. Downstairs, Aitch brings agave cocktails and guest DJs Thursday to Sunday, suited to both a relaxed dinner and a lively night out." },
  { q: "Is Silent H family-friendly, and is there an age policy?", a: "The main restaurant welcomes guests of all ages for dinner. Aitch, our downstairs agave lounge, is 21 and over in the evenings." },
];
