import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useMutationState } from "@/hooks/use-mutation";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { Settings2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Messages } from "./message";
import { useQuery } from "convex/react";
import { InputBox } from "./inputbox";

type ChatBoxProps = {
  name: string;
  imgUrl?: string;
  conversationId: Id<"conversations">;
};

export const ChatBox = ({ imgUrl, name, conversationId }: ChatBoxProps) => {
  const router = useRouter();
  const { mutate: removeFriend, pending: removeFriendPending } =
    useMutationState(api.friend.remove);
  const messages = useQuery(api.messages.get, {
    id: conversationId as Id<"conversations">,
  });

  const RemoveFriend = () => {
    console.log("Clicked");
    router.push("/messages");
    removeFriend({ conversationId });
  };

  return (
    <Card className="flex h-[calc(100vh-120px)] w-full flex-col rounded-lg bg-white shadow-md">
      {/* Header */}
      <CardHeader className="border-b px-6 py-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="flex size-8 items-center">
              <AvatarImage src={imgUrl} />
              <AvatarFallback className="size-8 bg-gray-200 font-semibold">
                {name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="text-[16px] font-semibold">{name}</p>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Settings2 className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" className="mr-8 mt-2">
                <DropdownMenuGroup>
                  {/* <DropdownMenuItem>hello</DropdownMenuItem>
                  <Separator /> */}
                  <DropdownMenuItem
                    onClick={RemoveFriend}
                    className="!text-red-500"
                  >
                    Remove friend
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-1 flex-col overflow-y-auto px-6 py-4">
        {/* Conversation */}
        <div className="no-scrollbar flex flex-1 flex-col-reverse gap-0.5 overflow-y-scroll p-3">
          {/*Todo <Messages/> */}
          {messages?.map(
            (
              { message, senderUsername, senderImage, isCurrentUser },
              index,
            ) => {
              const lastByUser =
                messages[index - 1]?.message.senderId ===
                messages[index]?.message.senderId;

              return (
                <Messages
                  key={message._id}
                  fromCurrentUser={isCurrentUser}
                  senderImage={senderImage}
                  senderName={senderUsername}
                  lastByUser={lastByUser}
                  content={message.content}
                  createdAt={message._creationTime}
                />
              );
            },
          )}
        </div>
      </CardContent>

      {/* Textarea */}
      <div className="m-4">
        <InputBox />
      </div>
    </Card>
  );
};
