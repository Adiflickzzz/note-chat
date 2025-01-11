"use client";
import React from "react";
import { Dms } from "./dms";
import AddFriendDailog from "./addFriendDailog";
import { useMutationState } from "@/hooks/use-mutation";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "convex/_generated/dataModel";

type ConversationMembersProps = {
  conversationId: Id<"conversations">;
};

export const ConversationMembers = ({
  conversationId,
}: ConversationMembersProps) => {
  const conversation = useQuery(api.conversation.get, {
    id: conversationId,
  });
  const conversations = useQuery(api.converstions.get);

  return (
    <div className="my-6">
      <AddFriendDailog />

      {/* Dms */}
      <div className="my-6 flex flex-col gap-1">
        <h1 className="mb-2 text-xs text-muted-foreground">Direct Messages</h1>

        <Dms
          name={
            conversation?.isGroup
              ? conversation.name
              : conversation?.otherMember.username
          }
          imgUrl={
            conversation?.isGroup
              ? undefined
              : conversation?.otherMember.imageUrl
          }
        />
      </div>
    </div>
  );
};
