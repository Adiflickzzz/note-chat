"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMutationState } from "@/hooks/use-mutation";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { ConvexError } from "convex/values";
import { toast } from "sonner";

type RequestProps = {
  id: Id<"requests">;
  userName: string;
  email: string;
  imgUrl?: string;
};

export const Request = ({ imgUrl, userName, email, id }: RequestProps) => {
  const { mutate: accept, pending: acceptRequestPending } = useMutationState(
    api.request.accept,
  );
  const { mutate: deny, pending: denyRequestPending } = useMutationState(
    api.request.deny,
  );

  const acceptRequest = () =>
    accept({ id })
      .then(() => toast.success("Friend request accepted"))
      .catch((error) => {
        toast.error(
          error instanceof ConvexError
            ? error.data
            : "Unexpected error occured",
        );
      });

  const denyRequest = () =>
    deny({ id })
      .then(() => toast.success("Friend request denied"))
      .catch((error) => {
        toast.error(
          error instanceof ConvexError
            ? error.data
            : "Unexpected error occured",
        );
      });

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Requests</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="mt-4 flex h-full w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage src={imgUrl} />
            <AvatarFallback>
              {userName.charAt(0).toLocaleLowerCase()}
            </AvatarFallback>
          </Avatar>
          <p className="text-lg">{userName}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={denyRequest}>Deny</Button>
          <Button onClick={acceptRequest}>Accept</Button>
        </div>
      </CardContent>
    </Card>
  );
};
