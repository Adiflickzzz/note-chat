import React from "react";
import { MessagesSidebar } from "./_components/messagesSidebar";

type Props = {};

const messagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full p-6">
      <nav className="mb-4 w-full rounded-lg bg-black/10 p-2">Search bar</nav>
      <div className="flex gap-4">
        <MessagesSidebar />
        {children}
      </div>
    </div>
  );
};

export default messagesLayout;
