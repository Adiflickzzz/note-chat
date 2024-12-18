import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Ghost, IconNode } from "lucide-react";
import React, { useState } from "react";

type SidebarTabsProps = {
  items: {
    name: string;
    icon: React.ReactNode;
    isActive?: boolean;
  }[];
};

export const SidebarTabs = ({ items }: SidebarTabsProps) => {
  return (
    <div className="px-2">
      {items.map((item) => (
        <Button
          key={item.name}
          className={cn(
            "flex flex-col items-start gap-2 rounded-lg px-4 text-left my-0.5 transition-all hover:bg-accent text-black w-full font-semibold",
            item.isActive &&
              "bg-black text-white hover:bg-black/90 hover:text-white"
          )}
          variant="ghost"
        >
          <div className="flex items-center gap-2">
            {item.icon}
            <p className="text-md">{item.name}</p>
          </div>
        </Button>
      ))}
    </div>
  );
};
