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

type ChatBoxProps = {
  name: string;
  imgUrl?: string;
  conversationId: Id<"conversations">;
};

export const ChatBox = ({ imgUrl, name, conversationId }: ChatBoxProps) => {
  const router = useRouter();
  const { mutate: removeFriend, pending: removeFriendPending } =
    useMutationState(api.friend.remove);

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
        <div className="flex h-full items-end pt-0 text-gray-600">
          <p className=""></p>
        </div>
      </CardContent>

      {/* Textarea */}
      <div className="border-t px-6 py-4">
        <Textarea
          placeholder="Type a message..."
          className="h-12 w-full resize-none rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </Card>
  );
};
