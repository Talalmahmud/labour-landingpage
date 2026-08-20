"use client";

import Link from "next/link";
import { MapPin, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getInitials } from "@/lib/format";
import { roleToneClasses } from "@/lib/role-tone";
import type { Worker } from "@/lib/content-types";

interface WorkerProfileDialogProps {
  worker: Worker | null;
  onOpenChange: (open: boolean) => void;
}

export function WorkerProfileDialog({ worker, onOpenChange }: WorkerProfileDialogProps) {
  return (
    <Dialog open={worker !== null} onOpenChange={onOpenChange}>
      <DialogContent>
        {worker && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                  {getInitials(worker.name)}
                </span>
                <div>
                  <DialogTitle>{worker.name}</DialogTitle>
                  <DialogDescription className="flex items-center gap-2">
                    <Badge className={`rounded-full ${roleToneClasses[worker.roleTone]}`}>
                      {worker.role}
                    </Badge>
                    <span className="flex items-center gap-0.5 text-xs font-medium text-amber-500">
                      {worker.rating}
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                    </span>
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="flex flex-col gap-2 text-sm">
              <p className="text-muted-foreground">{worker.experience}</p>
              <p className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="size-4" />
                {worker.location}
              </p>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button
                className="bg-blue-950 text-white hover:bg-blue-900"
                render={<Link href={`/?service=${encodeURIComponent(worker.role)}#how-it-works`} />}
                nativeButton={false}
                onClick={() => onOpenChange(false)}
              >
                Request {worker.name.split(" ")[0]}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
