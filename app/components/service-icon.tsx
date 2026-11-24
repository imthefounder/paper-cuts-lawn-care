import {
  Flower2,
  Home,
  Layers,
  Leaf,
  Scissors,
  Shovel,
  Sparkles,
  Sprout,
  Trees,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  scissors: Scissors,
  trees: Trees,
  sprout: Sprout,
  layers: Layers,
  leaf: Leaf,
  home: Home,
  flower: Flower2,
  shovel: Shovel,
  sparkles: Sparkles,
};

export function ServiceIcon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const Icon = MAP[name] ?? Sparkles;
  return <Icon className={className} aria-hidden strokeWidth={2.2} />;
}
