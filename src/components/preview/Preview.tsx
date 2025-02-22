
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

interface PreviewProps {
  sourceCode?: string;
}

export const Preview = ({ sourceCode }: PreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [view, setView] = useState<"preview" | "code">("preview");
  const [codeContent, setCodeContent] = useState<string>("");
  const isMobile = useIsMobile();

  const handleViewChange = (newView: "preview" | "code") => {
    setView(newView);
    if (newView === "code") {
      setCodeContent(sourceCode || "// No code available");
    }
    toast({
      title: `Switched to ${newView} view`,
      description: `You are now viewing the ${newView.toLowerCase()} view.`,
    });
  };

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
    const previewContainer = document.querySelector('.preview-container');
    if (previewContainer) {
      previewContainer.classList.toggle('expanded', !isExpanded);
    }
    toast({
      title: !isExpanded ? "Expanded View" : "Collapsed View",
      description: `The preview is now ${!isExpanded ? "expanded" : "collapsed"}.`,
    });
  };

  const handleBack = () => {
    if (isMobile) {
      window.history.back();
    }
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .preview-container.expanded {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 50;
        background: var(--background);
      }

      .preview-content {
        width: 100%;
        height: 100%;
        border: none;
        background: var(--background);
      }

      .code-view {
        padding: 1rem;
        overflow: auto;
        font-family: monospace;
        white-space: pre-wrap;
        background: var(--background);
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
      <div className={`flex-1 preview-container ${isExpanded ? 'expanded' : ''}`}>
        {view === "preview" ? (
          <div className="h-full w-full">
            <iframe
              className="preview-content"
              src="about:blank"
              title="Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        ) : (
          <div className="h-full w-full code-view">
            <pre className="text-sm">
              {codeContent}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

