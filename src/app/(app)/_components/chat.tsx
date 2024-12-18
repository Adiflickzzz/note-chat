"use client";

import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useLocalStorage } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { SidebarTabs } from "./tabs";
import {
  Ellipsis,
  Folders,
  SendHorizonal,
  Settings,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Chat() {
  const defaultLayout = [15, 25, 60];
  const [done, setDone] = useLocalStorage("", false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`;
        }}
        className="items-stretch h-full min-h-screen"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={2}
          collapsible={true}
          minSize={20}
          maxSize={15}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div className="flex flex-col h-full flex-1">
            <div
              className={cn(
                "flex h-[52px] items-center justify-start",
                isCollapsed ? "h-[52px]" : "p-4"
              )}
            >
              <h1 className="text-xl font-bold">Note-Chat</h1>
            </div>
            <Separator />
            <div className="flex-1 mt-3">
              <SidebarTabs
                items={[
                  {
                    name: "Conversations",
                    icon: <SendHorizonal />,
                    isActive: true,
                  },
                  { name: "Media", icon: <Folders /> },
                  { name: "Settings", icon: <Settings /> },
                ]}
              />
            </div>
            {/* <div>Side bar end</div> */}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={defaultLayout[1]}
          maxSize={30}
          minSize={20}
        >
          <Tabs
            defaultValue="inbox"
            value={done ? "done" : "inbox"}
            onValueChange={(tab) => {
              if (tab === "done") {
                setDone(true);
              } else {
                setDone(false);
              }
            }}
          >
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">DMs</h1>

              <TabsList className="ml-auto">
                <TabsTrigger
                  value="inbox"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  DMs
                </TabsTrigger>
                <TabsTrigger
                  value="done"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Groups
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <TabsContent value="inbox" className="m-0"></TabsContent>
            <TabsContent value="done" className="m-0"></TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <div className="flex items-center justify-between p-2">
            <h1 className="text-xl font-bold px-2">Username</h1>
            <Button className="mr-3 my-0 p-4 rounded-xl" variant="ghost">
              <Ellipsis />
            </Button>
          </div>
          <Separator />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
