
import { useState } from "react";
import { Expand, Code, Eye, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Preview = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [view, setView] = useState<"preview" | "code">("preview");

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 lg:hidden">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant={view === "preview" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("preview")}
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button
              variant={view === "code" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("code")}
            >
              <Code className="mr-2 h-4 w-4" />
              Code
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
            {/* Preview iframe will be rendered here */}
          </div>
        ) : (
          <div className="h-full w-full p-4">
            {/* Code view will be rendered here */}
          </div>
        )}
      </div>
    </div>
  );
};
