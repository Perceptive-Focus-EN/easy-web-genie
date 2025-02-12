
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export const ProjectSettings = () => {
  const isMobile = useIsMobile();
  const { settings } = useSettingsStore();
  const { projectInfo, visibility } = settings;

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
            <p className="text-sm text-muted-foreground">{projectInfo.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Owner</label>
            <p className="text-sm text-muted-foreground">{projectInfo.owner}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Created at</label>
            <p className="text-sm text-muted-foreground">{projectInfo.createdAt}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Tech stack</label>
            <p className="text-sm text-muted-foreground">{projectInfo.techStack}</p>
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
              <span className="text-sm font-medium">
                {visibility.isPublic ? 'Public' : 'Private'}
              </span>
              <Badge>Current</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {visibility.description}
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Project</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                project and remove all of its contents from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground">
                Delete Project
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
