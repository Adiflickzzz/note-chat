import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

type MessagesProps = {
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
}: MessagesProps) => {
  return (
    <div className={cn("flex items-end", { "justify-end": fromCurrentUser })}>
      <div
        className={cn("mx-2 flex w-full flex-col", {
          "order-1 items-end": fromCurrentUser,
          "order-2 items-start": !fromCurrentUser,
        })}
      >
        <div
          className={cn("max-w-[70%] rounded-lg px-4 py-2", {
            "bg-primary text-primary-foreground": fromCurrentUser,
            "bg-secondary text-secondary-foreground": !fromCurrentUser,
            "rounded-br-none": !lastByUser && fromCurrentUser,
            "rounded-bl-none": !lastByUser && !fromCurrentUser,
          })}
        >
          <p className="whitespace-pre-wrap text-wrap break-words">{content}</p>
          <p
            className={cn("flex w-full text-[8px]", {
              "justify-end text-primary-foreground": fromCurrentUser,
              "justify-start text-secondary-foreground": !fromCurrentUser,
            })}
          >
            {/*Todo {formatTime(createdAt)} */}
          </p>
        </div>
      </div>
      <Avatar
        className={cn("realtive size-8", {
          "order-2": fromCurrentUser,
          "order-1": !fromCurrentUser,
          invisible: lastByUser,
        })}
      >
        <AvatarImage src={senderImage} />
        <AvatarFallback>{senderName.substring(0, 1)}</AvatarFallback>
      </Avatar>
    </div>
  );
};
