import type { Flavor, MixIn, Topping } from "./types"

const IMAGES = {
  sundaeBowl: "/images/menu/menu-05.jpg", // Waffle Cone
  whiteBar: "/images/menu/menu-03.jpg", // Kulfi
  caramelBar: "/images/menu/menu-13.jpg", // Taste of India
  vanillaBar: "/images/menu/menu-11.jpg", // Classic
  mangoBar: "/images/menu/menu-14.jpg", // Natural
  pistachioBar: "/images/menu/menu-12.jpg", // Royals
  chocolateBar: "/images/menu/menu-07.jpg", // Tacos
  plainBar: "/images/menu/menu-03.jpg", // Kulfi
  parfaitSundae: "/images/menu/menu-06.jpg", // Jar Sundae
  iceCreamBoat: "/images/menu/menu-09.jpg", // Cold Slab

  // Specific menu mappings
  natural: "/images/menu/menu-14.jpg",
  classic: "/images/menu/menu-11.jpg",
  kids: "/images/menu/menu-15.jpg",
  royals: "/images/menu/menu-12.jpg",
  india: "/images/menu/menu-13.jpg",
  kulfi: "/images/menu/menu-03.jpg",
  waffleCone: "/images/menu/menu-05.jpg",
  jar: "/images/menu/menu-06.jpg",
  tacos: "/images/menu/menu-07.jpg",
  singleSundae: "/images/menu/menu-08.jpg",
  coldSlab: "/images/menu/menu-09.jpg",
  volcano: "/images/menu/menu-10.jpg",
  triple: "/images/menu/menu-04.jpg",
}

export const KULFI_FLAVORS = ["Mawa", "Saffron", "Pistachio", "Belgium Chocolate", "Almond"]

export const PRODUCT_TYPES = {
  // Natural Ice Cream - can mix 2 scoops
  naturalIceCream: {
    id: "naturalIceCream",
    name: "Natural Ice Cream",
    price: 10000,
    description: "Fresh fruit ice cream made with real fruits",
    image: IMAGES.natural,
    maxFlavors: 2,
    maxToppings: 0,
    maxSauces: 0,
    canMix: true,
    allowedFlavors: "natural",
  },
  // Classic Treats - only 1 flavor
  classicTreats: {
    id: "classicTreats",
    name: "Classic Treats",
    price: 6000,
    description: "Traditional classic ice cream flavors",
    image: IMAGES.classic,
    maxFlavors: 1,
    maxToppings: 0,
    maxSauces: 0,
    canMix: false,
    allowedFlavors: "classic",
  },
  // Kids Delight - only 1 flavor
  kidsDelight: {
    id: "kidsDelight",
    name: "Kids Delight",
    price: 8000,
    description: "Fun colorful flavors for kids",
    image: IMAGES.kids,
    maxFlavors: 1,
    maxToppings: 0,
    maxSauces: 0,
    canMix: false,
    allowedFlavors: "kidsDelight",
  },
  // Dry Fruit Royals - only 1 flavor
  dryFruitRoyals: {
    id: "dryFruitRoyals",
    name: "Dry Fruit Royals",
    price: 8000,
    description: "Premium dry fruit infused ice cream",
    image: IMAGES.royals,
    maxFlavors: 1,
    maxToppings: 0,
    maxSauces: 0,
    canMix: false,
    allowedFlavors: "dryFruitRoyals",
  },
  // Taste of India - only 1 flavor
  tasteOfIndia: {
    id: "tasteOfIndia",
    name: "Taste of India",
    price: 8000,
    description: "Indian inspired traditional flavors",
    image: IMAGES.india,
    maxFlavors: 1,
    maxToppings: 0,
    maxSauces: 0,
    canMix: false,
    allowedFlavors: "tasteOfIndia",
  },
  kulfi: {
    id: "kulfi",
    name: "Kulfi",
    price: 6000,
    description: "Traditional Indian frozen dessert",
    image: IMAGES.kulfi,
    maxFlavors: 1,
    maxToppings: 0,
    maxSauces: 0,
    canMix: false,
    allowedFlavors: ["Mawa", "Saffron", "Pistachio", "Belgium Chocolate", "Almond"],
  },
  waffleCone: {
    id: "waffleCone",
    name: "Waffle Cone Basket",
    price: 20000,
    description: "Big waffle cone with premium ice cream",
    image: IMAGES.waffleCone,
    maxFlavors: 2,
    maxToppings: 3,
    maxSauces: 0,
    canMix: true,
    allowedFlavors: "all",
  },
  jarSundae: {
    id: "jarSundae",
    name: "Jar Sundae",
    price: 20000,
    description: "Ice cream served in a jar with toppings",
    image: IMAGES.jar,
    maxFlavors: 2,
    maxToppings: 3,
    maxSauces: 0,
    canMix: true,
    allowedFlavors: "all",
  },
  frozenTacos: {
    id: "frozenTacos",
    name: "Frozen Tacos",
    price: 20000,
    description: "Taco waffle with ice cream",
    image: IMAGES.tacos,
    maxFlavors: 2,
    maxToppings: 3,
    maxSauces: 0,
    canMix: true,
    allowedFlavors: "all",
  },
  waffleBasketSingle: {
    id: "waffleBasketSingle",
    name: "Waffle Basket Single Sundae",
    price: 12000,
    description: "Waffle basket with single ice cream flavor",
    image: IMAGES.singleSundae,
    maxFlavors: 2,
    maxToppings: 3,
    maxSauces: 0,
    canMix: true,
    allowedFlavors: "all",
  },
  coldSlab: {
    id: "coldSlab",
    name: "Cold Slab",
    price: 20000,
    description: "Create your own signature ice cream",
    image: IMAGES.coldSlab,
    maxFlavors: 2,
    maxToppings: 3,
    maxSauces: 0,
    canMix: true,
    allowedFlavors: "coldSlab",
  },
  sizzlingVolcano: {
    id: "sizzlingVolcano",
    name: "Sizzling Volcano",
    price: 20000,
    description: "Hot sizzling plate with ice cream, brownie & fudge",
    image: IMAGES.volcano,
    maxFlavors: 1,
    maxToppings: 0,
    maxSauces: 0,
    canMix: false,
    allowedFlavors: "all",
  },
  tripleSundae: {
    id: "tripleSundae",
    name: "Triple Sundae",
    price: 20000,
    description: "3 scoops of premium ice cream with toppings",
    image: IMAGES.triple,
    maxFlavors: 3,
    maxToppings: 5,
    maxSauces: 3,
    canMix: true,
    allowedFlavors: "all",
  },
  fruitFantasy: {
    id: "fruitFantasy",
    name: "Fruit Fantasy",
    price: 20000,
    description: "3 scoops of fruit ice cream with fresh fruits",
    image: IMAGES.triple, // fallback for fruit fantasy using similar sundae image
    maxFlavors: 3,
    maxToppings: 4,
    maxSauces: 2,
    canMix: true,
    allowedFlavors: "fruit",
  },
  coneOrCup: {
    id: "coneOrCup",
    name: "Cone or Cup",
    price: 6000,
    description: "Classic single or double scoop",
    image: IMAGES.classic,
    maxFlavors: 2,
    maxToppings: 0,
    maxSauces: 0,
    canMix: true,
    allowedFlavors: "all",
  },
}

export const ICE_CREAM_FLAVORS = {
  natural: [
    { id: "n1", name: "Fresh Mango", price: 10000, category: "Natural", color: "#FFD700" },
    { id: "n2", name: "Fresh Custard Apple", price: 10000, category: "Natural", color: "#90EE90" },
    { id: "n3", name: "Fresh Strawberry", price: 10000, category: "Natural", color: "#FF69B4" },
    { id: "n4", name: "Fresh Pineapple", price: 10000, category: "Natural", color: "#FFE135" },
    { id: "n5", name: "Fresh Jamun", price: 10000, category: "Natural", color: "#4B0082" },
    { id: "n6", name: "Fresh Guava", price: 10000, category: "Natural", color: "#FF6B6B" },
    { id: "n7", name: "Fresh Chikoo", price: 10000, category: "Natural", color: "#8B4513" },
    { id: "n8", name: "Fresh Avocado", price: 10000, category: "Natural", color: "#568203" },
  ],
  classic: [
    { id: "c1", name: "French Vanilla", price: 6000, category: "Classic", color: "#F3E5AB" },
    { id: "c2", name: "Strawberry", price: 6000, category: "Classic", color: "#FF69B4" },
    { id: "c3", name: "Mango", price: 6000, category: "Classic", color: "#FFD700" },
    { id: "c4", name: "Chocolate Addiction", price: 6000, category: "Classic", color: "#3B2F2F" },
    { id: "c5", name: "Pineapple", price: 6000, category: "Classic", color: "#FFE135" },
    { id: "c6", name: "Coffee", price: 6000, category: "Classic", color: "#6F4E37" },
    { id: "c7", name: "Banana", price: 6000, category: "Classic", color: "#FFE135" },
    { id: "c8", name: "Belgian Chocolate", price: 6000, category: "Classic", color: "#4B3621" },
    { id: "c9", name: "Chocolate", price: 6000, category: "Classic", color: "#3B2F2F" },
  ],
  kidsDelight: [
    { id: "k1", name: "Rainbow", price: 8000, category: "Kids Delight", color: "#FF6B6B" },
    { id: "k2", name: "Kitkat", price: 8000, category: "Kids Delight", color: "#8B4513" },
    { id: "k3", name: "Kids Carnival", price: 8000, category: "Kids Delight", color: "#FF69B4" },
    { id: "k4", name: "Oreo Blueberry Cheesecake", price: 8000, category: "Kids Delight", color: "#464196" },
  ],
  dryFruitRoyals: [
    { id: "d1", name: "Mango Fusion", price: 8000, category: "Dry Fruit Royals", color: "#FFD700" },
    { id: "d2", name: "Strawberry Cheesecake", price: 8000, category: "Dry Fruit Royals", color: "#FF69B4" },
    { id: "d3", name: "Pistachio Almond Fudge", price: 8000, category: "Dry Fruit Royals", color: "#93C572" },
    { id: "d4", name: "Red Velvet Cheesecake", price: 8000, category: "Dry Fruit Royals", color: "#C41E3A" },
    { id: "d5", name: "Ferrero Blast", price: 8000, category: "Dry Fruit Royals", color: "#8B4513" },
    { id: "d6", name: "Salted Butter Caramel", price: 8000, category: "Dry Fruit Royals", color: "#C68E17" },
    { id: "d7", name: "Baklava Ice Cream", price: 8000, category: "Dry Fruit Royals", color: "#DAA520" },
    { id: "d8", name: "Black Forest Cake Ice Cream", price: 8000, category: "Dry Fruit Royals", color: "#3B2F2F" },
  ],
  tasteOfIndia: [
    { id: "i1", name: "Rajbhog", price: 8000, category: "Taste of India", color: "#FFD700" },
    { id: "i2", name: "Pan Masala", price: 8000, category: "Taste of India", color: "#228B22" },
    { id: "i3", name: "Butterscotch", price: 8000, category: "Taste of India", color: "#E3A857" },
    { id: "i4", name: "Anjeer Honey", price: 8000, category: "Taste of India", color: "#800080" },
    { id: "i5", name: "Kesar Malti", price: 8000, category: "Taste of India", color: "#FF8C00" },
    { id: "i6", name: "Mawa Kulfi", price: 8000, category: "Taste of India", color: "#F0EAD6" },
    { id: "i7", name: "Oreo Crumble", price: 8000, category: "Taste of India", color: "#2F2F2F" },
    { id: "i8", name: "Arabian Flights", price: 8000, category: "Taste of India", color: "#DAA520" },
    { id: "i9", name: "American Bites", price: 8000, category: "Taste of India", color: "#C41E3A" },
    { id: "i10", name: "Almond Carnival", price: 8000, category: "Taste of India", color: "#D2691E" },
    { id: "i11", name: "Falooda Ice Cream", price: 8000, category: "Taste of India", color: "#FF69B4" },
  ],
  kulfi: [
    { id: "ku1", name: "Mawa", price: 6000, category: "Kulfi", color: "#F0EAD6", canMix: false },
    { id: "ku2", name: "Saffron", price: 6000, category: "Kulfi", color: "#FF8C00", canMix: false },
    { id: "ku3", name: "Pistachio", price: 6000, category: "Kulfi", color: "#93C572", canMix: false },
    { id: "ku4", name: "Belgium Chocolate", price: 6000, category: "Kulfi", color: "#4B3621", canMix: false },
    { id: "ku5", name: "Almond", price: 6000, category: "Kulfi", color: "#D2691E", canMix: false },
  ],
  coldSlab: [
    { id: "cs1", name: "French Vanilla", price: 8000, category: "Cold Slab", color: "#F3E5AB" },
    { id: "cs2", name: "Mango Fusion", price: 8000, category: "Cold Slab", color: "#FFD700" },
    { id: "cs3", name: "Pineapple", price: 8000, category: "Cold Slab", color: "#FFE135" },
    { id: "cs4", name: "Strawberry", price: 8000, category: "Cold Slab", color: "#FF69B4" },
    { id: "cs5", name: "Chocolate", price: 8000, category: "Cold Slab", color: "#3B2F2F" },
    { id: "cs6", name: "Coffee Caramel", price: 8000, category: "Cold Slab", color: "#6F4E37" },
    { id: "cs7", name: "Strawberry Cheesecake", price: 8000, category: "Cold Slab", color: "#FF69B4" },
    { id: "cs8", name: "Kit Kat", price: 8000, category: "Cold Slab", color: "#8B4513" },
    { id: "cs9", name: "Pistachio Almond Fudge", price: 8000, category: "Cold Slab", color: "#93C572" },
    { id: "cs10", name: "American Bites", price: 8000, category: "Cold Slab", color: "#C41E3A" },
  ],
}

export const TOPPING_CATEGORIES = {
  toppings: [
    { id: "tp1", name: "Brownie", price: 2000, type: "topping" },
    { id: "tp2", name: "M&M’s", price: 1500, type: "topping" },
    { id: "tp3", name: "Sponge Cake", price: 1500, type: "topping" },
    { id: "tp4", name: "Kit-Kat", price: 2000, type: "topping" },
    { id: "tp5", name: "Mixed Dry Fruits", price: 2500, type: "topping" },
    { id: "tp6", name: "Button Chocolate", price: 1500, type: "topping" },
    { id: "tp7", name: "Mixed Jelly", price: 1000, type: "topping" },
    { id: "tp8", name: "Oreo Biscuit", price: 1500, type: "topping" },
    { id: "tp9", name: "Wafer Biscuit", price: 1000, type: "topping" },
  ],
  sauces: [
    { id: "sc1", name: "Chocolate", price: 1000, type: "sauce" },
    { id: "sc2", name: "Strawberry", price: 1000, type: "sauce" },
    { id: "sc3", name: "Pineapple", price: 1000, type: "sauce" },
    { id: "sc4", name: "Caramel", price: 1000, type: "sauce" },
    { id: "sc5", name: "Choco-Fudge", price: 1500, type: "sauce" },
    { id: "sc6", name: "Nutella", price: 2000, type: "sauce" },
  ],
}

// Get all mixable flavors (excluding Kulfi)
export const getAllMixableFlavors = () => {
  const allFlavors = [
    ...ICE_CREAM_FLAVORS.natural,
    ...ICE_CREAM_FLAVORS.classic,
    ...ICE_CREAM_FLAVORS.kidsDelight,
    ...ICE_CREAM_FLAVORS.dryFruitRoyals,
    ...ICE_CREAM_FLAVORS.tasteOfIndia,
    ...ICE_CREAM_FLAVORS.coldSlab,
  ]
  return allFlavors
}

// Get fruit flavors only
export const getFruitFlavors = () => {
  return [
    ...ICE_CREAM_FLAVORS.natural,
    ICE_CREAM_FLAVORS.classic.find((f) => f.name === "Strawberry"),
    ICE_CREAM_FLAVORS.classic.find((f) => f.name === "Mango"),
    ICE_CREAM_FLAVORS.classic.find((f) => f.name === "Pineapple"),
  ].filter(Boolean)
}

export const getFlavorsByCategory = (category: string) => {
  switch (category) {
    case "natural":
      return ICE_CREAM_FLAVORS.natural
    case "classic":
      return ICE_CREAM_FLAVORS.classic
    case "kidsDelight":
      return ICE_CREAM_FLAVORS.kidsDelight
    case "dryFruitRoyals":
      return ICE_CREAM_FLAVORS.dryFruitRoyals
    case "tasteOfIndia":
      return ICE_CREAM_FLAVORS.tasteOfIndia
    case "coldSlab":
      return ICE_CREAM_FLAVORS.coldSlab
    case "kulfi":
      return ICE_CREAM_FLAVORS.kulfi
    case "fruit":
      return getFruitFlavors()
    case "all":
    default:
      return getAllMixableFlavors()
  }
}

// Legacy exports for compatibility
export const FLAVORS: Flavor[] = [
  {
    id: "1",
    name: "Vanilla Bean Royale",
    description: "Real Madagascan vanilla pods, creamy base.",
    notes: "Aromatic, Smooth",
    allergens: ["Milk"],
    price: 8000,
    category: "Classic",
    image: IMAGES.sundaeBowl,
    color: "#F3E5AB",
  },
  {
    id: "2",
    name: "Belgian Chocolate Intenso",
    description: "Deep dark chocolate, velvet texture.",
    notes: "Rich, Dark",
    allergens: ["Milk", "Soy"],
    price: 9000,
    category: "Classic",
    image: IMAGES.chocolateBar,
    color: "#3B2F2F",
  },
  {
    id: "3",
    name: "Fresh Mango Sorbet",
    description: "Real seasonal mango, dairy-free.",
    notes: "Tangy, Refreshing",
    allergens: [],
    price: 8000,
    category: "Sorbet",
    image: IMAGES.mangoBar,
    color: "#FFD700",
  },
  {
    id: "4",
    name: "Strawberry Field",
    description: "Fresh strawberry puree, soft texture.",
    notes: "Sweet, Berry",
    allergens: ["Milk"],
    price: 8000,
    category: "Fruit",
    image: IMAGES.parfaitSundae,
    color: "#FF69B4",
  },
  {
    id: "5",
    name: "Passionfruit Zest",
    description: "Tangy passionfruit with citrus lift.",
    notes: "Citrus, Tropical",
    allergens: ["Milk"],
    price: 8500,
    category: "Fruit",
    image: IMAGES.mangoBar,
    color: "#E3A857",
  },
  {
    id: "6",
    name: "Pistachio Crème",
    description: "Roasted pistachios ground into a rich base.",
    notes: "Nutty, Creamy",
    allergens: ["Milk", "Nuts"],
    price: 10000,
    category: "Premium",
    image: IMAGES.pistachioBar,
    color: "#93C572",
  },
  {
    id: "7",
    name: "Salted Caramel Dream",
    description: "Buttery caramel with sea salt finish.",
    notes: "Sweet, Salty",
    allergens: ["Milk"],
    price: 9000,
    category: "Classic",
    image: IMAGES.caramelBar,
    color: "#C68E17",
  },
  {
    id: "8",
    name: "Coffee Arabica",
    description: "Single-origin coffee infusion.",
    notes: "Bold, Roasted",
    allergens: ["Milk"],
    price: 9000,
    category: "Classic",
    image: IMAGES.chocolateBar,
    color: "#6F4E37",
  },
]

export const MIX_INS: MixIn[] = [
  { id: "m1", name: "Brownie Bits", price: 2000, type: "candy" },
  { id: "m2", name: "Cookie Dough", price: 2000, type: "candy" },
  { id: "m3", name: "Fresh Strawberries", price: 1500, type: "fruit" },
  { id: "m4", name: "Roasted Almonds", price: 2500, type: "nut" },
  { id: "m5", name: "Gummy Bears", price: 1500, type: "candy" },
  { id: "m6", name: "Dried Figs", price: 2000, type: "fruit" },
  { id: "m7", name: "Honeycomb", price: 2000, type: "candy" },
  { id: "m8", name: "Pecans", price: 2500, type: "nut" },
]

export const TOPPINGS: Topping[] = [
  { id: "t1", name: "Hot Fudge", price: 1000, type: "sauce" },
  { id: "t2", name: "Caramel Drizzle", price: 1000, type: "sauce" },
  { id: "t3", name: "Rainbow Sprinkles", price: 500, type: "sprinkle" },
  { id: "t4", name: "Waffle Cone Pieces", price: 1000, type: "sprinkle" },
  { id: "t5", name: "Whipped Cream", price: 500, type: "sauce" },
  { id: "t6", name: "Cherry", price: 500, type: "sprinkle" },
]

export const SIZE_PRICE_MULTIPLIER = {
  S: 1,
  M: 1.5,
  L: 2.0,
}

export const SIZE_LABELS = {
  S: "Small (100ml)",
  M: "Medium (200ml)",
  L: "Large (350ml)",
}
