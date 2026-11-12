import { ProjectCategory } from "@/lib/showcase/schema";
import {
  Globe,
  Monitor,
  Smartphone,
  Wrench,
  Gamepad2,
  Workflow,
  BarChart3,
  Layers,
} from "lucide-react";

export function CategoryIcon({
  category,
  className = "w-4 h-4",
}: {
  category: ProjectCategory;
  className?: string;
}) {
  switch (category) {
    case "web-app":
      return <Globe className={className} strokeWidth={1.5} />;
    case "desktop-app":
      return <Monitor className={className} strokeWidth={1.5} />;
    case "mobile-app":
      return <Smartphone className={className} strokeWidth={1.5} />;
    case "tool":
      return <Wrench className={className} strokeWidth={1.5} />;
    case "game":
      return <Gamepad2 className={className} strokeWidth={1.5} />;
    case "automation":
      return <Workflow className={className} strokeWidth={1.5} />;
    case "data":
      return <BarChart3 className={className} strokeWidth={1.5} />;
    default:
      return <Layers className={className} strokeWidth={1.5} />;
  }
}
