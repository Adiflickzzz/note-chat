"use client";
import React from "react";
import { MessagesSidebar } from "../_components/messagesSidebar";
import { ChatBox } from "../_components/chatBox";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { Loader2 } from "lucide-react";

type Props = { params: { conversationId: Id<"conversations"> } };

const ChatboxPage = ({ params: { conversationId } }: Props) => {
  const conversation = useQuery(api.conversation.get, { id: conversationId });

  if (conversation === undefined) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <ChatBox
      imgUrl={conversation?.otherMember.imageUrl}
      name={conversation?.otherMember.username!}
      conversationId={conversation?._id!}
    />
  );
};

export default ChatboxPage;
