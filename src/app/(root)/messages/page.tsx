import React from "react";
import { MessagesSidebar } from "./_components/messagesSidebar";
import { ChatBox } from "./_components/chatBox";
import { Id } from "convex/_generated/dataModel";

const MessagesPage = () => {
  return (
    <div className="flex gap-4">
      <MessagesSidebar />
      <ChatBox name="Adithya Vardhan" />
    </div>
  );
};

export default MessagesPage;
