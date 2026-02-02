export type MenuItem = {
    id: string
    name: string
    description?: string
    price: number
    image?: string
    variants?: {
        id: string
        name: string
        price: number
        image?: string
        description?: string
    }[]
}

export type MenuCategory = {
    id: string
    title: string
    description: string
    image: string
    items: MenuItem[]
}

export const MENU_CATEGORIES = {
    iceCream: {
        id: "ice-cream",
        title: "Ice Cream",
        description: "Premium frozen delights for every craving.",
        image: "/images/menu-items/classic-treat.png",
        items: [
            {
                id: "happy-bars",
                name: "Happy Bars",
                description: "100% Milk Cream Bars",
                price: 6000,
                image: "/images/menu-items/happy-bars.png",
                variants: [
                    { id: "vanilla-bar", name: "Vanilla Bar", price: 6000, description: "Vanilla Bar With Vanilla Ice Cream, White Chocolate Coating & White Chocolate Drizzle", image: "/images/menu-items/happy-bar-vanilla.png" },
                    { id: "chocolate-bar", name: "Chocolate Bar", price: 6000, description: "Chocolate Bar With Chocolate Ice Cream, Chocolate Coating & Chocolate Drizzle.", image: "/images/menu-items/happy-bar-chocolate.png" },
                    { id: "mango-bar", name: "Mango Bar", price: 6000, description: "Mango Bar With Alphonso Mango Ice Cream, Mango Flavored Chocolate Coating & Mango Flavored Chocolate Drizzle", image: "/images/menu-items/happy-bar-mango.png" },
                    { id: "strawberry-bar", name: "Strawberry Bar", price: 6000, description: "Strawberry Bar With Strawberry Ice Cream, Strawberry Flavored Chocolate Coating And Strawberry Flavored Chocolate Drizzle", image: "/images/menu-items/happy-bar-strawberry.png" },
                ]
            },
            {
                id: "kulfi",
                name: "Kulfi",
                description: "Authentic Indian Kulfi Sticks",
                price: 6000,
                image: "/images/menu-items/kulfi.png",
                variants: [
                    { id: "mawa-kulfi", name: "Mawa Kulfi", price: 6000, image: "/images/menu-items/kulfi-mawa.png" },
                    { id: "saffron-kulfi", name: "Saffron Kulfi", price: 6000, image: "/images/menu-items/kulfi-saffron.png" },
                    { id: "pistachio-kulfi", name: "Pistachio Kulfi", price: 6000, image: "/images/menu-items/kulfi-pistachio.png" },
                    { id: "belgium-chocolate-kulfi", name: "Belgium Chocolate Kulfi", price: 6000, image: "/images/menu-items/kulfi-belgium-chocolate.png" },
                    { id: "almond-kulfi", name: "Almond Kulfi", price: 6000, image: "/images/menu-items/kulfi-almond.png" },
                ]
            },
            {
                id: "basket-waffle-cone",
                name: "Basket Waffle Cone",
                description: "Big Waffle Cone with 2 scoops & toppings",
                price: 20000,
                image: "/images/menu-items/basket-waffle-cone.png",
                variants: [
                    { id: "basket-ultima", name: "Basket Ultima", price: 20000, image: "/images/menu-items/basket-waffle-ultima.png", description: "Big Waffle Cone With Red Velvet & Strawberry Ice Cream. Topped With Red Velvet Crumble, Pink Chocolate Chips, Strawberry Sauce, Strawberry Balls, A Strawberry Stick & Whipped Cream" },
                    { id: "forest-nest", name: "Forest Nest", price: 20000, image: "/images/menu-items/basket-waffle-forest-nest.png", description: "Big Waffle Cone With Chocolate Addiction & Salted-Butter Caramel, Topped With Brownie, Chocolate Fudge, Kit Kat, Chocolate Chips, Nuts and A Chocolate Stick and Whipped Cream" },
                    { id: "royal-fantastic", name: "Royal Fantastic", price: 20000, image: "/images/menu-items/basket-waffle-royal-fantastic.png", description: "Big Waffle Cone With Rajbhog Ice Cream & Pistachio Almond Fudge Ice Cream, Topped With Almonds, Pistachios, Cashews & Saffron Syrup and Whipped Cream" },
                    { id: "coffee-rush", name: "Coffee Rush", price: 20000, image: "/images/menu-items/basket-waffle-coffee-rush.png", description: "Big Waffle Cone With Coffee Caramel & Butterscotch Ice Cream, Topped With Brownie, Chocolate & Caramel Syrup Almonds and A Chocolate Stick and Whipped Cream" },
                ]
            },
            {
                id: "waffle-basket-sundae",
                name: "Waffle Basket Single Sundae",
                description: "Waffle Basket with toppings",
                price: 12000,
                image: "/images/menu-items/waffle-basket-single-sundae.png",
                variants: [
                    { id: "oreo-blueberry", name: "Oreo Blueberry", price: 12000, image: "/images/menu-items/waffle-basket-oreo.png", description: "Waffle Basket With Oreo BlueBerry Ice Cream Topped With Oreo Biscuit, Chocolate Sauce, Waffle Cream Biscuit & Whipped Cream" },
                    { id: "coffee-caramel", name: "Coffee Caramel", price: 12000, image: "/images/menu-items/waffle-basket-coffee.png", description: "Waffle Basket With Coffee Caramel Ice Cream Topped With Brownie, Caramel Sauce, Chocolate Sauce & Whipped Cream." },
                    { id: "strawberry-delight", name: "Strawberry Delight", price: 12000, image: "/images/menu-items/waffle-basket-strawberry.png", description: "Waffle Basket With Strawberry Ice Cream Topped With Sponge Cake, Strawberry Sauce, Strawberry Chocolate Chips, Mix Jelly, Waffle Cream Biscuit & Whipped Cream" },
                    { id: "farero-rocher", name: "Farero Rocher", price: 12000, image: "/images/menu-items/waffle-basket-ferrero.png", description: "Waffle Basket With Ferrero Blast Ice Cream Topped With Brownie, Chocolate Fudge Sauce, Waffle Cream Biscuit & Whipped Cream." },
                    { id: "choco-safari", name: "Choco Safari", price: 12000, image: "/images/menu-items/waffle-basket-safari.png", description: "Waffle Basket With Chocolate Addiction Ice Cream Topped With Brownie, Chocolate Chips, Chocolate Fudge Sauce, Waffle Cream Biscuit & Whipped Cream." },
                ]
            },
            {
                id: "triple-sundae",
                name: "Triple Sundae",
                description: "3 Scoops Premium Ice Cream with toppings",
                price: 20000,
                image: "/images/menu-items/triple-sundae.png",
                variants: [
                    { id: "signature-triple", name: "Signature Triple Sundae", price: 20000, description: "Vanilla, Strawberry, Chocolate + Fruits, Nuts, Chips", image: "/images/menu-items/triple-sundae.png" },
                    { id: "fruit-fantasy", name: "Fruit Fantasy Sundae", price: 20000, description: "Strawberry, Mango, Pineapple + Fruits, Jelly, Vermicili", image: "/images/menu-items/triple-sundae.png" },
                ]
            },
            {
                id: "jar-sundae",
                name: "Jar Sundae",
                description: "Creating Magic in a Jar",
                price: 20000,
                image: "/images/menu-items/jar-sundae.png",
                variants: [
                    { id: "caramel-crush", name: "Caramel Crush", price: 20000, description: "Salted Butter Caramel and Almond Carnival Ice Cream Topped With Brownie, Caramel & Chocolate Sauce, Choco Chips, A Choco Stick & Whipped Cream.", image: "/images/menu-items/jar-sundae-1.png" },
                    { id: "chocolate-mountain", name: "Chocolate Mountain", price: 20000, description: "Plain Chocolate and Chocolate Addiction Ice Cream, Topped With Brownie, Choco Chips, Chocolate Sauce, Choco Shots, Kit Kat, A Choco Stick & Whipped Cream.", image: "/images/menu-items/jar-sundae-2.png" },
                    { id: "rainbow-unicorn", name: "Rainbow Unicorn", price: 20000, description: "Rainbow Ice Cream Topped With Sponge Cake, Mix Jelly, M&Ms, Vermicelli, Strawberry & Pineapple Sauce, A Strawberry Stick & Whipped Cream.", image: "/images/menu-items/jar-sundae-3.png" },
                ]
            },
            {
                id: "frozen-tacos",
                name: "Frozen Tacos",
                description: "Taco Waffle with Ice Cream & Toppings",
                price: 20000,
                image: "/images/menu-items/frozen-tacos.png",
                variants: [
                    { id: "taco-chocolate", name: "Chocolate Taco", price: 20000, description: "Taco Waffle With Belgian Chocolate And Chocolate Addiction Ice Cream Topped With Brownie Chocolate Chips (White & Dark chips), White Chocolate & Brown Chocolate Dip & A Choco Stick & Whipped Cream.", image: "/images/menu-items/taco-chocolate.png" },
                    { id: "taco-fruit-fun", name: "Fruit Fun Taco", price: 20000, description: "Taco Waffle With Mango Fusion And Fresh Pineapple Ice Cream. Topped With Mango Flavored White Chocolate Dip, Sponge Cake, Pineapple and Mango Syrup, Nuts, Whipped Cream and Waffle Cream Biscuit", image: "/images/menu-items/taco-fruit-fun.png" },
                    { id: "taco-crazy", name: "Crazy Taco", price: 20000, description: "Strawberry Cheesecake and Red Velvet Cheesecake Ice Cream Topped With Mix Jelly, M&Ms, Vermicelli, Strawberry & Pineapple Sauce And A Strawberry Stick & Whipped Cream.", image: "/images/menu-items/taco-crazy.png" },
                ]
            },
            {
                id: "cold-slab",
                name: "Cold Slab",
                description: "Create your own Signature Ice Cream!",
                price: 20000,
                image: "/images/menu-items/cold-slab.png",
                variants: [
                    { id: "mix-munch", name: "Mix Munch", price: 20000, description: "Ice Cream: French Vanilla, Mango, Pineapple, Strawberry, Chocolate, Coffee Caramel, Strawberry Cheesecake, Kit Kat, Pistachio Almond Fudge, American Bites. Toppings: Brownie, M&M’s, Sponge Cake, Kit-Kat, Mixed Dry Fruits, Button Chocolate, Mixed Jelly, Oreo Biscuit, Wafer Biscuit. Sauces: Chocolate, Strawberry, Pineapple, Caramel, Choco-Fudge, Nutella.", image: "/images/menu-items/cold-slab.png" }
                ]
            },
            {
                id: "sizzling-volcano",
                name: "Sizzling Volcano",
                description: "Brownie on hot plate with Ice Cream & Fudge",
                price: 20000,
                image: "/images/menu-items/sizzling-volcano.png",
                variants: [
                    { id: "volcano-chocolate", name: "Chocolate Volcano", price: 20000, description: "Sizzler With Chocolate Ice Cream, Brownie, Chocolate Fudge & Nuts", image: "/images/menu-items/sizzling-volcano-chocolate.png" },
                    { id: "volcano-vanilla", name: "Vanilla Volcano", price: 20000, description: "Sizzler With Vanilla Ice Cream, Brownie, Chocolate Fudge & Nuts.", image: "/images/menu-items/sizzling-volcano-vanilla.png" },
                    { id: "volcano-oreo", name: "Oreo Volcano", price: 20000, description: "Sizzler With Oreo Ice Cream, Brownie, Chocolate Fudge, Coffee & Nuts.", image: "/images/menu-items/sizzling-volcano-oreo.png" },
                    { id: "volcano-coffee", name: "Coffee Volcano", price: 20000, description: "Sizzler with Coffee Caramel Ice Cream Brownie, Cookies, Coffee, Chocolate Fudge & Nuts.", image: "/images/menu-items/sizzling-volcano-coffee.png" },
                ]
            },
            {
                id: "classic-scoop",
                name: "Classic Scoops",
                description: "Timeless favorites",
                price: 6000,
                image: "/images/menu-items/classic-treat.png",
                variants: [
                    { id: "classic-french-vanilla", name: "French Vanilla", price: 6000, description: "Corn or Cup", image: "/images/menu-items/classic-french-vanilla.png" },
                    { id: "classic-strawberry", name: "Strawberry", price: 6000, description: "Corn or Cup", image: "/images/menu-items/classic-strawberry.png" },
                    { id: "classic-mango", name: "Mango", price: 6000, description: "Corn or Cup", image: "/images/menu-items/classic-mango.png" },
                    { id: "classic-chocolate-addiction", name: "Chocolate Addiction", price: 6000, description: "Corn or Cup", image: "/images/menu-items/classic-chocolate-addiction.png" },
                    { id: "classic-pineapple", name: "Pineapple", price: 6000, description: "Corn or Cup", image: "/images/menu-items/classic-pineapple.png" },
                    { id: "classic-coffee", name: "Coffee", price: 6000, description: "Corn or Cup", image: "/images/menu-items/classic-coffee.png" },
                    { id: "classic-banana", name: "Banana", price: 6000, description: "Corn or Cup", image: "/images/menu-items/classic-banana.png" },
                    { id: "classic-belgian-chocolate", name: "Belgian Chocolate", price: 6000, description: "Corn or Cup", image: "/images/menu-items/classic-belgian-chocolate.png" },
                    { id: "classic-chocolate", name: "Chocolate", price: 6000, description: "Corn or Cup", image: "/images/menu-items/classic-chocolate.png" },
                    { id: "classic-double", name: "Double Scoop", price: 10000, description: "Any two flavors in Cone or Cup", image: "/images/menu-items/classic-double-scoop.png" },
                ]
            },
            {
                id: "royal-scoop",
                name: "Royal Scoops",
                description: "Premium Dry Fruit flavors",
                price: 8000,
                image: "/images/menu-items/royal-scoops.png",
                variants: [
                    { id: "royal-mango-fusion", name: "Mango Fusion", price: 8000, description: "Cone or Cup", image: "/images/menu-items/royal-mango-fusion.png" },
                    { id: "royal-strawberry-cheesecake", name: "Strawberry Cheesecake", price: 8000, description: "Cone or Cup", image: "/images/menu-items/royal-strawberry-cheesecake.png" },
                    { id: "royal-pistachio", name: "Pistachio Almond Fudge", price: 8000, description: "Cone or Cup", image: "/images/menu-items/royal-pistachio.png" },
                    { id: "royal-red-velvet", name: "Red Velvet Cheesecake", price: 8000, description: "Cone or Cup", image: "/images/menu-items/royal-scoops.png" },
                    { id: "royal-ferrero", name: "Ferrero Blast", price: 8000, description: "Cone or Cup", image: "/images/menu-items/royal-ferrero.png" },
                    { id: "royal-salted-butter", name: "Salted Butter Caramel", price: 8000, description: "Cone or Cup", image: "/images/menu-items/royal-salted-butter.png" },
                    { id: "royal-baklava", name: "Baklava Ice Cream", price: 8000, description: "Cone or Cup", image: "/images/menu-items/royal-baklava.png" },
                    { id: "royal-black-forest", name: "Black Forest Cake Ice Cream", price: 8000, description: "Cone or Cup", image: "/images/menu-items/royal-black-forest.png" },
                    { id: "royal-double", name: "Double Scoop", price: 14000, description: "Any two flavors in Cone or Cup", image: "/images/menu-items/royal-double-scoop.png" },
                ]
            },
            {
                id: "taste-of-india",
                name: "Taste of India",
                description: "Desi flavors",
                price: 8000,
                image: "/images/menu-items/taste-of-india.png",
                variants: [
                    { id: "india-rajbhog", name: "Rajbhog", price: 8000, description: "Cone or Cup", image: "/images/menu-items/india-rajbhog.png" },
                    { id: "india-pan-masala", name: "Pan Masala", price: 8000, description: "Cone or Cup", image: "/images/menu-items/india-pan-masala.png" },
                    { id: "india-butterscotch", name: "Butterscotch", price: 8000, description: "Cone or Cup", image: "/images/menu-items/india-butterscotch.png" },
                    { id: "india-anjeer-honey", name: "Anjeer Honey", price: 8000, description: "Cone or Cup", image: "/images/menu-items/india-anjeer-honey.png" },
                    { id: "india-kesar-malti", name: "Kesar Malti", price: 8000, description: "Cone or Cup", image: "/images/menu-items/india-kesar-malti.png" },
                    { id: "india-mawa-kulfi", name: "Mawa Kulfi", price: 8000, description: "Cone or Cup", image: "/images/menu-items/india-mawa-kulfi.png" },
                    { id: "india-oreo-crumble", name: "Oreo Crumble", price: 8000, description: "Cone or Cup", image: "/images/menu-items/india-oreo-crumble.png" },
                    { id: "india-arabian-flights", name: "Arabian Flights", price: 8000, description: "Cone or Cup", image: "/images/menu-items/india-arabian-flights.png" },
                    { id: "india-american-bites", name: "American Bites", price: 8000, description: "Cone or Cup", image: "/images/menu-items/india-american-bites.png" },
                    { id: "india-almond-carnival", name: "Almond Carnival", price: 8000, description: "Cone or Cup", image: "/images/menu-items/india-almond-carnival.png" },
                    { id: "india-falooda", name: "Falooda Ice Cream", price: 8000, description: "Cone or Cup", image: "/images/menu-items/india-falooda.png" },
                    { id: "india-double", name: "Double Scoop", price: 14000, description: "Any two flavors in Cone or Cup", image: "/images/menu-items/india-double.png" },
                ]
            },
            {
                id: "natural-options",
                name: "Natural Options",
                description: "Fruit based scoops",
                price: 10000,
                image: "/images/menu-items/natural-options.png",
                variants: [
                    { id: "natural-mango", name: "Fresh Mango", price: 10000, description: "Cone or Cup", image: "/images/menu-items/natural-mango.png" },
                    { id: "natural-custard-apple", name: "Fresh Custard Apple", price: 10000, description: "Cone or Cup", image: "/images/menu-items/natural-custard-apple.png" },
                    { id: "natural-strawberry", name: "Fresh Strawberry", price: 10000, description: "Cone or Cup", image: "/images/menu-items/natural-strawberry.png" },
                    { id: "natural-pineapple", name: "Fresh Pineapple", price: 10000, description: "Cone or Cup", image: "/images/menu-items/natural-pineapple.png" },
                    { id: "natural-jamun", name: "Fresh Jamun", price: 10000, description: "Cone or Cup", image: "/images/menu-items/natural-jamun.png" },
                    { id: "natural-guava", name: "Fresh Guava", price: 10000, description: "Cone or Cup", image: "/images/menu-items/natural-guava.png" },
                    { id: "natural-chikoo", name: "Fresh Chikoo", price: 10000, description: "Cone or Cup", image: "/images/menu-items/natural-chikoo.png" },
                    { id: "natural-avocado", name: "Fresh Avocado", price: 10000, description: "Cone or Cup", image: "/images/menu-items/natural-avocado.png" },
                    { id: "natural-double", name: "Double Scoop", price: 18000, description: "Any two flavors in Cone or Cup", image: "/images/menu-items/natural-double.png" },
                ]
            },
            {
                id: "kids-delight",
                name: "Kids Delight",
                description: "Fun flavors for kids",
                price: 8000,
                image: "/images/menu-items/kids-delight.png",
                variants: [
                    { id: "kids-rainbow", name: "Rainbow", price: 8000, description: "Cone or Cup", image: "/images/menu-items/kids-rainbow.png" },
                    { id: "kids-kitkat", name: "Kitkat", price: 8000, description: "Cone or Cup", image: "/images/menu-items/kids-kitkat.png" },
                    { id: "kids-carnival", name: "Kids Carnival", price: 8000, description: "Cone or Cup", image: "/images/menu-items/kids-carnival.png" },
                    { id: "kids-oreo-blueberry", name: "Oreo Blueberry Cheesecake", price: 8000, description: "Cone or Cup", image: "/images/menu-items/kids-oreo-blueberry.png" },
                    { id: "kids-double", name: "Double Scoop", price: 14000, description: "Any two flavors in Cone or Cup", image: "/images/menu-items/kids-double.png" },
                ]
            }
        ],
    },
    drinks: {
        id: "drinks",
        title: "Drinks",
        description: "Refreshing Beverages",
        image: "/images/menu-items/milkshakes.png",
        items: [
            {
                id: "milkshakes",
                name: "Milkshakes",
                description: "Classic creamy shakes. Small: 10,000 UGX | Mega: 15,000 UGX",
                price: 10000,
                image: "/images/menu-items/milkshakes.png",
                variants: [
                    { id: "ms-vanilla", name: "Vanilla", price: 10000, description: "Small: 10,000 UGX | Mega: 15,000 UGX", image: "/images/menu-items/milkshake-vanilla.png" },
                    { id: "ms-strawberry", name: "Strawberry", price: 10000, description: "Small: 10,000 UGX | Mega: 15,000 UGX", image: "/images/menu-items/milkshake-strawberry.png" },
                    { id: "ms-chocolate", name: "Chocolate", price: 10000, description: "Small: 10,000 UGX | Mega: 15,000 UGX", image: "/images/menu-items/milkshake-chocolate.png" },
                    { id: "ms-mango", name: "Mango", price: 10000, description: "Small: 10,000 UGX | Mega: 15,000 UGX", image: "/images/menu-items/milkshake-mango.png" },
                    { id: "ms-pineapple", name: "Pineapple", price: 10000, description: "Small: 10,000 UGX | Mega: 15,000 UGX", image: "/images/menu-items/milkshake-pineapple.png" },
                    { id: "ms-coffee", name: "Coffee", price: 10000, description: "Small: 10,000 UGX | Mega: 15,000 UGX", image: "/images/menu-items/milkshake-coffee.png" },
                    { id: "ms-banana", name: "Banana", price: 10000, description: "Small: 10,000 UGX | Mega: 15,000 UGX", image: "/images/menu-items/milkshake-vanilla.png" },
                    { id: "ms-belgian-chocolate", name: "Belgian Chocolate", price: 10000, description: "Small: 10,000 UGX | Mega: 15,000 UGX", image: "/images/menu-items/milkshake-chocolate.png" },
                ]
            },
            {
                id: "thickshakes",
                name: "Thick Shakes",
                description: "Rich and thick shakes. Small: 10,000 UGX | Mega: 15,000 UGX",
                price: 10000,
                image: "/images/menu-items/thick-shakes.png",
                variants: [
                    { id: "ts-vanilla", name: "Vanilla", price: 10000, description: "Small: 10,000 UGX | Mega: 15,000 UGX", image: "/images/menu-items/thick-shake-vanilla.png" },
                    { id: "ts-strawberry", name: "Strawberry", price: 10000, description: "Small: 10,000 UGX | Mega: 15,000 UGX", image: "/images/menu-items/thick-shake-strawberry.png" },
                    { id: "ts-chocolate", name: "Chocolate", price: 10000, description: "Small: 10,000 UGX | Mega: 15,000 UGX", image: "/images/menu-items/thick-shake-chocolate.png" },
                    { id: "ts-mango", name: "Mango", price: 10000, description: "Small: 10,000 UGX | Mega: 15,000 UGX", image: "/images/menu-items/thick-shake-mango.png" },
                    { id: "ts-pineapple", name: "Pineapple", price: 10000, description: "Small: 10,000 UGX | Mega: 15,000 UGX", image: "/images/menu-items/thick-shake-pineapple.png" },
                    { id: "ts-choco-brownie", name: "Choco Brownie", price: 10000, description: "Small: 10,000 UGX | Mega: 15,000 UGX", image: "/images/menu-items/thick-shake-choco-brownie.png" },
                    { id: "ts-oreo", name: "Oreo", price: 10000, description: "Small: 10,000 UGX | Mega: 15,000 UGX", image: "/images/menu-items/thick-shake-oreo.png" },
                    { id: "ts-kitkat", name: "Kit Kat", price: 10000, description: "Small: 10,000 UGX | Mega: 15,000 UGX", image: "/images/menu-items/thick-shake-kitkat.png" },
                    { id: "ts-rajbhog", name: "Rajbhog", price: 10000, description: "Small: 10,000 UGX | Mega: 15,000 UGX", image: "/images/menu-items/thick-shake-rajbhog.png" },
                ]
            },
            {
                id: "bubble-tea",
                name: "Bubble Tea",
                description: "Chewy Tapioca pearls in tea",
                price: 15000,
                image: "/images/menu-items/bubble-tea.png",
                variants: [
                    { id: "bt-strawberry", name: "Strawberry", price: 15000, description: "Fruit Tea or Milk Tea", image: "/images/menu-items/bubble-tea-strawberry.png" },
                    { id: "bt-chocolate", name: "Chocolate", price: 15000, description: "Fruit Tea or Milk Tea", image: "/images/menu-items/bubble-tea-chocolate.png" },
                    { id: "bt-mango", name: "Mango", price: 15000, description: "Fruit Tea or Milk Tea", image: "/images/menu-items/bubble-tea-mango.png" },
                    { id: "bt-blueberry", name: "Blueberry", price: 15000, description: "Fruit Tea or Milk Tea", image: "/images/menu-items/bubble-tea-blueberry.png" },
                    { id: "bt-orange", name: "Orange", price: 15000, description: "Fruit Tea or Milk Tea", image: "/images/menu-items/bubble-tea-orange.png" },
                    { id: "bt-green-apple", name: "Green Apple", price: 15000, description: "Fruit Tea or Milk Tea", image: "/images/menu-items/bubble-tea-green-apple.png" },
                    { id: "bt-passion", name: "Passion", price: 15000, description: "Fruit Tea or Milk Tea", image: "/images/menu-items/bubble-tea-passion.png" },
                    { id: "bt-mixed-fruit", name: "Mixed Fruit", price: 15000, description: "Fruit Tea or Milk Tea", image: "/images/menu-items/bubble-tea-mixed-fruit.png" },
                ]
            },
            {
                id: "faluda",
                name: "Faluda",
                description: "Traditional rose milk dessert drink",
                price: 15000,
                image: "/images/menu-items/falooda.png",
                variants: [
                    { id: "falooda-mango", name: "Mango Falooda", price: 15000, description: "Mango Syrup, Sweet Basil Seeds, Vermicelli, Milk, Vanilla Ice Cream, Nuts", image: "/images/menu-items/falooda-mango.png" },
                    { id: "falooda-rose", name: "Classic Rose Falooda", price: 15000, description: "Rose Syrup, Sweet Basil Seeds, Vermicelli, Milk, Rose Ice Cream, Nuts", image: "/images/menu-items/falooda-rose.png" },
                    { id: "falooda-rabdi", name: "Rabdi Falooda", price: 15000, description: "Rabdi, Sweet Basil Seeds, Vermicelli, Jelly, Rose Syrup, Milk, Rabdi Ice Cream, Nuts", image: "/images/menu-items/falooda-rose.png" },
                ]
            }
        ]
    },
    bakery: {
        id: "bakery",
        title: "Bakery",
        description: "Freshly baked goodness",
        image: "/images/menu-items/chocolate-cake.png",
        items: [
            {
                id: "cakes",
                name: "Cakes",
                description: "Delicious slices",
                price: 15000,
                image: "/images/menu-items/chocolate-cake.png",
                variants: [
                    { id: "cake-chocolate", name: "Chocolate Truffle", price: 15000, image: "/images/menu-items/chocolate-cake.png" },
                    { id: "cake-red-velvet", name: "Red Velvet", price: 15000, image: "/images/menu-items/red-velvet.png" },
                    { id: "cake-black-forest", name: "Black Forest", price: 15000, image: "/images/menu-items/black-forest.png" },
                    { id: "cake-vanilla", name: "Vanilla", price: 15000, image: "/images/menu-items/vanilla-cake.png" },
                ]
            },

            {
                id: "waffles",
                name: "Waffles",
                description: "Choose From Our Selection Of Toppings And Sauces (Honey, Chocolate sauce, Caramel sauce, Strawberry sauce, Vanilla sauce, Peanut butter, Jam, Nutella). Toppings: Strawberry, Banana, Blueberry, Sprinkles, Chocolate chips, Chocolate flakes",
                price: 10000,
                video: "",
                image: "/images/menu-items/waffle-chocolate.png"
            },
            {
                id: "pancakes",
                name: "Pancakes",
                description: "Choose From Our Selection Of Toppings And Sauces (Strawberry, Banana, Blueberry, Sprinkles, Chocolate chips, Chocolate flakes, Honey, Chocolate sauce, Caramel sauce...)",
                price: 10000,
                image: "/images/menu-items/pancakes.png"
            },
            {
                id: "crepes",
                name: "Crepes",
                description: "Choose From Our Selection Of Toppings And Sauces (Strawberry, Banana, Blueberry, Sprinkles, Chocolate chips, Chocolate flakes...)",
                price: 12000,
                video: "",
                image: "/images/menu-items/crepes.png"
            },
            {
                id: "donuts",
                name: "Donuts",
                description: "Freshly glazed donuts",
                price: 8000,
                image: "/images/menu-items/donut-chocolate.png",
                variants: [
                    { id: "donut-chocolate", name: "Chocolate Donut", price: 8000, image: "/images/menu-items/donut-chocolate.png" },
                    { id: "donut-strawberry", name: "Strawberry Iced Donut", price: 8000, image: "/images/menu-items/donut-strawberry.png" },
                    { id: "donut-orange", name: "Orange Iced Donut", price: 8000, image: "/images/menu-items/donut-orange.png" },
                    { id: "donut-sugar", name: "Sugar Iced Donut", price: 8000, image: "/images/menu-items/donut-sugar.png" },
                ]
            }

        ]
    }
}
