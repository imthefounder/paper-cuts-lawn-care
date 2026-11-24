export type Service = {
  id: string;
  name: string;
  short: string;
  blurb: string;
  tile: string;
  icon: string;
  featured?: boolean;
};

export const SERVICES: Service[] = [
  {
    id: "mowing",
    name: "Lawn Mowing",
    short: "Mowing",
    blurb: "Focused exclusively on precision lawn cutting, edged and blown clean every visit.",
    icon: "scissors",
    featured: true,
    tile: "Weekly or biweekly cutting",
  },
  {
    id: "trimming",
    name: "Bush & Tree Trimming",
    short: "Trimming",
    blurb: "Shaping and overgrowth removal that keeps beds, fences, and walkways clear.",
    icon: "trees",
    tile: "Hedges, shrubs, low limbs",
  },
  {
    id: "aeration",
    name: "Core Aeration",
    short: "Aeration",
    blurb: "Relieves soil compaction so water, air, and fertilizer reach the roots.",
    icon: "sprout",
    tile: "Open soil to the roots",
  },
  {
    id: "dethatching",
    name: "Power Raking / Dethatching",
    short: "Dethatching",
    blurb: "Pulls built-up thatch and dead grass out so new growth can come through.",
    icon: "layers",
    tile: "Pull thatch and dead grass",
  },
  {
    id: "leaves",
    name: "Leaf Clean Up",
    short: "Leaf clean up",
    blurb: "Full yard leaf removal, bagged and hauled off before the snow flies.",
    icon: "leaf",
    tile: "Blow, bag, and haul it off",
  },
  {
    id: "gutters",
    name: "Gutter Clean Out",
    short: "Gutters",
    blurb: "Clears debris from gutters and downspouts so water drains away from the house.",
    icon: "home",
    tile: "Clear gutters and downspouts",
  },
  {
    id: "flowerbed",
    name: "Flowerbed Cleaned Out",
    short: "Flowerbeds",
    blurb: "Weeding, edging, and bed preparation so the beds look intentional again.",
    icon: "flower",
    tile: "Weed, edge, and reset beds",
  },
  {
    id: "landscaping",
    name: "Landscaping (Mulch, Rock, Soil)",
    short: "Landscaping",
    blurb: "Fresh mulch, rock, and soil installation with clean, cut-in bed edges.",
    icon: "shovel",
    tile: "Mulch, rock, and soil",
  },
  {
    id: "other",
    name: "Other Free Estimates",
    short: "Something else",
    blurb: "Storm clean up, hauling, one-time jobs. Tell James what you have in mind.",
    icon: "sparkles",
    tile: "Storm clean up and hauling",
  },
];

export const SERVICE_LOOKUP: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.id, s]),
);

export function serviceNames(ids: string[]): string[] {
  return ids.map((id) => SERVICE_LOOKUP[id]?.name ?? id);
}
