
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Chat = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Messages will be rendered here */}
      </div>
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[80px]"
          />
          <Button size="icon" className="h-[80px]">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
