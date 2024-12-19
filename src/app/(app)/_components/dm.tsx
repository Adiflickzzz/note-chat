import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

export const Dm = (props: Props) => {
  return (
    <div className="my-3 mx-4 bg-black/10 rounded-lg py-2 px-3">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 w-full">
            <Avatar>
              <AvatarImage />
              <AvatarFallback className="bg-black text-white rounded-full text-sm">
                Na
              </AvatarFallback>
            </Avatar>
            <h1 className="font-semibold truncate max-w-[60%]">
              Adithya vardhannnnn
            </h1>
          </div>
          <div className="font-semibold text-sm w-1/2 flex justify-end pr-2">
            <p className="truncate">4 minutes ago</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-medium text-muted-foreground overflow-hidden line-clamp-3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis,
            nisi sunt cum, eos expedita quam laudantium impedit libero, cumque
            ducimus cupiditate perspiciatis labore deserunt repellat blanditiis
            sapiente. Explicabo, quo molestias! lo
          </p>
        </div>
      </div>
    </div>
  );
};
