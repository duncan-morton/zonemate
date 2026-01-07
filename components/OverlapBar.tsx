"use client";

interface OverlapBarProps {
  segments: Array<{ start: number; end: number }>;
}

export default function OverlapBar({ segments }: OverlapBarProps) {
  return (
    <div className="w-full">
      <div className="relative h-12 w-full rounded-md bg-neutral-100">
        {segments.map((segment, index) => (
          <div
            key={index}
            className="absolute h-full rounded-md bg-blue-500"
            style={{
              left: `${segment.start}%`,
              width: `${segment.end - segment.start}%`,
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-between px-2 text-xs text-neutral-500">
          <span>00</span>
          <span>06</span>
          <span>12</span>
          <span>18</span>
          <span>24</span>
        </div>
      </div>
    </div>
  );
}

