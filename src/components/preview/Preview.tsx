
import { useState, useEffect } from "react";
import { Expand, Code, Eye, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Preview = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [view, setView] = useState<"preview" | "code">("preview");
  const [codeContent, setCodeContent] = useState<string>("");
  const isMobile = useIsMobile();

  const handleViewChange = (newView: "preview" | "code") => {
    setView(newView);
    if (newView === "code") {
      // In a real app, this would fetch the current file's content
      setCodeContent(`// Example code content
import React from 'react';

const MyComponent = () => {
  return <div>Hello World</div>;
};

export default MyComponent;`);
    }
    toast({
      title: `Switched to ${newView} view`,
      description: `You are now viewing the ${newView.toLowerCase()} view.`,
    });
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    const previewContainer = document.querySelector('.preview-container');
    if (previewContainer) {
      previewContainer.classList.toggle('expanded', !isExpanded);
    }
    toast({
      title: isExpanded ? "Collapsed View" : "Expanded View",
      description: `The preview is now ${isExpanded ? "collapsed" : "expanded"}.`,
    });
  };

  const handleBack = () => {
    if (isMobile) {
      // Handle mobile back navigation
      window.history.back();
    }
  };

  useEffect(() => {
    // Add expanded styles
    const style = document.createElement('style');
    style.innerHTML = `
      .preview-container.expanded {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 50;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          {isMobile && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 lg:hidden"
                    onClick={handleBack}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Back</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <div className="flex items-center gap-2">
            <Button
              variant={view === "preview" ? "default" : "ghost"}
              size={isMobile ? "sm" : "default"}
              onClick={() => handleViewChange("preview")}
              className="h-8"
            >
              <Eye className="mr-2 h-4 w-4" />
              {!isMobile && "Preview"}
            </Button>
            <Button
              variant={view === "code" ? "default" : "ghost"}
              size={isMobile ? "sm" : "default"}
              onClick={() => handleViewChange("code")}
              className="h-8"
            >
              <Code className="mr-2 h-4 w-4" />
              {!isMobile && "Code"}
            </Button>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={handleExpand}
              >
                <Expand className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isExpanded ? "Collapse" : "Expand"} View</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex-1 preview-container">
        {view === "preview" ? (
          <div className="h-full w-full">
            <iframe
              className="h-full w-full border-0"
              src="about:blank"
              title="Preview"
            />
          </div>
        ) : (
          <div className="h-full w-full overflow-auto p-4 bg-background">
            <pre className="text-sm">
              {codeContent}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
