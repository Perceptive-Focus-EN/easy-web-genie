
import { ScrollArea } from "@/components/ui/scroll-area";

export const History = () => {
  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Today</div>
          <div className="space-y-2">
            <div className="rounded-lg border p-3">
              <div className="text-sm">Added new feature</div>
              <div className="text-xs text-muted-foreground">2 hours ago</div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
