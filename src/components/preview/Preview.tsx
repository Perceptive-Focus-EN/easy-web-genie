
import { useState } from "react";
import { Expand, Code, Eye, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export const Preview = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [view, setView] = useState<"preview" | "code">("preview");
  const isMobile = useIsMobile();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button variant="ghost" size="icon" className="h-9 w-9 lg:hidden">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <Button
              variant={view === "preview" ? "default" : "ghost"}
              size={isMobile ? "sm" : "default"}
              onClick={() => setView("preview")}
              className="h-8"
            >
              <Eye className="mr-2 h-4 w-4" />
              {!isMobile && "Preview"}
            </Button>
            <Button
              variant={view === "code" ? "default" : "ghost"}
              size={isMobile ? "sm" : "default"}
              onClick={() => setView("code")}
              className="h-8"
            >
              <Code className="mr-2 h-4 w-4" />
              {!isMobile && "Code"}
            </Button>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Expand className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1">
        {view === "preview" ? (
          <div className="h-full w-full">
            <iframe
              className="h-full w-full border-0"
              src="about:blank"
              title="Preview"
            />
          </div>
        ) : (
          <div className="h-full w-full overflow-auto p-4">
            <pre className="text-sm">
              {/* Code view content will be rendered here */}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
