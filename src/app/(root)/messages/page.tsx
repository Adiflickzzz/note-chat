import { Card, CardContent } from "@/components/ui/card";
import React from "react";

type Props = {};

const MessagesPage = (props: Props) => {
  return (
    <Card className="w-full">
      <CardContent className="">
        <p className="text-muted-foreground">
          Select a conversation to start a chat
        </p>
      </CardContent>
    </Card>
  );
};

export default MessagesPage;
