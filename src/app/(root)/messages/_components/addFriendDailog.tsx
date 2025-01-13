"use client";
import { z } from "zod";
import { api } from "convex/_generated/api";
import { useMutationState } from "@/hooks/use-mutation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

const addFriendFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field cannot be empty" })
    .email("Please enter a valid email"),
});

const AddFriendDailog = () => {
  const { mutate: createRequest, pending: isPending } = useMutationState(
    api.request.create,
  );

  const form = useForm<z.infer<typeof addFriendFormSchema>>({
    resolver: zodResolver(addFriendFormSchema),
    defaultValues: { email: "" },
  });

  const handleSubmit = async (values: z.infer<typeof addFriendFormSchema>) => {
    await createRequest({ email: values.email })
      .then(() => {
        form.reset();
        toast.success("Friend request sent");
      })
      .catch((error) => {
        if (error instanceof ConvexError) {
          if (error.data === "Cannot send request to yourself") {
            toast.error("You cannot send a friend request to yourself.");
          } else {
            toast.error(error.data);
          }
        } else {
          toast.error("Unexpected error");
        }
      });
  };

  return (
    <Dialog>
      <Tooltip>
        <Button asChild>
          <DialogTrigger>
            <UserPlus />
            Add Friend
          </DialogTrigger>
        </Button>

        <TooltipContent side="right">
          <p>Add Friend</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add friend</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Send a request to connect with your friends
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="adi@gmail.com"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={isPending} type="submit">
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendDailog;
