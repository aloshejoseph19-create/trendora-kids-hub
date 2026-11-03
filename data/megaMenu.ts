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
      imageUrl: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=600&q=80",
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
      title: "Playtime Mix & Match",
      description: "Durable staples made for sibling hand-me-downs.",
      imageUrl: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=600&q=80",
      cta: "Shop Gender-Neutral",
      badge: "Staff Pick",
      color: "border-brand-blue text-brand-blue",
    },
    sections: [
      {
        title: "Girls Collection",
        items: [
          { label: "Floral & Twirl Dresses", href: "#", filterGender: "Girls" },
          { label: "Cardigans & Sweaters", href: "#", filterGender: "Girls" },
          { label: "Leggings & Skirts", href: "#", filterGender: "Girls" },
          { label: "Hair Clips & Sunnies", href: "#", filterGender: "Girls" },
        ],
      },
      {
        title: "Boys Collection",
        items: [
          { label: "Graphic Tees & Henleys", href: "#", filterGender: "Boys" },
          { label: "Corduroy Dungarees", href: "#", filterGender: "Boys" },
          { label: "Outdoor Jackets", href: "#", filterGender: "Boys" },
          { label: "Caps & Beanies", href: "#", filterGender: "Boys" },
        ],
      },
      {
        title: "Gender Neutral",
        items: [
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
          { label: "Organic Cuddle Bunnies", href: "#", filterCategory: "Toys & Games", badge: "Best Love" },
          { label: "Sherpa Sleep Companions", href: "#", filterCategory: "Toys & Games" },
          { label: "Sensory Soft Rattles", href: "#", filterCategory: "Toys & Games" },
        ],
      },
      {
        title: "Creative & Learning",
        items: [
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
          { label: "Flexible UV400 Sunnies", href: "#", filterCategory: "Accessories" },
          { label: "Chunky Pom-Pom Beanies", href: "#", filterCategory: "Accessories" },
          { label: "Wide-Brim Sun Hats", href: "#", filterCategory: "Accessories" },
        ],
      },
      {
        title: "Mealtime & Care",
        items: [
          { label: "Silicone Suction Sets", href: "#", filterCategory: "Accessories", badge: "Must Have" },
          { label: "Catch-All Bibs", href: "#", filterCategory: "Accessories" },
          { label: "Stainless Sippy Bottles", href: "#", filterCategory: "Accessories" },
        ],
      },
      {
        title: "Bags & Small Wonders",
        items: [
          { label: "Mini Kid Backpacks", href: "#", filterCategory: "Accessories" },
          { label: "Organic Cotton Hairbands", href: "#", filterCategory: "Accessories" },
          { label: "Seamless Bamboo Socks", href: "#", filterCategory: "Accessories" },
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
      imageUrl: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80",
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
          { label: "Pom-Pom Merino Beanie (-25%)", href: "#" },
          { label: "Suction Mealtime Set (-20%)", href: "#" },
        ],
      },
    ],
  },
};
