"use client";

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcFilmReel,
  FcMenu,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import { IconType } from "react-icons";

import CategoryItem from "./CategoryItem";
import { Menu } from "lucide-react";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Fitness: FcSportsMode,
  Accounting: FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  Filming: FcFilmReel,
  Engineering: FcEngineering,
};

export default function Categories({ items }: CategoriesProps) {
  const allIcon: Record<string, IconType> = {
    All: FcMenu,
  };

  const MenuIcon = allIcon["All"];

  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      <CategoryItem label={"All"} icon={MenuIcon} value={""} />
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
}
