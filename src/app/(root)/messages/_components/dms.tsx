import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DmsProps = {
  isActive?: boolean;
  imgUrl?: string;
  name: string;
};

export const Dms = ({ imgUrl, name, isActive }: DmsProps) => {
  return (
    <div className="w-56">
      <Button
        variant="ghost"
        className={cn(
          "flex w-full items-center justify-start rounded-lg py-6 pl-2 hover:bg-black/5",
          isActive && "bg-black/5",
        )}
        size="lg"
      >
        <Avatar className="size-8">
          <AvatarImage src={imgUrl} />
          <AvatarFallback className="size-8 bg-black/10 font-semibold text-black">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p className="text-md truncate font-semibold">{name}</p>
      </Button>
    </div>
  );
};
