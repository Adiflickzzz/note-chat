import React from "react";
import { ConversationMembers } from "./_components/conversationMembers";
import { ChatBox } from "./_components/chatBox";
import { Separator } from "@/components/ui/separator";

const MessagesPage = () => {
  return (
    <div className="flex gap-4">
      <ConversationMembers />
      <ChatBox name="Adithya Vardhan" />
    </div>
  );
};

export default MessagesPage;
