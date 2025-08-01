import React from "react";
import { calculateLatencyMs } from "../utils/helper";
import type { CallSegment } from "../@types/callAnalytics";

type LatencyTimelineProps = {
  segments: CallSegment[];
  totalTime: number;
  timelineHeight: number;
};

const LatencyTimeline: React.FC<LatencyTimelineProps> = ({
  segments,
  totalTime,
  timelineHeight,
}) => {
  const noiseSegments = segments.filter(
    (segment) => segment.type === "latency"
  );

  return (
    <>
      {noiseSegments.map((segment, index) => {
        const top = (segment.start / totalTime) * timelineHeight;
        const height = Math.max(
          10, // min height for segment
          ((segment.end - segment.start) / totalTime) * timelineHeight
        );

        return (
          <div key={index} className="relative group">
            <div
              className="absolute w-3 bg-gray-400 opacity-60"
              style={{
                top: `${top}px`,
                height: `${height}px`,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            ></div>

            {/* Tooltip */}
            <div
              className="absolute left-8 bg-gray-800 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 w-40"
              style={{ top: `${top}px` }}
            >
              <div className="font-semibold mb-1">
                {calculateLatencyMs(segment.start, segment.end).formatted}
              </div>
              <div>{segment.message}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default LatencyTimeline;
