export type GarmentSilhouette = 'lehenga' | 'sherwani' | 'frock' | 'kurta';

export interface ColorSwatch {
  id: string;
  name: string;
  primaryHex: string;
  secondaryHex: string;
  accentHex: string;
}

export interface KidsProduct {
  id: string;
  name: string;
  category: 'Girls Festive' | 'Boys Ethnic' | 'Party Frocks' | 'Everyday Cotton';
  ageRange: string;
  ageGroups: string[];
  fabric: string;
  price: number;
  originalPrice?: number;
  statusTag: string;
  image: string;
  silhouette: GarmentSilhouette;
  description: string;
  craftsmanshipNotes: string[];
  swatches: ColorSwatch[];
  measurements: {
    sizeLabel: string;
    chestInches: string;
    lengthInches: string;
  }[];
}

export interface CustomerReview {
  id: string;
  author: string;
  roleOrContext: string;
  rating: number;
  dateText: string;
  comment: string;
  purchasedItem: string;
}

export const STORE_INFO = {
  name: 'Asha Dresses NX',
  displayName: 'Asha Dresses nx',
  rating: 5.0,
  reviewCount: 3,
  category: 'Clothing store',
  hoursStatus: 'Open',
  closesAt: 'Closes 8:30 pm',
  fullHours: 'Monday – Sunday: 10:00 am – 8:30 pm',
  address: 'near Hanuman mandir, Civil Lines, Tilak Nagar, Bilaspur, Chhattisgarh 495001',
  shortLocation: 'Near Hanuman Mandir, Civil Lines, Tilak Nagar, Bilaspur',
  cityStatePin: 'Bilaspur, Chhattisgarh 495001',
  phoneDisplay: '098269 21422',
  phoneDial: '+919826921422',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Asha+Dresses+nx+near+Hanuman+mandir+Civil+Lines+Tilak+Nagar+Bilaspur+Chhattisgarh+495001',
  showroomImage: '/src/assets/images/store_interior_lookbook_1791094242897.jpg',
};

export const PRODUCTS: KidsProduct[] = [
  {
    id: 'asha-crimson-lehenga-01',
    name: 'Maharani Crimson & Ivory Zari Lehenga Choli',
    category: 'Girls Festive',
    ageRange: 'Ages 2–12 Yrs',
    ageGroups: ['1–3 Yrs', '4–6 Yrs', '7–10 Yrs', '11–14 Yrs'],
    fabric: 'Pure Silk Blend & Soft Cotton Lining',
    price: 2850,
    originalPrice: 3200,
    statusTag: 'Signature Festive',
    image: '/src/assets/images/kids_crimson_lehenga_1791094188833.jpg',
    silhouette: 'lehenga',
    description:
      'Hand-finished crimson red and warm ivory festive lehenga crafted with lightweight zari embroidery and a breathable 100% mulmul cotton inner lining for all-day comfort during weddings and celebrations.',
    craftsmanshipNotes: [
      'Zero-itch organic cotton lining tailored for sensitive young skin',
      'Adjustable drawstring waist with handcrafted golden latkan tassels',
      'Complimentary custom hem adjustment at our Tilak Nagar showroom',
    ],
    swatches: [
      {
        id: 'crimson-ivory',
        name: 'Sindoor Crimson & Ivory',
        primaryHex: '#B91C1C',
        secondaryHex: '#FAF6F0',
        accentHex: '#D97706',
      },
      {
        id: 'ruby-gold',
        name: 'Royal Ruby & Champagne',
        primaryHex: '#9F1239',
        secondaryHex: '#F5EFE6',
        accentHex: '#F59E0B',
      },
      {
        id: 'alabaster-red',
        name: 'Alabaster Pearl & Vermilion',
        primaryHex: '#F5F2EB',
        secondaryHex: '#DC2626',
        accentHex: '#B45309',
      },
    ],
    measurements: [
      { sizeLabel: '2–3 Yrs', chestInches: '21.0"', lengthInches: '22.5"' },
      { sizeLabel: '4–5 Yrs', chestInches: '23.0"', lengthInches: '26.0"' },
      { sizeLabel: '6–8 Yrs', chestInches: '25.5"', lengthInches: '30.0"' },
      { sizeLabel: '9–12 Yrs', chestInches: '28.5"', lengthInches: '34.5"' },
    ],
  },
  {
    id: 'asha-red-sherwani-02',
    name: 'Tilak Royal Crimson & Pearl Silk Sherwani Set',
    category: 'Boys Ethnic',
    ageRange: 'Ages 2–14 Yrs',
    ageGroups: ['1–3 Yrs', '4–6 Yrs', '7–10 Yrs', '11–14 Yrs'],
    fabric: 'Raw Silk Brocade & Ivory Churidar',
    price: 3190,
    originalPrice: 3600,
    statusTag: 'Bestseller',
    image: '/src/assets/images/kids_red_sherwani_1791094202657.jpg',
    silhouette: 'sherwani',
    description:
      'Structured Indo-Western boys sherwani jacket in deep crimson with delicate zari collar trim, antique brass buttons, and an alabaster white soft-stretch cotton silk churidar trouser.',
    craftsmanshipNotes: [
      'Featherlight shoulder padding for unrestricted movement and play',
      'Detachable silk pocket square and concealed front placket fastenings',
      'Breathable sweat-absorbent inner collar band',
    ],
    swatches: [
      {
        id: 'crimson-pearl',
        name: 'Royal Crimson & Pearl',
        primaryHex: '#C81E2B',
        secondaryHex: '#F8F6F2',
        accentHex: '#D97706',
      },
      {
        id: 'ivory-crimson',
        name: 'Ivory Silk & Crimson Collar',
        primaryHex: '#F4F1EA',
        secondaryHex: '#991B1B',
        accentHex: '#B45309',
      },
      {
        id: 'maroon-gold',
        name: 'Deep Garnet & Antique Gold',
        primaryHex: '#7F1D1D',
        secondaryHex: '#FAF5EE',
        accentHex: '#F59E0B',
      },
    ],
    measurements: [
      { sizeLabel: '2–3 Yrs', chestInches: '22.0"', lengthInches: '18.5"' },
      { sizeLabel: '4–6 Yrs', chestInches: '24.5"', lengthInches: '21.5"' },
      { sizeLabel: '7–10 Yrs', chestInches: '27.5"', lengthInches: '25.0"' },
      { sizeLabel: '11–14 Yrs', chestInches: '31.0"', lengthInches: '28.5"' },
    ],
  },
  {
    id: 'asha-tulle-frock-03',
    name: 'Ruby Organza & Alabaster Satin Party Frock',
    category: 'Party Frocks',
    ageRange: 'Ages 1–10 Yrs',
    ageGroups: ['1–3 Yrs', '4–6 Yrs', '7–10 Yrs'],
    fabric: 'Japanese Organza Tulle & Matte Satin',
    price: 2290,
    statusTag: 'New Arrival',
    image: '/src/assets/images/kids_tulle_party_frock_1791094219252.jpg',
    silhouette: 'frock',
    description:
      'Architectural tiered party frock featuring a sculpted ruby red satin bodice, pearl-white and crimson cloud organza ruffles, and a detachable tailored waist bow.',
    craftsmanshipNotes: [
      'Four-layer soft crinoline volume without stiff wire hoops',
      'Covered back zipper guard so metal never touches skin',
      'Machine-washable delicate weave with wrinkle-resistant finish',
    ],
    swatches: [
      {
        id: 'ruby-alabaster',
        name: 'Ruby Red & Alabaster White',
        primaryHex: '#DC2626',
        secondaryHex: '#FFFFFF',
        accentHex: '#FCA5A5',
      },
      {
        id: 'white-crimson',
        name: 'Porcelain White & Crimson Sash',
        primaryHex: '#FAF8F5',
        secondaryHex: '#B91C1C',
        accentHex: '#E11D48',
      },
      {
        id: 'rose-berry',
        name: 'Crimson Berry & Blush',
        primaryHex: '#9F1239',
        secondaryHex: '#FFF1F2',
        accentHex: '#FB7185',
      },
    ],
    measurements: [
      { sizeLabel: '1–2 Yrs', chestInches: '20.0"', lengthInches: '20.0"' },
      { sizeLabel: '3–4 Yrs', chestInches: '22.0"', lengthInches: '23.5"' },
      { sizeLabel: '5–7 Yrs', chestInches: '24.5"', lengthInches: '27.5"' },
      { sizeLabel: '8–10 Yrs', chestInches: '27.0"', lengthInches: '31.0"' },
    ],
  },
  {
    id: 'asha-cotton-kurta-04',
    name: 'Vermilion Motif Handloom Cotton Kurta & Dhoti Set',
    category: 'Everyday Cotton',
    ageRange: 'Ages 1–12 Yrs',
    ageGroups: ['1–3 Yrs', '4–6 Yrs', '7–10 Yrs', '11–14 Yrs'],
    fabric: '100% Combed Chhattisgarhi & Mulmul Cotton',
    price: 1450,
    statusTag: 'In Stock',
    image: '/src/assets/images/kids_cotton_kurta_set_1791094230098.jpg',
    silhouette: 'kurta',
    description:
      'Ultra-breathable off-white combed cotton angarkha kurta accented with traditional vermilion red woven borders and pre-pleated elastic-waist dhoti pants for effortless festive dressing.',
    craftsmanshipNotes: [
      'Azo-free natural dyes safe for toddlers and warm Bilaspur summers',
      'Pre-stitched slip-on dhoti with soft stretch waistband',
      'Side tie-ups with hand-knotted cotton pom-poms',
    ],
    swatches: [
      {
        id: 'offwhite-vermilion',
        name: 'Chalk White & Vermilion Border',
        primaryHex: '#F7F4EE',
        secondaryHex: '#DC2626',
        accentHex: '#D97706',
      },
      {
        id: 'vermilion-ivory',
        name: 'Vermilion Red & Ivory Weave',
        primaryHex: '#C81E2B',
        secondaryHex: '#FAF8F5',
        accentHex: '#F59E0B',
      },
    ],
    measurements: [
      { sizeLabel: '1–3 Yrs', chestInches: '21.0"', lengthInches: '16.5"' },
      { sizeLabel: '4–6 Yrs', chestInches: '23.5"', lengthInches: '19.5"' },
      { sizeLabel: '7–9 Yrs', chestInches: '26.5"', lengthInches: '23.0"' },
      { sizeLabel: '10–12 Yrs', chestInches: '29.0"', lengthInches: '26.0"' },
    ],
  },
  {
    id: 'asha-festive-cape-lehenga-05',
    name: 'Civil Lines Heritage Velvet Peplum & Lehenga Set',
    category: 'Girls Festive',
    ageRange: 'Ages 3–14 Yrs',
    ageGroups: ['4–6 Yrs', '7–10 Yrs', '11–14 Yrs'],
    fabric: 'Micro-Velvet & Organza Silk',
    price: 2990,
    originalPrice: 3450,
    statusTag: 'Limited Run',
    image: '/src/assets/images/kids_crimson_lehenga_1791094188833.jpg',
    silhouette: 'lehenga',
    description:
      'Regal crimson micro-velvet peplum top paired with an ivory flared silk skirt and delicate resham floral border, designed for winter weddings and family portraits.',
    craftsmanshipNotes: [
      'Plush feather-weight velvet that drapes softly without bulk',
      'Includes matching hair-band and potli bag for little girls',
      'Extra 1.5-inch inner seam allowance for growing children',
    ],
    swatches: [
      {
        id: 'velvet-crimson',
        name: 'Crimson Velvet & Pearl',
        primaryHex: '#991B1B',
        secondaryHex: '#FAF7F2',
        accentHex: '#D97706',
      },
      {
        id: 'scarlet-snow',
        name: 'Scarlet Red & Snow Ivory',
        primaryHex: '#DC2626',
        secondaryHex: '#FFFFFF',
        accentHex: '#F59E0B',
      },
    ],
    measurements: [
      { sizeLabel: '3–5 Yrs', chestInches: '22.5"', lengthInches: '25.0"' },
      { sizeLabel: '6–8 Yrs', chestInches: '25.0"', lengthInches: '29.5"' },
      { sizeLabel: '9–11 Yrs', chestInches: '28.0"', lengthInches: '33.5"' },
      { sizeLabel: '12–14 Yrs', chestInches: '30.5"', lengthInches: '37.0"' },
    ],
  },
  {
    id: 'asha-boys-bandhgala-06',
    name: 'Hanuman Chowk Ivory & Crimson Jodhpuri Bandhgala',
    category: 'Boys Ethnic',
    ageRange: 'Ages 3–14 Yrs',
    ageGroups: ['4–6 Yrs', '7–10 Yrs', '11–14 Yrs'],
    fabric: 'Italian Textured Cotton Blend',
    price: 2750,
    statusTag: 'In Stock',
    image: '/src/assets/images/kids_red_sherwani_1791094202657.jpg',
    silhouette: 'sherwani',
    description:
      'Sharp tailored Jodhpuri bandhgala jacket in warm alabaster and crimson piping, paired with tailored straight-fit trousers and an embroidered crest brooch.',
    craftsmanshipNotes: [
      'Stain-repellent finish ideal for family receptions and festive dinners',
      'Half-elasticated trouser waist with belt loops for a neat fit',
      'Available for same-day pickup at our Civil Lines, Bilaspur store',
    ],
    swatches: [
      {
        id: 'alabaster-crimson',
        name: 'Alabaster White & Crimson Trim',
        primaryHex: '#F5F2EB',
        secondaryHex: '#B91C1C',
        accentHex: '#D97706',
      },
      {
        id: 'crimson-classic',
        name: 'Classic Crimson & Ivory',
        primaryHex: '#B91C1C',
        secondaryHex: '#FAF8F5',
        accentHex: '#F59E0B',
      },
    ],
    measurements: [
      { sizeLabel: '3–5 Yrs', chestInches: '23.0"', lengthInches: '17.5"' },
      { sizeLabel: '6–8 Yrs', chestInches: '25.5"', lengthInches: '20.5"' },
      { sizeLabel: '9–11 Yrs', chestInches: '28.0"', lengthInches: '23.5"' },
      { sizeLabel: '12–14 Yrs', chestInches: '31.0"', lengthInches: '26.5"' },
    ],
  },
];

export const INITIAL_GOOGLE_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Priya Sharma',
    roleOrContext: 'Local Guide · Civil Lines, Bilaspur',
    rating: 5,
    dateText: '2 weeks ago',
    comment:
      'Visited Asha Dresses NX near Hanuman Mandir in Tilak Nagar before our family wedding. The crimson lehenga and cotton kurta sets had super soft inner lining—my 4-year-old daughter wore hers for 6 hours straight without complaining once.',
    purchasedItem: 'Maharani Crimson & Ivory Zari Lehenga Choli',
  },
  {
    id: 'rev-2',
    author: 'Rajeshwar Verma',
    roleOrContext: 'Verified Parent · Tilak Nagar, Bilaspur',
    rating: 5,
    dateText: '1 month ago',
    comment:
      'Best kids clothing store in Bilaspur! Bought matching red and white Indo-Western sherwanis for both of my sons. Fitting was spot-on and the staff stayed open until 8:30 pm to finish a quick sleeve adjustment for us.',
    purchasedItem: 'Tilak Royal Crimson & Pearl Silk Sherwani Set',
  },
  {
    id: 'rev-3',
    author: 'Anjali Dubey',
    roleOrContext: 'Verified Parent · Bilaspur, Chhattisgarh',
    rating: 5,
    dateText: '2 months ago',
    comment:
      'Premium fabric quality and genuine pricing compared to big mall chains. Their red and white party frocks look exactly like designer boutique pieces. Very easy to locate right near Hanuman Mandir in Civil Lines.',
    purchasedItem: 'Ruby Organza & Alabaster Satin Party Frock',
  },
];
