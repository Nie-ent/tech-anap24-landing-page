import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  durationSeconds = 28,
}: {
  children: ReactNode;
  className?: string;
  durationSeconds?: number;
}) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div
        className="flex w-max shrink-0 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        <div className="flex shrink-0 items-center gap-x-10 pr-10">{children}</div>
        <div className="flex shrink-0 items-center gap-x-10 pr-10" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
