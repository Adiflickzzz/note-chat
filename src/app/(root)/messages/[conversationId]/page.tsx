import React from "react";
import { ConversationMembers } from "./_components/conversationMembers";
import { ChatBox } from "./_components/chatBox";
import { Separator } from "@/components/ui/separator";
import { Id } from "convex/_generated/dataModel";

type Props = { params: { conversationId: Id<"conversations"> } };

const MessagesPage = ({ params: { conversationId } }: Props) => {
  return (
    <div className="flex gap-4">
      <ConversationMembers conversationId={conversationId} />
      <ChatBox name="Adithya Vardhan" />
    </div>
  );
};

export default MessagesPage;
