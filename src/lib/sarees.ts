export type Saree = {
  id: string;
  name: string;
  fabric: string;
  occasion: string;
  price: number;
  mrp?: number;
  images: Array<{ src: string; alt: string }>;
  sizes: string[];
  colors: string[];
  accentColor: string;
  isNew?: boolean;
};

const portrait = (photo: string) =>
  `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1000&h=1333&q=85`;

export const sarees: Saree[] = [
  {
    id: "kadhua-banarasi",
    name: "Kadhua Banarasi",
    fabric: "Pure silk · Handwoven zari",
    occasion: "Wedding",
    price: 18500,
    images: [{ src: portrait("photo-1610030469983-98e550d6193c"), alt: "Model wearing a deep-plum silk saree with a gold woven border" }],
    sizes: [],
    colors: [],
    accentColor: "#c9a24b",
  },
  {
    id: "temple-kanjivaram",
    name: "Temple Kanjivaram",
    fabric: "Kanjivaram silk · Temple border",
    occasion: "Bridal",
    price: 22000,
    images: [{ src: portrait("photo-1778148046782-2b5c2ce37612"), alt: "Woman wearing an ivory sari with a warm pink and gold drape" }],
    sizes: [],
    colors: [],
    accentColor: "#b76e79",
    isNew: true,
  },
  {
    id: "leheriya-bandhani",
    name: "Leheriya Bandhani",
    fabric: "Silk blend · Leheriya tie-dye",
    occasion: "Festive",
    price: 8500,
    images: [{ src: portrait("photo-1778148046511-27141f5f01ae"), alt: "Woman in a red blouse and peach-gold sari in soft afternoon light" }],
    sizes: [],
    colors: [],
    accentColor: "#9a6246",
    isNew: true,
  },
  {
    id: "chanderi-rose",
    name: "Chanderi Rose",
    fabric: "Chanderi silk · Woven buti",
    occasion: "Evening",
    price: 12000,
    images: [{ src: portrait("photo-1617627143750-d86bc21e42bb"), alt: "Model wearing an orange and gold saree for a festive occasion" }],
    sizes: [],
    colors: [],
    accentColor: "#a76a34",
    isNew: true,
  },
  {
    id: "pearl-organza",
    name: "Pearl Organza",
    fabric: "Pure organza · Fine zari",
    occasion: "Evening",
    price: 15000,
    images: [{ src: portrait("photo-1778148046782-2b5c2ce37612"), alt: "Light ivory sari with a delicate pink and gold border" }],
    sizes: [],
    colors: [],
    accentColor: "#c49e91",
    isNew: true,
  },
  {
    id: "bridal-zari",
    name: "Sunehri Zari",
    fabric: "Banarasi silk · Bridal zari",
    occasion: "Bridal",
    price: 35000,
    images: [{ src: portrait("photo-1775486102075-a9db33ac6cdf"), alt: "Two women wearing embroidered ceremonial saris" }],
    sizes: [],
    colors: [],
    accentColor: "#8f2938",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
