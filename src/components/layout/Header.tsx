
import { useState } from "react";
import { Settings, Database, Github, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ProjectSettings } from "./ProjectSettings";
import { useIsMobile } from "@/hooks/use-mobile";

export const Header = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className={cn(
            "font-semibold",
            isMobile ? "text-lg" : "text-xl"
          )}>
            easy-web-genius
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Database className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Github className="h-5 w-5" />
          </Button>
          {!isMobile && (
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Upload className="h-5 w-5" />
            </Button>
          )}
          <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Settings className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className={cn(
              isMobile ? "w-full" : "w-[400px] sm:w-[540px]"
            )} side="right">
              <ProjectSettings />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
