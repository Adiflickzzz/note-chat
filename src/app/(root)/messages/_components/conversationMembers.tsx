import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import React from "react";
import { Dms } from "./dms";

export const ConversationMembers = () => {
  return (
    <div className="my-6">
      <Button>
        <Pen /> New message
      </Button>
      {/* Dms */}
      <div className="my-6 flex flex-col gap-1">
        <h1 className="mb-2 text-xs text-muted-foreground">Direct Messages</h1>
        <Dms imgUrl="./dp.jpg" name="Adi 🖤" />
        <Dms isActive name="Adithya Vardhan" />
        <Dms name="Vardhan" />
        <Dms imgUrl="./dp.jpg" name="Srinivas" />
        <Dms name="Akhil" />
      </div>
    </div>
  );
};
