
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const ProjectSettings = () => {
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      "space-y-6",
      isMobile ? "py-4 px-4" : "py-6"
    )}>
      <div>
        <h2 className={cn(
          "font-semibold",
          isMobile ? "text-base" : "text-lg"
        )}>
          Project Settings
        </h2>
        <p className="text-sm text-muted-foreground">
          View and manage your project settings.
        </p>
      </div>
      <Separator />
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Project Info</h3>
          <p className="text-sm text-muted-foreground">
            General information about your project.
          </p>
        </div>
        <div className="space-y-2">
          <div>
            <label className="text-sm font-medium">Project name</label>
            <p className="text-sm text-muted-foreground">easy-web-genius</p>
          </div>
          <div>
            <label className="text-sm font-medium">Owner</label>
            <p className="text-sm text-muted-foreground">@mtwjLwFUX6Ty9iy1VWUskSdohkE2</p>
          </div>
          <div>
            <label className="text-sm font-medium">Created at</label>
            <p className="text-sm text-muted-foreground">2025-02-10 12:57:49</p>
          </div>
          <div>
            <label className="text-sm font-medium">Tech stack</label>
            <p className="text-sm text-muted-foreground">vite_react_shadcn_ts</p>
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Visibility</h3>
          <p className="text-sm text-muted-foreground">
            Control who can view your project.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Public</span>
              <Badge>Current</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Anyone can view and remix from your profile.
            </p>
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-destructive">Danger Zone</h3>
          <p className="text-sm text-muted-foreground">
            These actions are irreversible. Proceed with caution.
          </p>
        </div>
        <Button variant="destructive">Delete Project</Button>
      </div>
    </div>
  );
};
