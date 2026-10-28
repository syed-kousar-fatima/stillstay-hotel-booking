import { getHotelPhotos } from './hotelImages.js';

const locations = [
  { place: 'Rajasthan', city: 'Jaipur', country: 'India', kind: 'Desert palaces', image: 'https://i.pinimg.com/736x/a9/e6/9a/a9e69aeff8b9a4a029f9ff590cd09507.jpg' },
  { place: 'Goa', city: 'North Goa', country: 'India', kind: 'Coastal hideaways', image: 'https://i.pinimg.com/736x/54/5a/7d/545a7d89b50b80342c289fa989b4215d.jpg' },
  { place: 'Kerala', city: 'Alleppey', country: 'India', kind: 'Backwater retreats', image: 'https://i.pinimg.com/1200x/6f/97/9d/6f979d84f48e0ecfe2cc69d536364798.jpg' },
  { place: 'Himachal Pradesh', city: 'Manali', country: 'India', kind: 'Mountain escapes', image: 'https://i.pinimg.com/736x/fc/e2/22/fce2229474dab7c789311f53a78ad4c4.jpg' },
  { place: 'Maharashtra', city: 'Mumbai', country: 'India', kind: 'City sanctuaries', image: 'https://i.pinimg.com/736x/6d/33/d8/6d33d8f1d16fab0123b66b3f2044c229.jpg' },
  { place: 'Uttarakhand', city: 'Rishikesh', country: 'India', kind: 'River & mountain stays', image: 'https://i.pinimg.com/1200x/db/81/13/db8113bb088683b18afb7b0377a43372.jpg' },
  { place: 'Karnataka', city: 'Coorg', country: 'India', kind: 'Coffee country stays', image: 'https://i.pinimg.com/736x/62/76/00/627600e86b8ebf8238b81a390d46309b.jpg' },
  { place: 'Tamil Nadu', city: 'Ooty', country: 'India', kind: 'Hill country retreats', image: 'https://i.pinimg.com/1200x/85/f2/a9/85f2a952c63be3afadcdc0a8116a571a.jpg' },
  { place: 'Uttar Pradesh', city: 'Agra', country: 'India', kind: 'Heritage addresses', image: 'https://i.pinimg.com/1200x/67/2f/0b/672f0bac41624187976f2dbb19f8a1b4.jpg' },
  { place: 'Sikkim', city: 'Gangtok', country: 'India', kind: 'Himalayan hideaways', image: 'https://i.pinimg.com/1200x/be/c4/54/bec454f043a3503a35f6978271f6368e.jpg' },
  { place: 'Assam', city: 'Kaziranga', country: 'India', kind: 'Wildlife lodges', image: 'https://i.pinimg.com/1200x/34/6d/b7/346db759a9c81214a5a12937971cd15b.jpg' },
  { place: 'Meghalaya', city: 'Shillong', country: 'India', kind: 'Cloud country stays', image: 'https://i.pinimg.com/736x/b0/c2/a1/b0c2a1d3c7a0bfbc56655aeeb2e59688.jpg' },
  { place: 'Arunachal Pradesh', city: 'Tawang', country: 'India', kind: 'Frontier escapes', image: 'https://i.pinimg.com/1200x/db/79/51/db7951add34520386fca0ca2dd12e7ed.jpg' },
  { place: 'Nagaland', city: 'Kohima', country: 'India', kind: 'Highland homestays', image: 'https://i.pinimg.com/736x/59/3c/98/593c98e76ad3ca7b02deb74b2eb45070.jpg' },
  { place: 'Manipur', city: 'Imphal', country: 'India', kind: 'Lakeside stays', image: 'https://i.pinimg.com/1200x/15/cc/02/15cc02345621e0208d2b876190b245d0.jpg' },
  { place: 'Mizoram', city: 'Aizawl', country: 'India', kind: 'Hilltop hideaways', image: 'https://i.pinimg.com/736x/45/ad/a8/45ada88600bb52a075b0fb7776ebc484.jpg' },
  { place: 'Tripura', city: 'Agartala', country: 'India', kind: 'Garden retreats', image: 'https://i.pinimg.com/736x/2e/85/20/2e8520001081971e6e3b75a43bd05066.jpg' },
  { place: 'West Bengal', city: 'Darjeeling', country: 'India', kind: 'Tea garden retreats', image: 'https://i.pinimg.com/736x/21/f8/3e/21f83e566ba0066ceefaa8403378c1c6.jpg' },
  { place: 'Odisha', city: 'Puri', country: 'India', kind: 'Temple & coast stays', image: 'https://i.pinimg.com/1200x/02/4a/99/024a99676a419a9bf162297e667cce7e.jpg' },
  { place: 'Andhra Pradesh', city: 'Visakhapatnam', country: 'India', kind: 'Bayfront escapes', image: 'https://i.pinimg.com/1200x/ab/86/ff/ab86ff3adf056725bedc717278708bce.jpg' },
  { place: 'Telangana', city: 'Hyderabad', country: 'India', kind: 'Contemporary classics', image: 'https://i.pinimg.com/1200x/49/59/5c/49595c0cb05b0a2c935e962989e9cd15.jpg' },
  { place: 'Gujarat', city: 'Kutch', country: 'India', kind: 'Desert design stays', image: 'https://i.pinimg.com/1200x/aa/0e/5f/aa0e5f8e4fee6e6f962d9aa2b0d1f93d.jpg' },
  { place: 'Madhya Pradesh', city: 'Bhopal', country: 'India', kind: 'Lakeside addresses', image: 'https://i.pinimg.com/1200x/e0/f4/c7/e0f4c7633d8a054e2c238edd9db63fec.jpg' },
  { place: 'Chhattisgarh', city: 'Jagdalpur', country: 'India', kind: 'Forest lodges', image: 'https://i.pinimg.com/1200x/f0/72/93/f0729395dde3553cf2855c87ea478abe.jpg' },
  { place: 'Haryana', city: 'Gurugram', country: 'India', kind: 'Modern city stays', image: 'https://i.pinimg.com/1200x/a9/d1/4b/a9d14b25478c26b12c5beae02f627f6f.jpg' },
  { place: 'Punjab', city: 'Amritsar', country: 'India', kind: 'Cultural retreats', image: 'https://i.pinimg.com/1200x/14/78/67/14786765d390abf95cc42392b533692f.jpg' },
  { place: 'Bihar', city: 'Bodh Gaya', country: 'India', kind: 'Mindful stays', image: 'https://i.pinimg.com/1200x/d2/54/3a/d2543ac9f4388fd830288f63eb91db0d.jpg' },
  { place: 'Jharkhand', city: 'Ranchi', country: 'India', kind: 'Forest edge stays', image: 'https://i.pinimg.com/736x/ea/0a/78/ea0a78483d5c6f2582f0c016a9ee0e0b.jpg' },
  { place: 'Bali', city: 'Ubud', country: 'Indonesia', kind: 'Tropical sanctuaries', image: 'https://i.pinimg.com/736x/7e/a1/b3/7ea1b3ddfc2f3a5b193c5786807a1398.jpg' },
  { place: 'Kyoto', city: 'Kyoto', country: 'Japan', kind: 'Quiet ryokans', image: 'https://i.pinimg.com/1200x/e2/aa/70/e2aa700656e57462575dee726406b711.jpg' },
  { place: 'Lisbon', city: 'Lisbon', country: 'Portugal', kind: 'Old town hideaways', image: 'https://i.pinimg.com/1200x/4c/ef/c8/4cefc83e14ba237eb0cfa5a2f3005ed8.jpg' },
  { place: 'Dubai', city: 'Dubai', country: 'United Arab Emirates', kind: 'Skyline icons', image: 'https://i.pinimg.com/736x/fe/3e/97/fe3e97330d69dd88aca74a3e210cc317.jpg' },
  { place: 'Bangkok', city: 'Bangkok', country: 'Thailand', kind: 'Riverside discoveries', image: 'https://i.pinimg.com/1200x/8a/84/ee/8a84eef3eb6aad829b1bfe38ba065463.jpg' },
];

const hotelStyles = [
  { prefix: 'The House of', suffix: ' & Co.', tier: 'Heritage', multiplier: 1.28 },
  { prefix: 'Stillwater', suffix: ' Retreat', tier: 'Boutique', multiplier: 1 },
  { prefix: 'Atelier', suffix: ' House', tier: 'Design hotel', multiplier: 1.16 },
];

const amenitySets = [
  ['Private bathrooms', 'Infinity pool', 'Air conditioning', 'Smart TV', 'Hot water', 'Attached kitchen', 'High-speed Wi-Fi', 'Refrigerator', 'Ceiling fan', 'Reading lights', 'Spa & wellness', 'Breakfast included', 'Airport transfer'],
  ['Private bathrooms', 'Rooftop pool', 'Air conditioning', 'Smart TV', 'Hot water', 'Attached kitchen', 'Fast Wi-Fi', 'Mini refrigerator', 'Ceiling fan', 'Bedside reading lights', 'Rooftop dining', 'Garden terrace', 'Locally sourced menu'],
  ['Private bathrooms', 'Swimming pool', 'Air conditioning', 'TV with streaming', 'Hot water', 'Kitchenette', 'Complimentary Wi-Fi', 'Refrigerator', 'Ceiling fan', 'Ambient lighting', 'Private balcony', 'Concierge', 'Fitness studio', 'Free cancellation'],
];

const photo = (id, width = 1200) => (
  /^https?:\/\//i.test(id)
    ? id
    : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
);

export const destinations = locations.map((location) => ({
  ...location,
  photo: photo(location.image, 1400),
}));

export const hotels = locations.flatMap((location, locationIndex) =>
  hotelStyles.map((style, styleIndex) => {
    const hotelId = `${location.place.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${styleIndex + 1}`;
    const name = styleIndex === 0
      ? `${style.prefix} ${location.city}${style.suffix}`
      : `${style.prefix} ${location.city}${style.suffix}`;
    const nightly = Math.round((4400 + (locationIndex % 8) * 650 + styleIndex * 1700) * style.multiplier / 100) * 100;
    const gallery = getHotelPhotos(location, locationIndex, styleIndex);
    return {
      id: hotelId,
      name,
      city: location.city,
      location: location.place,
      country: location.country,
      category: style.tier,
      rating: Number((4.55 + ((locationIndex + styleIndex) % 5) * 0.08).toFixed(1)),
      reviewCount: 124 + ((locationIndex * 39 + styleIndex * 27) % 800),
      price: nightly,
      image: gallery[0].url,
      gallery,
      tagline: `${location.kind}, considered from the ground up.`,
      description: `A thoughtful ${style.tier.toLowerCase()} stay in ${location.city}, shaped by its surroundings and the people who call this place home. Take your time over a slow breakfast, settle into beautifully considered rooms, and let our local hosts help you find another side of ${location.place}.`,
      amenities: amenitySets[(locationIndex + styleIndex) % amenitySets.length],
      featured: (locationIndex < 6 && styleIndex === 0) || (locationIndex === 28 && styleIndex === 1),
      popular: locationIndex < 6,
      rooms: [
        { id: 'single', name: 'Single room', bed: 'Single bed', detail: 'A calm, considered room with one comfortable single bed.', guests: 1, price: Math.round(nightly * 0.72 / 100) * 100 },
        { id: 'double', name: 'Double room', bed: 'Double bed', detail: 'A welcoming room with one full-size double bed.', guests: 2, price: nightly },
        { id: 'queen', name: 'Queen room', bed: 'Queen-size bed', detail: 'A little extra room to stretch out, with a queen-size bed.', guests: 2, price: Math.round(nightly * 1.18 / 100) * 100 },
        { id: 'king', name: 'King suite', bed: 'King-size bed', detail: 'A generous suite with a king-size bed and extra room to unwind.', guests: 4, price: Math.round(nightly * 1.42 / 100) * 100 },
      ],
    };
  })
);

export const indianStates = locations.slice(0, 28).map((location) => location.place);
export const internationalDestinations = locations.slice(28).map((location) => location.place);
export const popularHotels = hotels.filter((hotel) => hotel.featured);
