
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const isMobile = useIsMobile();

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {/* Messages will be rendered here */}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={cn(
              "min-h-[80px]",
              isMobile && "min-h-[60px]"
            )}
          />
          <Button 
            size="icon" 
            className={cn(
              "shrink-0",
              isMobile ? "h-[60px]" : "h-[80px]"
            )}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
