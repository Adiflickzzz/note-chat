"use client";
import React from "react";
import { Dms } from "./dms";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import AddFriendDailog from "./addFriendDailog";
import Link from "next/link";

export const MessagesSidebar = () => {
  const conversations = useQuery(api.converstions.get);

  return (
    <div className="my-4">
      <AddFriendDailog />
      {/* Dms */}
      <div className="my-6 flex w-56 flex-col gap-1">
        <h1 className="mb-2 ml-2 text-xs text-muted-foreground">
          Direct Messages
        </h1>
        <div className="">
          {conversations?.length === 0 ? (
            <p className="mx-auto mt-4 flex items-center text-sm font-semibold text-muted-foreground">
              No friends found !
            </p>
          ) : (
            <div className="h-[76vh] flex-col gap-2 overflow-y-auto">
              {conversations?.map((conversation) => (
                <Link href={`/messages/${conversation.conversation._id}`}>
                  <Dms
                    key={conversation.otherMember?._id}
                    name={conversation.otherMember?.username}
                    imgUrl={conversation.otherMember?.imageUrl}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
