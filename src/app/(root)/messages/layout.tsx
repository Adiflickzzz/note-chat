import React from "react";

type Props = {};

const messagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full p-6">
      <nav className="mb-4 w-full rounded-lg bg-black/10 p-2">hello</nav>
      <div>{children}</div>
    </div>
  );
};

export default messagesLayout;
