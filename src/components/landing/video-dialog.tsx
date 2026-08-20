"use client";

import { X } from "lucide-react";

import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

interface VideoDialogProps {
  videoUrl: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VideoDialog({ videoUrl, open, onOpenChange }: VideoDialogProps) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  if (!embedUrl) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 p-0 sm:max-w-3xl" showCloseButton={false}>
        <DialogTitle className="sr-only">How It Works</DialogTitle>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          {open && (
            <iframe
              src={embedUrl}
              title="How It Works"
              className="size-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          <DialogClose
            render={<button type="button" />}
            className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
          >
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
