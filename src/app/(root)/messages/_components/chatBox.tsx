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
    <Card className="h-full w-full">
      <CardHeader className="py-4">
        <CardTitle className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage />
            <AvatarFallback className="size-8 bg-black/10 font-semibold text-black">
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="text-md truncate font-semibold">{name}</p>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="h-full">
        <div className="flex h-full flex-col justify-end">
          <div>Conversation</div>
          <Textarea />
        </div>
      </CardContent>
    </Card>
  );
};
