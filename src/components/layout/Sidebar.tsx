
import { useState, useEffect } from "react";
import { MessageSquare, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Chat } from "../chat/Chat";
import { History as HistoryView } from "../history/History";
import { Preview } from "../preview/Preview";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeView, setActiveView] = useState<"chat" | "history">("chat");
  const isMobile = useIsMobile();

  const handleViewChange = (view: "chat" | "history") => {
    if (view === activeView) return;
    
    // Smooth transition effect
    const container = document.querySelector('.view-container');
    if (container) {
      container.classList.add('opacity-0');
      setTimeout(() => {
        setActiveView(view);
        container.classList.remove('opacity-0');
      }, 150);
    } else {
      setActiveView(view);
    }

    toast({
      title: `Switched to ${view} view`,
      description: `You are now viewing the ${view.toLowerCase()} view.`,
    });
  };

  const handleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    // Add transition effect
    const sidebar = document.querySelector('.sidebar-panel');
    if (sidebar) {
      sidebar.classList.toggle('collapsed', collapsed);
    }
  };

  useEffect(() => {
    // Add transition styles
    const style = document.createElement('style');
    style.innerHTML = `
      .view-container {
        transition: opacity 0.15s ease-in-out;
      }
      .sidebar-panel {
        transition: width 0.3s ease-in-out;
      }
      .sidebar-panel.collapsed {
        width: 50px !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
        onCollapse={() => handleCollapse(true)}
        onExpand={() => handleCollapse(false)}
        className={cn(
          "flex flex-col sidebar-panel",
          isCollapsed && !isMobile && "min-w-[50px] transition-all duration-300 ease-in-out"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-2">
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeView === "chat" ? "default" : "ghost"}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => handleViewChange("chat")}
                  >
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chat View</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeView === "history" ? "default" : "ghost"}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => handleViewChange("history")}
                  >
                    <History className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>History View</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex-1 overflow-auto view-container">
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
