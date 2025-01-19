import React from "react";
import { MessagesSidebar } from "./_components/messagesSidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Props = {};

const messagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full p-6">
      <Breadcrumb className="mx-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/messages">Messages</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-4 flex gap-4">
        <MessagesSidebar />
        {children}
      </div>
    </div>
  );
};

export default messagesLayout;