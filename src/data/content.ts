// Static copy for the page, taken from sharepal.in/bangalore/gaming-gadgets-on-rent.
// Links that lead to other SharePal pages point at the live site, since only this page is recreated.

export const SHAREPAL = 'https://sharepal.in';
const IMG = 'https://images.sharepal.in';

export const superCategories = [
  { label: 'Photography', href: `${SHAREPAL}/bangalore/photography-on-rent` },
  { label: 'Gaming', href: '/bangalore/gaming-gadgets-on-rent', active: true },
  { label: 'Outdoor', href: `${SHAREPAL}/bangalore/outdoor-gears-on-rent` },
  { label: 'Entertainment', href: `${SHAREPAL}/bangalore/entertainment-on-rent` },
];

/** Sidebar sub-categories. `match` decides which products from the JSON belong to each one. */
export type SubCategory = {
  id: string;
  label: string;
  image: string;
  match: (name: string, image: string) => boolean;
};

export const subCategories: SubCategory[] = [
  {
    id: 'all',
    label: 'All',
    image: `${IMG}/misc/hard-coded/sharepal/Product%3DAll%20Products.webp`,
    match: () => true,
  },
  { id: 'gta-vi', label: 'GTA VI', image: `${IMG}/category-icons/gta-vi.webp`, match: (n) => /gta/i.test(n) },
  {
    id: 'ps5-console',
    label: 'PS5 Console',
    image: `${IMG}/sub-category-card/ps5-console-on-rent-sharepal.webp`,
    match: (n) => /ps5|fc2\d|controller/i.test(n) && !/portal/i.test(n),
  },
  {
    id: 'xbox-console',
    label: 'Xbox Console',
    image: `${IMG}/sub-category-card/xbox-console-on-rent-sharepal.webp`,
    match: (n) => /xbox/i.test(n),
  },
  {
    id: 'vr',
    label: 'VR',
    image: `${IMG}/sub-category-card/vr-on-rent-sharepal.webp`,
    match: (n) => /\bvr\b|oculus|quest/i.test(n),
  },
  {
    id: 'racing-wheel',
    label: 'Racing Wheel',
    image: `${IMG}/categories/gaming-consoles/gaming-accessories/logitech-G29-driving-force-racing-wheel/logitech-g29-racing-wheel-on-rent-sharepal-1.webp`,
    match: (n) => /wheel/i.test(n),
  },
  {
    id: 'big-screen-gaming',
    label: 'Big Screen Gaming',
    image: `${IMG}/categories/gaming-consoles/big-screen-gaming/products/ps5-with-2-controllers-with-projector-on-rent+.webp`,
    match: (n) => /projector|big screen/i.test(n),
  },
];

export const hero = {
  title: 'Gaming Consoles',
  left: `${IMG}/super-categories/gaming-left.webp`,
  right: `${IMG}/super-categories/gaming-right.webp`,
  brands: [
    { alt: 'Xbox', src: `${IMG}/super-categories-brand-logos/gaming/XBOX.svg` },
    { alt: 'PS5', src: `${IMG}/super-categories-brand-logos/gaming/PS5.svg` },
    { alt: 'Meta', src: `${IMG}/super-categories-brand-logos/gaming/Sony.svg` },
  ],
};

export const promoBanners = [
  {
    href: 'https://assets.sharepal.in/',
    alt: 'Become an Asset Partner. Earn monthly from rental assets, plus 10% off and 10% cashback when you rent.',
    desktop: `${IMG}/sharepal-banners/assets-fund-banner.png`,
    mobile: `${IMG}/sharepal-banners/asset-partner-mobile.png`,
  },
  {
    href: 'https://earnwithus.sharepal.in/',
    alt: 'Got gear you dont use anymore? Rent out your gear on SharePal.',
    desktop: `${IMG}/sharepal-banners/ews-generic-banner-desktop.png`,
    mobile: `${IMG}/sharepal-banners/ews-generic-banner-mobile.png`,
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: 'How can I rent from SharePal?',
    a: 'Renting from SharePal is quick and easy. You can browse the products, select your dates and add them to cart and checkout. You can choose to pay online or upon delivery.',
  },
  {
    q: 'If I rent multiple products, do I need to extend the rental duration for all or partial extension is possible?',
    a: 'No, partial extension is not possible, all the products that are rented in that particular order have to be extended.',
  },
  {
    q: 'When does the rental start?',
    a: 'The rental starts from the following day of the delivery day and ends a day prior to the return date. So for example, if you select the delivery date as 5th June and return date as 8th June. The rental is charged for 2 days.',
  },
  {
    q: 'What will be the condition of the products at the time of delivery?',
    a: 'At SharePal.in, we make sure that the products you receive are in great condition upon delivery. We thoroughly inspect and clean each item before sending it your way. If you ever face any issues, our friendly customer support team is here to help. Your satisfaction matters to us the most!',
  },
  {
    q: 'Why is verification required?',
    a: 'Profile verification is a crucial step at SharePal.in to ensure the safety and security of our platform and users. It helps us confirm the identity of our users, prevent fraud, and maintain a secure environment for everyone involved.',
  },
  {
    q: 'How is the rental calculated?',
    a: 'We want the rentals to be affordable & attractive to both short-term and long-term users. Hence, the rental is calculated in a way that the effective per-day rental reduces as you rent longer. For example, 1-day rental cost of GoPro 12 camera is Rs 1299, whereas 7-days cost is Rs 2799 which means the effective per-day rent is Rs 400 only.',
  },
  {
    // The live answer here is copy from another page ("participation amount of ₹1 lakh").
    // This one follows the rule stated in "When does the rental start?" instead.
    q: 'What is the minimum rental period?',
    a: 'The minimum chargeable rental is 1 day. Since the delivery and pickup days are free, pick a pickup date at least two days after your delivery date.',
  },
];

/** The page shows the first five; the rest live in the "View more FAQ's" drawer. */
export const FAQ_PREVIEW_COUNT = 5;

export type Review = { quote: string; name: string; initials: string; city: string; product: string };

export const reviews: Review[] = [
  {
    quote:
      'I would recommend SharePal for anybody looking to rent trekking gears, on time delivery, condition of products delivered were very good, super transparent deposit return policy.',
    name: 'Satyaki',
    initials: 'SB',
    city: 'Kolkata',
    product: 'Trekking Gear',
  },
  {
    quote:
      'Have used their services twice now. They never disappoint. Quick responses, polite, transparent, hassle free, great products as well. Rented trekking gear and PS4. Thanks Sharepal! Cheers to you guys!',
    name: 'Afrana',
    initials: 'AS',
    city: 'Bangalore',
    product: 'Gaming Console',
  },
  {
    quote:
      'It’s an amazing service, starting from the quality of the gear provided to the pickup and drop at doorstep facility. The staff is extremely helpful and supportive. The jacket was freshly washed and the shoes provided were brand new. The refund for the deposit was also processed immediately. We had no clue that this kind of service existed in India, SharePal.',
    name: 'Kanthikiran',
    initials: 'KK',
    city: 'Bangalore',
    product: 'Riding Gear',
  },
  {
    quote:
      'I am a regular customer and order ps4 It’s very affordable and booking an order is super easy and user friendly website and polite staff.',
    name: 'Amal',
    initials: 'AA',
    city: 'Bangalore',
    product: 'Gaming Console',
  },
  {
    quote:
      'The experience with share pal is awesome . The camera , service provide by them is good. Overall I am Happy by renting camera gear from share pal. Next time I will rent the gears from share pal only. Must recommend to everyone',
    name: 'Pankaj',
    initials: 'PS',
    city: 'Mumbai',
    product: 'Action Cameras',
  },
  {
    quote:
      'Great company amazing products at affordable prices and great service I would recommend share pal to everybody they really go out of the way for the best service I surely know I will be their forever customer.',
    name: 'Jayaraman',
    initials: 'JS',
    city: 'Mumbai',
    product: 'Riding Gear',
  },
  {
    quote: 'I like the way sharepal work and really enjoyed the ps4 will order again. Thanks sharepal',
    name: 'Manish',
    initials: 'MM',
    city: 'Mumbai',
    product: 'Gaming console',
  },
  {
    quote:
      'Ordered 2 pair of shoes & 3 trekking poles. Shoes were in mint condition, very well cleaned and sanitized and so does the trekking poles. Delivery and pick-up was smooth. Refund was done within the time frame. If you have UPI it will be transferred immediately. I overall had a very good experience with Sharepal. Have recommended to my family and friends as well. Thank you Sharepal.',
    name: 'Rakesh',
    initials: 'RS',
    city: 'Mumbai',
    product: 'Trekking Gear',
  },
  {
    quote:
      'Right from the time I saw their website, till i got my refund the entire experience with SharePal was brilliant. The product listing, prices, delivery, communication, return. Everything was spot on. Product quality was brilliant. The way the team solves your issues is so rare to find in today’s times.. I dont think I am gonna look at any other place for my travel needs.',
    name: 'Shruti',
    initials: 'SJ',
    city: 'Mumbai',
    product: 'Winter Wear',
  },
  {
    quote:
      'Awesome experience. Please be the way you are. Received excellent clothes and shoes in washed and clean state. They looked like new ones. Received hasslefree refund.',
    name: 'Amit',
    initials: 'AK',
    city: 'Delhi',
    product: 'Riding Gear',
  },
];

export const stats = [
  { value: '250Cr+', label: 'Saved Together' },
  { value: '4.5M Kg', label: 'CO₂e Emissions Saved' },
  { value: '100K+', label: 'Products in Circulation' },
];

type FooterLink = { label: string; href: string; isNew?: boolean };

const cat = (path: string) => `${SHAREPAL}/bangalore/${path}`;

export const footerCategories: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Action Cameras',
    links: [
      { label: 'Action Cameras', href: cat('photography-on-rent/action-cameras-on-rent') },
      { label: 'Pocket Cameras', href: cat('photography-on-rent/pocket-cameras-on-rent') },
      { label: 'GoPro Cameras', href: cat('photography-on-rent/gopro-cameras-on-rent') },
      { label: 'DJI Cameras', href: cat('photography-on-rent/dji-cameras-on-rent') },
      { label: 'DJI Drones', href: cat('photography-on-rent/dji-drones-on-rent') },
      { label: '360 Cameras', href: cat('photography-on-rent/360-cameras-on-rent') },
    ],
  },
  {
    title: 'Cameras',
    links: [
      { label: 'DSLR Cameras', href: cat('photography-on-rent/dslr-cameras-on-rent') },
      { label: 'Cameras', href: cat('photography-on-rent/all-cameras-on-rent') },
      { label: 'iPhones', href: cat('photography-on-rent/iphones-on-rent') },
      { label: 'DSLR Gimbal Combos', href: cat('photography-on-rent/dslr-gimbal-on-rent') },
      {
        label: 'Wildlife Photography',
        href: cat('photography-on-rent/wildlife-photography-cameras-on-rent'),
      },
      {
        label: 'Tripod and camera accessories',
        href: cat('photography-on-rent/tripod-and-camera-accessories-on-rent'),
      },
    ],
  },
  {
    title: 'Trekking Gear',
    links: [
      { label: 'Trekking Gear', href: cat('outdoor-gears-on-rent/trekking-gear-on-rent') },
      { label: 'Trekking Jackets', href: cat('outdoor-gears-on-rent/trekking-jackets-on-rent') },
      { label: 'Trek/Snow Pants', href: cat('outdoor-gears-on-rent/trek-snow-pants-on-rent') },
      { label: 'Trekking Shoes', href: cat('outdoor-gears-on-rent/trekking-shoes-on-rent') },
      { label: 'Trek Accessories', href: cat('outdoor-gears-on-rent/trek-accessories-on-rent') },
    ],
  },
  {
    title: 'Riding Gear',
    links: [
      { label: 'Riding Gear', href: cat('outdoor-gears-on-rent/riding-gear-on-rent') },
      { label: 'Riding Luggage', href: cat('outdoor-gears-on-rent/riding-luggage-on-rent') },
      { label: 'Riding Jackets', href: cat('outdoor-gears-on-rent/riding-jackets-on-rent') },
      { label: 'Riding Essentials', href: cat('outdoor-gears-on-rent/riding-essentials-on-rent') },
      { label: 'Riding Boots', href: cat('outdoor-gears-on-rent/riding-boots-on-rent') },
      { label: 'Binoculars', href: cat('outdoor-gears-on-rent/binoculars-on-rent') },
    ],
  },
  {
    title: 'Creator Gear',
    links: [
      { label: 'Wireless & Collar Mics', href: cat('photography-on-rent/wireless-and-collar-mics-on-rent') },
      { label: 'Professional Cameras', href: cat('photography-on-rent/professional-cameras-on-rent') },
      { label: 'Mirrorless Cameras', href: cat('photography-on-rent/mirrorless-cameras-on-rent') },
      { label: 'UNLMTD Vlogging', href: cat('photography-on-rent/unlmtd-vlogging-on-rent') },
      { label: 'Mobile Gimbals', href: cat('photography-on-rent/mobile-gimbals-on-rent') },
      { label: 'Vlogging', href: cat('photography-on-rent/vlogging-cameras-on-rent') },
    ],
  },
  {
    title: 'Gaming Console',
    links: [
      { label: 'PS5 Console', href: cat('gaming-gadgets-on-rent/ps5-console-on-rent') },
      { label: 'VR', href: cat('gaming-gadgets-on-rent/vr-on-rent') },
      { label: 'Racing Wheel', href: cat('gaming-gadgets-on-rent/gaming-controllers-on-rent') },
      { label: 'Big Screen Gaming', href: cat('gaming-gadgets-on-rent/big-screen-gaming') },
      { label: 'Xbox Console', href: cat('gaming-gadgets-on-rent/xbox-console-on-rent') },
    ],
  },
  {
    title: 'Winter Wear',
    links: [
      { label: 'Snow Boots', href: cat('outdoor-gears-on-rent/snow-boots-on-rent') },
      { label: 'Winter Jackets', href: cat('outdoor-gears-on-rent/winter-jackets-on-rent') },
      { label: 'Backpacks', href: cat('outdoor-gears-on-rent/backpacks-on-rent') },
    ],
  },
  {
    title: 'Camping Gear',
    links: [
      { label: 'Camping Gear', href: cat('outdoor-gears-on-rent/camping-gear-on-rent') },
      {
        label: 'Camping Stools & Tables',
        href: cat('outdoor-gears-on-rent/camping-stools-and-tables-on-rent'),
      },
      { label: 'Camping Tents', href: cat('outdoor-gears-on-rent/camping-tents-on-rent') },
      { label: 'Sleeping Bags & Mats', href: cat('outdoor-gears-on-rent/sleeping-bags-and-mats-on-rent') },
    ],
  },
  {
    title: 'Audio Visual Equipment',
    links: [
      { label: 'Projectors', href: cat('entertainment-on-rent/projectors-on-rent') },
      { label: 'VR', href: cat('entertainment-on-rent/vr-on-rent') },
      { label: 'Mics', href: cat('entertainment-on-rent/mics-on-rent') },
      { label: 'Speakers', href: cat('entertainment-on-rent/speakers-on-rent') },
    ],
  },
];

export const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Sharepal',
    links: [
      { label: 'About', href: `${SHAREPAL}/about-us` },
      { label: 'Why SharePal', href: `${SHAREPAL}/why-sharepal` },
      { label: 'Sitemap', href: `${SHAREPAL}/sitemap` },
      { label: 'CarePal', href: `${SHAREPAL}/carepal` },
    ],
  },
  {
    title: 'Become a Pal',
    links: [
      { label: 'Sharepal for Creators', href: `${SHAREPAL}/sharepal-for-creators` },
      { label: 'Careers', href: `${SHAREPAL}/life-at-sharepal?active=careers` },
      { label: 'Sharepal for Brands', href: `${SHAREPAL}/sharepal-for-brands` },
      { label: 'Asset Funding Program', href: 'https://assets.sharepal.in', isNew: true },
      { label: 'Rent Your Gear', href: 'https://earnwithus.sharepal.in/', isNew: true },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'How it works?', href: `${SHAREPAL}/how-sharepal-works` },
      { label: 'FAQs', href: `${SHAREPAL}/faq` },
      { label: 'Verification', href: `${SHAREPAL}/complete-verification` },
      { label: 'Cancellation Policy', href: `${SHAREPAL}/cancellation-policy` },
      { label: 'Life at Sharepal', href: `${SHAREPAL}/life-at-sharepal` },
    ],
  },
  {
    title: 'Policies',
    links: [
      { label: 'Terms & Condition', href: `${SHAREPAL}/terms-and-conditions` },
      { label: 'Shipping policy', href: `${SHAREPAL}/shipping-policy` },
      { label: 'Damage Policy', href: `${SHAREPAL}/damage-policy` },
      { label: 'Terms of Use', href: `${SHAREPAL}/terms-of-use` },
      { label: 'Privacy Policy', href: `${SHAREPAL}/privacy-policy` },
    ],
  },
];

export const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/Sharepal.in' },
  { label: 'Instagram', href: 'https://www.instagram.com/sharepal.in/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/sharepal/' },
] as const;

export const cities = {
  popular: [
    { name: 'Delhi', icon: `${IMG}/cities/delhi.svg` },
    { name: 'Hyderabad', icon: `${IMG}/cities/hyderabad.svg` },
    { name: 'Mumbai', icon: `${IMG}/cities/mumbai.svg` },
    { name: 'Pune', icon: `${IMG}/cities/pune.svg` },
    { name: 'Chennai', icon: `${IMG}/cities/chennai.svg` },
    { name: 'Bangalore', icon: `${IMG}/cities/bangalore.svg` },
  ],
  other: ['Faridabad', 'Kolkata', 'Gurgaon', 'Noida', 'Ghaziabad'],
};

export const seoCategories = [
  {
    title: 'Action Cameras on Rent',
    href: cat('photography-on-rent/action-cameras-on-rent'),
    body: "Capture your adventures in stunning detail with our range of action cameras. Choose from top brands like GoPro, Insta360, and DJI, perfect for everything from extreme sports to casual vlogging. Whether you need high-quality video for your next trek or a 360-degree camera to capture every angle, we've got you covered.",
  },
  {
    title: 'Cameras on Rent',
    href: cat('photography-on-rent/all-cameras-on-rent'),
    body: "From DSLRs to mirrorless cameras, SharePal offers a wide selection of high-quality cameras for rent. Whether you're a professional photographer or an enthusiast, our range of cameras will suit your every need. Capture life's precious moments without the hefty price tag of ownership.",
  },
  {
    title: 'Trekking Gear on Rent',
    href: cat('outdoor-gears-on-rent/trekking-gear-on-rent'),
    body: "Gear up for your next adventure with SharePal's range of trekking equipment. Rent everything you need, from jackets and shoes to backpacks and accessories. Our trekking gear is designed to keep you comfortable and safe on your journey, no matter the terrain.",
  },
  {
    title: 'Riding Gear on Rent',
    href: cat('outdoor-gears-on-rent/riding-gear-on-rent'),
    body: 'Stay safe and stylish on your rides with our collection of riding gear. From helmets to jackets, we offer everything you need to enjoy a thrilling ride. Our riding gear is carefully selected to ensure you have the best experience on the road.',
  },
  {
    title: 'Projectors/Speakers on Rent',
    href: cat('entertainment-on-rent'),
    body: "Make your events memorable with our high-quality projectors and speakers. Whether you're hosting a movie night, a presentation, or a party, our rental options provide top-notch audio and visual equipment to make your event a success.",
  },
  {
    title: 'Creator Gear on Rent',
    href: cat('photography-on-rent'),
    body: 'For content creators, having access to the right gear is crucial. SharePal offers a wide range of creator gear, including lights, tripods, and microphones. Elevate your content without the burden of buying expensive equipment.',
  },
  {
    title: 'Gaming Consoles on Rent',
    href: '/bangalore/gaming-gadgets-on-rent',
    body: "Experience the latest gaming consoles without the upfront cost. Rent PS5, Xbox, and more from SharePal. Whether you're a casual gamer or a hardcore enthusiast, our gaming consoles will provide hours of entertainment.",
  },
];

export const rentingVsBuying = [
  [
    'Cost-Effective',
    'Renting allows you to access high-quality products without the significant investment of buying. Save money by renting only when you need the product.',
  ],
  [
    'Flexibility',
    "Enjoy the flexibility to rent for as long as you need, whether it's for a day, a week, or a month. No long-term commitments required.",
  ],
  [
    'Access to the Latest Gear',
    'Stay up-to-date with the latest technology and trends without the hassle of reselling outdated products.',
  ],
  [
    'No Maintenance Worries',
    "Forget about maintenance and storage concerns. With renting, you're free from the responsibilities that come with ownership.",
  ],
] as const;

export const whySharePal = [
  ['Zero Deposit', 'Rent without the worry of a hefty deposit.'],
  [
    'Free Delivery and Pickup',
    "Enjoy the convenience of having your rentals delivered to your doorstep and picked up when you're done.",
  ],
  [
    'Wide Range of Products',
    'From cameras to gaming consoles, we offer a diverse selection of high-quality products for rent.',
  ],
  ['Flexible Rental Tenures', 'Rent for a day, a week, or even longer with our flexible rental options.'],
  [
    'Top-Notch Customer Support',
    'Our dedicated customer support team is always ready to assist you with any questions or concerns.',
  ],
] as const;
