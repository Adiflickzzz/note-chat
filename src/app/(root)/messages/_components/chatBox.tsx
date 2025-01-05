import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type ChatBoxProps = {
  name: string;
  imgUrl?: string;
};

export const ChatBox = ({ imgUrl, name }: ChatBoxProps) => {
  return (
    <Card className="flex h-[calc(100vh-120px)] w-full flex-col rounded-lg bg-white shadow-md">
      {/* Header */}
      <CardHeader className="border-b px-6 py-4">
        <CardTitle className="flex items-center gap-2">
          <Avatar className="flex size-8 items-center">
            <AvatarImage src={imgUrl} />
            <AvatarFallback className="size-8 bg-gray-200 font-semibold">
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="text-[16px] font-semibold">{name}</p>
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-1 flex-col overflow-y-auto px-6 py-4">
        {/* Conversation */}
        <div className="flex h-full items-end bg-red-50 pt-0 text-gray-600">
          <p className="">Hello brother</p>
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
