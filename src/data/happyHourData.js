// Happy Hour content lifted verbatim from the old Home happy-hour section.
// Schema (G-36): { id, name, description?, note? }

export const happyHourIntro = {
  title: "Best Happy Hour In NYC",
  schedule: "Everyday – 5pm – 7pm",
  prices: [
    { label: "Margaritas", price: "$10" },
    { label: "Individual Bites", price: "$4" },
  ],
  heroImage: "/HH1-1.png",
};

export const happyHourItems = [
  {
    id: "hh-margarita",
    name: "Margarita",
    description: "House flavours",
  },
  {
    id: "hh-chicharron",
    name: "Taco de chicharrón",
    description:
      "Crispy pork belly chicharrón taco, avocado mousse, fermented habanero salsa, onion, avocado, cilantro, lime.",
    note: "VEGAN OPTION AVAILABLE",
  },
  {
    id: "hh-flauta",
    name: "Flauta carnita",
    description:
      "Rolled tacos filled with carnita, avocado mousse, sour cream, queso fresco, Siberia-style guacamole, pickled red onions, flowers",
  },
  {
    id: "hh-olvidado",
    name: "Taco olvidado",
    description:
      "Black tiger shrimp, bacon, mozzarella, shrimp consommé, served over hot river stones",
  },
  {
    id: "hh-empanada",
    name: "Empanada de barbacoa",
    description:
      "AAA rib eye barbacoa empanadas, salsa verde, salsa roja, onion and cilantro",
    note: "VEGETARIAN OPTION AVAILABLE",
  },
  {
    id: "hh-tostada",
    name: "Tostada de atún",
    description:
      "Fire-charred corn tostada, guacamole, chipotle dressed tuna, fried red onions, Tajín mayo",
  },
];

export const tuesdays = {
  title: "Tuesdays",
  schedule: "All day",
  price: "$20",
  heroImage: "/HH2-1.png",
  items: [
    {
      id: "tu-cachetada",
      name: "Cachetada de Rib eye",
      description:
        "Cheese-crusted rib eye slices, avocado, grilled onions, chives, served on corn tortillas",
    },
    {
      id: "tu-esquite",
      name: "Side of Esquite",
      description:
        "Andean corn, serrano cream, guajillo and ancho powder, cotija cheese, butter",
    },
    {
      id: "tu-margarita",
      name: "Margarita",
      description: "House flavours",
    },
  ],
};
