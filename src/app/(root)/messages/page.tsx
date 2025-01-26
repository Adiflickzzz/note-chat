import { Card, CardContent } from "@/components/ui/card";
import React from "react";

type Props = {};

const MessagesPage = (props: Props) => {
  return (
    <Card className="h-[calc(100vh-120px)] w-full">
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-muted-foreground">
          Select conversation to start a chat ...
        </p>
      </div>
    </Card>
  );
};

export default MessagesPage;
