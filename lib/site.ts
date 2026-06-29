export const SITE = {
  name: "Estate Tavern",
  tagline: "Where hearth meets heritage",
  established: "2018",
  email: "hello@estatetavern.cz",
  phone: "+420 777 212 491",
  address: {
    line1: "Raisova 916/15",
    line2: "709 00 Ostrava 9",
    full: "Raisova 916/15, 709 00 Ostrava 9",
  },
  hours: {
    weekdays: "Mon–Thu: 11:00 AM – 11:00 PM",
    weekend: "Fri–Sat: 11:00 AM – 1:00 AM",
    sunday: "Sun: 10:00 AM – 10:00 PM",
    detail: [
      "Monday – Thursday: 11:00 AM – 11:00 PM",
      "Friday – Saturday: 11:00 AM – 1:00 AM",
      "Sunday: 10:00 AM – 10:00 PM",
    ],
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
} as const

export const IMAGES = {
  hero: "/images/hero.jpg",
  pubInterior: "/images/pub-interior.jpg",
  woodTexture: "/images/wood-texture.jpg",
  irishStew: "/images/irish-stew.jpg",
  beerTaps: "/images/beer-taps.jpg",
  cozyBooth: "/images/cozy-booth.jpg",
  whiskey: "/images/whiskey.jpg",
  bar: "/images/bar.jpg",
  liveMusic: "/images/live-music.jpg",
  eventSpace: "/images/event-space.jpg",
} as const
