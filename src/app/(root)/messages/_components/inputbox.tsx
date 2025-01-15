import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useMutationState } from "@/hooks/use-mutation";
import { useConversation } from "@/hooks/useConversation";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "convex/_generated/api";
import { ConvexError } from "convex/values";
import { SendHorizonal } from "lucide-react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import { z } from "zod";

const chatMessageSchema = z.object({
  content: z.string().min(1, {
    message: "This field cannot be empty",
  }),
});

export const InputBox = () => {
  const { conversationId } = useConversation();

  const { mutate: createMessage, pending } = useMutationState(
    api.message.create,
  );

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
  };
  return (
    <div className="flex items-center gap-3">
      <Card className="relative w-full rounded-lg p-2 shadow-sm">
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
                        maxRows={3}
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
      <Button
        disabled={pending}
        size="icon"
        onClick={form.handleSubmit(handleSubmit)}
        className="shrink-0 rounded-full"
      >
        <SendHorizonal />
      </Button>
    </div>
  );
};
