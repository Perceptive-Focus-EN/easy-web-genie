
import { useState } from "react";
import { MessageSquare, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Chat } from "../chat/Chat";
import { History as HistoryView } from "../history/History";
import { Preview } from "../preview/Preview";
import { useIsMobile } from "@/hooks/use-mobile";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeView, setActiveView] = useState<"chat" | "history">("chat");
  const isMobile = useIsMobile();

  return (
    <ResizablePanelGroup 
      direction="horizontal"
      className="min-h-0"
    >
      <ResizablePanel
        defaultSize={25}
        minSize={isMobile ? 100 : 20}
        maxSize={isMobile ? 100 : 40}
        collapsible={!isMobile}
        onCollapse={() => setIsCollapsed(true)}
        onExpand={() => setIsCollapsed(false)}
        className={cn(
          "flex flex-col",
          isCollapsed && !isMobile && "min-w-[50px] transition-all duration-300 ease-in-out"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-2">
          <div className="flex items-center gap-2">
            <Button
              variant={activeView === "chat" ? "default" : "ghost"}
              size="icon"
              className="h-9 w-9"
              onClick={() => setActiveView("chat")}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button
              variant={activeView === "history" ? "default" : "ghost"}
              size="icon"
              className="h-9 w-9"
              onClick={() => setActiveView("history")}
            >
              <History className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {activeView === "chat" ? <Chat /> : <HistoryView />}
        </div>
      </ResizablePanel>
      {(!isMobile || !isCollapsed) && (
        <>
          <ResizableHandle withHandle />
          <ResizablePanel 
            defaultSize={75}
            className="min-h-0"
          >
            <Preview />
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
};
