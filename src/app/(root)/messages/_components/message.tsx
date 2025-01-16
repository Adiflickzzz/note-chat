import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { format } from "date-fns";

type Props = {
  fromCurrentUser: boolean;
  senderName: string;
  senderImage: string;
  lastByUser: boolean;
  content: string[];
  createdAt: number;
};
export const Messages = ({
  content,
  createdAt,
  fromCurrentUser,
  lastByUser,
  senderImage,
  senderName,
}: Props) => {
  const formatTime = (timeStamp: number) => {
    return format(timeStamp, "HH:mm");
  };
  const isMobile = useIsMobile();
  return (
    <div
      className={cn("flex w-full items-end", {
        "justify-end": fromCurrentUser,
      })}
    >
      <div
        className={cn("mx-2 flex w-full flex-col", {
          "order-1 items-end": fromCurrentUser,
          "order-2 items-start": !fromCurrentUser,
        })}
      >
        <div
          className={cn("max-w-[70%] rounded-md p-1 text-black", {
            "bg-[#cbf3f0]": !fromCurrentUser,
            "bg-[#f5e5ff]": fromCurrentUser,
            "rounded-br-none": !lastByUser && fromCurrentUser,
            "rounded-bl-none": !lastByUser && !fromCurrentUser,
          })}
        >
          <p
            className={cn(
              "whitespace-pre-wrap text-wrap break-words py-1 pl-2 pr-4",
              {
                "text-xs font-light": isMobile,
              },
            )}
          >
            {content}
          </p>
          <p
            className={cn("flex w-full text-[9px] text-black", {
              "justify-end pr-1": fromCurrentUser,
              "justify-start pl-1": !fromCurrentUser,
            })}
          >
            {formatTime(createdAt)}
          </p>
        </div>
      </div>
      {/* <Avatar
        className={cn("realtive size-8", {
          "order-2": fromCurrentUser,
          "order-1": !fromCurrentUser,
          invisible: lastByUser,
        })}
      >
        <AvatarImage src={senderImage} />
        <AvatarFallback>{senderName.substring(0, 1)}</AvatarFallback>
      </Avatar> */}
    </div>
  );
};
