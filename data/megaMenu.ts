export interface MegaMenuSection {
  title: string;
  items: { label: string; href: string; badge?: string; filterCategory?: string; filterAge?: string; filterGender?: string }[];
}

export interface MegaMenuItem {
  label: string;
  href: string;
  featured?: {
    title: string;
    description: string;
    imageUrl: string;
    cta: string;
    badge: string;
    color: string;
  };
  sections?: MegaMenuSection[];
}

export const MEGA_MENU_DATA: Record<string, MegaMenuItem> = {
  "Shop by Age": {
    label: "Shop by Age",
    href: "#",
    featured: {
      title: "Newborn Essentials",
      description: "Cloud-soft organic layers crafted for delicate first months.",
      imageUrl: "/products/heirloom-baby-set.jpg",
      cta: "Explore 0-24M",
      badge: "Pure Cotton",
      color: "border-brand-mint text-brand-mint",
    },
    sections: [
      {
        title: "Baby (0 - 24 Months)",
        items: [
          { label: "Newborn Bodysuits", href: "#", filterAge: "Baby (0-24M)" },
          { label: "Sleep & Play Rompers", href: "#", filterAge: "Baby (0-24M)" },
          { label: "Teethers & Rattles", href: "#", filterAge: "Baby (0-24M)" },
          { label: "Swaddles & Bibs", href: "#", filterAge: "Baby (0-24M)" },
        ],
      },
      {
        title: "Toddler (2 - 4 Years)",
        items: [
          { label: "Playground Dungarees", href: "#", filterAge: "Toddler (2-4Y)" },
          { label: "Twirl Meadow Dresses", href: "#", filterAge: "Toddler (2-4Y)" },
          { label: "Montessori Wooden Sets", href: "#", filterAge: "Toddler (2-4Y)" },
          { label: "Easy-On Footwear", href: "#", filterAge: "Toddler (2-4Y)" },
        ],
      },
      {
        title: "Kids (5 - 12 Years)",
        items: [
          { label: "Everyday Active Hoodies", href: "#", filterAge: "Kids (5-12Y)" },
          { label: "Weekend Party Dresses", href: "#", filterAge: "Kids (5-12Y)" },
          { label: "Backpacks & Hats", href: "#", filterAge: "Kids (5-12Y)" },
          { label: "Cozy Pajama Sets", href: "#", filterAge: "Kids (5-12Y)" },
        ],
      },
    ],
  },
  "Shop by Gender": {
    label: "Shop by Gender",
    href: "#",
    featured: {
      title: "Denim Peter Pan Collar Dress",
      description: "Classic embroidered Peter Pan collar crafted with soft organic chambray.",
      imageUrl: "/products/sunbeam-tiered-dress.jpg",
      cta: "Shop Girls Collection",
      badge: "Trending in Girls",
      color: "border-brand-coral text-brand-coral",
    },
    sections: [
      {
        title: "Girls Collection",
        items: [
          { label: "Denim Peter Pan Collar Dress", href: "#", filterGender: "Girls", badge: "New" },
          { label: "Butterfly Quilted Collar Dress", href: "#", filterGender: "Girls", badge: "New" },
          { label: "Forest Gingham Pinafore Dress", href: "#", filterGender: "Girls", badge: "Trending" },
          { label: "Mushroom Embroidered Pinafore Dress", href: "#", filterGender: "Girls", badge: "New" },
          { label: "Heirloom Embroidered Pinafore Dress", href: "#", filterGender: "Girls", badge: "New" },
          { label: "Tartan Eyelet Lace Bubble Dress", href: "#", filterGender: "Girls", badge: "New" },
          { label: "Floral Peter Pan Ruffle Blouse", href: "#", filterGender: "Girls", badge: "New" },
          { label: "Botanical Meadow Dress & Vest", href: "#", filterGender: "Girls", badge: "New" },
          { label: "Watercolor Floral Flutter Dress", href: "#", filterGender: "Girls", badge: "New" },
          { label: "Floral Bow Suspender Skirt Set", href: "#", filterGender: "Girls", badge: "New" },
          { label: "Flutter Ruffle Top & Shorts Set", href: "#", filterGender: "Girls", badge: "New" },
          { label: "Avocado Flutter Top & Bloomer Set", href: "#", filterGender: "Girls", badge: "New" },
          { label: "Unicorn Ruffle Shortall Romper", href: "#", filterGender: "Girls", badge: "New" },
          { label: "Ocean Friends Flutter Dress Set", href: "#", filterGender: "Girls", badge: "New" },
          { label: "Sweet Treats & Bunny Shorts Set", href: "#", filterGender: "Girls", badge: "New" },
          { label: "Youth Culture Washed Tee", href: "#", filterGender: "Girls", badge: "Trending" },
          { label: "Modern Typo Texture Tee", href: "#", filterGender: "Girls", badge: "New" },
          { label: "Organic Tank & Shorts Play Set", href: "#", filterGender: "Girls", badge: "Organic" },
          { label: "Floral & Twirl Dresses", href: "#", filterGender: "Girls" },
          { label: "Cardigans & Sweaters", href: "#", filterGender: "Girls" },
          { label: "Hair Clips & Sunnies", href: "#", filterGender: "Girls" },
        ],
      },
      {
        title: "Boys Collection",
        items: [
          { label: "Little Champ Chambray Romper", href: "#", filterGender: "Boys", badge: "New" },
          { label: "Daddy's Boy Jogger Set", href: "#", filterGender: "Boys", badge: "New" },
          { label: "Captain & Adventurer Suspender Set", href: "#", filterGender: "Boys", badge: "New" },
          { label: "Denim Vest & Bow Tie Suit Set", href: "#", filterGender: "Boys", badge: "New" },
          { label: "Little Gentleman Pinstripe Vest Set", href: "#", filterGender: "Boys", badge: "New" },
          { label: "Car Henley & Dot Shorts Set", href: "#", filterGender: "Boys", badge: "New" },
          { label: "Organic Tank & Shorts Play Set", href: "#", filterGender: "Boys", badge: "Organic" },
          { label: "Youth Culture Graphic Tee", href: "#", filterGender: "Boys", badge: "Trending" },
          { label: "Modern Typo Texture Tee", href: "#", filterGender: "Boys", badge: "New" },
          { label: "Graphic Tees & Henleys", href: "#", filterGender: "Boys" },
          { label: "Corduroy Dungarees", href: "#", filterGender: "Boys" },
          { label: "Outdoor Jackets", href: "#", filterGender: "Boys" },
          { label: "Caps & Beanies", href: "#", filterGender: "Boys" },
        ],
      },
      {
        title: "Gender Neutral",
        items: [
          { label: "Organic Tank & Shorts Play Set", href: "#", filterGender: "Gender Neutral", badge: "Organic" },
          { label: "Youth Culture Streetwear Tee", href: "#", filterGender: "Gender Neutral", badge: "Trending" },
          { label: "Modern Typo Texture Tee", href: "#", filterGender: "Gender Neutral", badge: "New" },
          { label: "Pure Organic Basics", href: "#", filterGender: "Gender Neutral", badge: "Eco" },
          { label: "Everyday Loungewear", href: "#", filterGender: "Gender Neutral" },
          { label: "Puddle Boots & Rainwear", href: "#", filterGender: "Gender Neutral" },
          { label: "Unisex Play Sets", href: "#", filterGender: "Gender Neutral" },
        ],
      },
    ],
  },
  "Toys": {
    label: "Toys",
    href: "#",
    featured: {
      title: "Montessori Wooden Magic",
      description: "Plastic-free toys built with sustainably harvested timber.",
      imageUrl: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80",
      cta: "Shop Wooden Toys",
      badge: "Zero Plastic",
      color: "border-brand-yellow text-brand-yellow-hover",
    },
    sections: [
      {
        title: "Wooden & Open-Ended",
        items: [
          { label: "Rainbow Arch Stackers", href: "#", filterCategory: "Toys & Games" },
          { label: "Forest Animal Puzzles", href: "#", filterCategory: "Toys & Games" },
          { label: "Balance Boards & Blocks", href: "#", filterCategory: "Toys & Games" },
          { label: "Push Along Toys", href: "#", filterCategory: "Toys & Games" },
        ],
      },
      {
        title: "Plush & Comfort",
        items: [
          { label: "Character Dolls & Plush Playsets", href: "#", filterCategory: "Toys & Games", badge: "New" },
          { label: "Organic Cuddle Bunnies", href: "#", filterCategory: "Toys & Games", badge: "Best Love" },
          { label: "Sherpa Sleep Companions", href: "#", filterCategory: "Toys & Games" },
          { label: "Sensory Soft Rattles", href: "#", filterCategory: "Toys & Games" },
        ],
      },
      {
        title: "Creative & Learning",
        items: [
          { label: "Action Playsets & Learning Toys", href: "#", filterCategory: "Toys & Games", badge: "New" },
          { label: "Soy-Ink Coloring Books", href: "#", filterCategory: "Toys & Games" },
          { label: "STEM Construction Kits", href: "#", filterCategory: "Toys & Games" },
          { label: "Pretend Play Kitchen", href: "#", filterCategory: "Toys & Games" },
        ],
      },
    ],
  },
  "Accessories": {
    label: "Accessories",
    href: "#",
    featured: {
      title: "Playproof Gear",
      description: "UV400 sunglasses, stay-put beanies, and toddler-proof mealtime.",
      imageUrl: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80",
      cta: "Explore All Accessories",
      badge: "Trending",
      color: "border-brand-coral text-brand-coral",
    },
    sections: [
      {
        title: "Headwear & Sun Care",
        items: [
          { label: "Flower Blossom Rimless Sunnies", href: "#", filterCategory: "Accessories", badge: "New" },
          { label: "Kids Novelty Character Caps", href: "#", filterCategory: "Accessories", badge: "New" },
          { label: "Wide-Brim Sun Hats", href: "#", filterCategory: "Accessories" },
        ],
      },
      {
        title: "Mealtime & Care",
        items: [
          { label: "Kids Digital & Learning Watches", href: "#", filterCategory: "Accessories", badge: "New" },
          { label: "Catch-All Bibs", href: "#", filterCategory: "Accessories" },
          { label: "Stainless Sippy Bottles", href: "#", filterCategory: "Accessories" },
        ],
      },
      {
        title: "Bags & Small Wonders",
        items: [
          { label: "Floral & Plush Hairbands", href: "#", filterCategory: "Accessories", badge: "New" },
          { label: "Embellished Summer Sandals", href: "#", filterCategory: "Accessories", badge: "New" },
          { label: "Novelty Character Socks Multi-Pack", href: "#", filterCategory: "Accessories", badge: "New" },
          { label: "Mini Kid Backpacks", href: "#", filterCategory: "Accessories" },
        ],
      },
    ],
  },
  "Sale": {
    label: "Sale",
    href: "#",
    featured: {
      title: "Spring Clear-Out",
      description: "Up to 40% off past-season styles while supplies last.",
      imageUrl: "/products/sunbeam-tiered-dress.jpg",
      cta: "Shop All Deals",
      badge: "Up to 40% Off",
      color: "border-red-500 text-red-500",
    },
    sections: [
      {
        title: "By Discount",
        items: [
          { label: "Under $25 Steals", href: "#", badge: "Hot" },
          { label: "30% - 50% Off Outfits", href: "#" },
          { label: "Last Chance Clearance", href: "#" },
        ],
      },
      {
        title: "Featured Deals",
        items: [
          { label: "Sunbeam Meadow Dress (-25%)", href: "#" },
          { label: "Kids Novelty Character Caps (-25%)", href: "#" },
          { label: "Kids Learning Watches (-25%)", href: "#" },
        ],
      },
    ],
  },
};

