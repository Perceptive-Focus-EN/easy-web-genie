
import { useState, useEffect } from "react";
import { MessageSquare, History, PanelLeftClose, PanelLeft } from "lucide-react";
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

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
    toast({
      title: !isCollapsed ? "Sidebar Collapsed" : "Sidebar Expanded",
      description: `The sidebar is now ${!isCollapsed ? "collapsed" : "expanded"}.`,
    });
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .view-container {
        transition: opacity 0.15s ease-in-out;
      }
      .sidebar-panel {
        transition: width 0.3s ease-in-out;
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
        defaultSize={isCollapsed ? 5 : 25}
        minSize={15}
        maxSize={40}
        className={cn(
          "flex flex-col sidebar-panel",
          isCollapsed && "!w-[50px] !min-w-[50px] !max-w-[50px]"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-2">
          {!isCollapsed && (
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
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 ml-auto"
                  onClick={toggleSidebar}
                >
                  {isCollapsed ? (
                    <PanelLeft className="h-5 w-5" />
                  ) : (
                    <PanelLeftClose className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isCollapsed ? "Expand" : "Collapse"} Sidebar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {!isCollapsed && (
          <div className="flex-1 overflow-auto view-container">
            {activeView === "chat" ? <Chat /> : <HistoryView />}
          </div>
        )}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel 
        defaultSize={75}
        className="min-h-0"
      >
        <Preview />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
