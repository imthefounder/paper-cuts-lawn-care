export const SITE = {
  name: "Paper Cuts Lawn Care",
  shortName: "Paper Cuts",
  owner: "James",
  phoneDisplay: "(313) 505-1600",
  phoneHref: "tel:+13135051600",
  smsHref: "sms:+13135051600",
  email: "papercutslawn@gmail.com",
  emailHref: "mailto:papercutslawn@gmail.com",
  city: "Vandalia",
  state: "OH",
  region: "Vandalia, OH",
  tagline: "Cut Above the Rest",
  quote: "A lawn is a welcome mat to a home",
  url: "https://paper-cuts-lawn-care.vercel.app",
  promo: "$5 off",
  promoLine: "Mention the door hanger flyer for $5 off your service",
} as const;

export const NAV = [
  { href: "#services", label: "Services" },
  { href: "#estimate", label: "Free Estimate" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#area", label: "Service Area" },
  { href: "#faq", label: "FAQ" },
] as const;

export const AREA_TOWNS = [
  "Vandalia",
  "Englewood",
  "Tipp City",
  "Butler Township",
  "Union",
  "Huber Heights",
  "Riverside",
  "Trotwood",
  "Dayton",
  "Moraine",
] as const;

export const FAQS = [
  {
    q: "Are estimates really free?",
    a: "Yes. Every estimate is free and there is no obligation. James will look at the property, ask what you want done, and give you a straight price. If you would rather not meet in person, send a few photos with your request and he will price it from those.",
  },
  {
    q: "How often should my lawn be mowed?",
    a: "Most Vandalia yards do best weekly through the spring growth flush and every other week through the heat of summer. James will recommend a schedule for your specific yard at the estimate, and you can change it as the season changes.",
  },
  {
    q: "Do I need to be home for the work?",
    a: "No. Plenty of customers are at work while their yard gets cut. Just let James know about gate codes, dogs, or anything in the yard he should work around, and where to leave the invoice.",
  },
  {
    q: "How does the $5 off flyer deal work?",
    a: "If you got one of the door hangers, mention it when you request your estimate and the $5 comes off your service. No coupon to clip, no code to remember, and it applies to first-time service.",
  },
  {
    q: "Do you haul away leaves and debris?",
    a: "Yes. Leaf clean ups and flowerbed clean outs include removal and hauling, so nothing is left piled at the curb. Mulch, rock, and soil installs are quoted with delivery included.",
  },
  {
    q: "What happens if it rains?",
    a: "Mowing wet grass tears it up instead of cutting it, so James will move your visit to the next dry day and let you know. Seasonal work like aeration and clean ups is scheduled around the weather the same way.",
  },
  {
    q: "How do I pay?",
    a: "Ask James at your estimate which payment methods he is taking right now. He will confirm the amount before any work starts so there are no surprises.",
  },
] as const;
