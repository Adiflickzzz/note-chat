import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { Messages } from "./message";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutationState } from "@/hooks/use-mutation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { Link2, SendHorizonal, Settings2, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import TextareaAutosize from "react-textarea-autosize";
import { useConversation } from "@/hooks/useConversation";
import { Hint } from "@/components/hint";

type ChatBoxProps = {
  name: string;
  imgUrl?: string;
};

const chatMessageSchema = z.object({
  content: z.string().min(1, {
    message: "This field cannot be empty",
  }),
});

export const ChatBox = ({ imgUrl, name }: ChatBoxProps) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { conversationId } = useConversation();

  // Mutations
  const { mutate: removeFriend, pending: removeFriendPending } =
    useMutationState(api.friend.remove);
  const { mutate: createMessage, pending } = useMutationState(
    api.message.create,
  );

  // Queries
  const messages = useQuery(api.messages.get, {
    id: conversationId as Id<"conversations">,
  });

  const RemoveFriend = () => {
    console.log("Clicked");
    router.push("/messages");
    removeFriend({ conversationId });
  };

  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (event: any) => {
    const { value, selectionStart } = event.target;

    if (selectionStart !== null) {
      form.setValue("content", value);
    }
  };

  const handleSubmit = async (value: z.infer<typeof chatMessageSchema>) => {
    {
      !pending &&
        createMessage({
          conversationId,
          type: "Text",
          content: [value.content],
        })
          .then(() => {
            form.reset();
          })
          .catch((error) => {
            toast.error(
              error instanceof ConvexError
                ? error.data
                : "Unexpected error occurred",
            );
          });
    }
  };

  return (
    <div>
      <Card className="flex h-[calc(100vh-10vh)] !w-full flex-col rounded-xl bg-white shadow-md">
        {/* Header */}
        {/* <CardHeader className="border-b px-6 py-4">
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
      </CardHeader> */}

        {/* Content */}
        <CardContent className="flex flex-1 flex-col overflow-y-auto px-0 py-4">
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
        <div className="m-4 mt-0">
          <div className="flex items-center gap-2">
            <Card className="relative w-full rounded-xl p-2 shadow-sm">
              <div className="flex w-full items-end gap-2">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex w-full items-end gap-2"
                  >
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem className="h-full w-full">
                          <FormControl>
                            <TextareaAutosize
                              onKeyDown={async (e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  await form.handleSubmit(handleSubmit)();
                                }
                              }}
                              rows={1}
                              maxRows={16}
                              {...field}
                              onChange={handleInputChange}
                              onClick={handleInputChange}
                              placeholder="Type a message ..."
                              className="no-scrollbar flex min-h-full w-full resize-none border-0 bg-card px-2 text-card-foreground outline-0 placeholder:text-muted-foreground last:items-center"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </form>{" "}
                </Form>
              </div>
            </Card>
            <Hint label="Attach files">
              <Button
                disabled={pending}
                size="icon"
                variant="ghost"
                onClick={() => {}}
                className="shrink-0 rounded-full"
              >
                <Link2 className="" />
              </Button>
            </Hint>
            <Button
              disabled={pending}
              size="icon"
              onClick={form.handleSubmit(handleSubmit)}
              className="w-24 shrink-0 rounded-full"
            >
              Send <SendHorizonal />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
