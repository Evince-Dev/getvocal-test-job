import React from "react";
import { formatTime } from "../utils/helper";
import type { CallSegment } from "../@types/callAnalytics";

type BlankTimelineProps = {
  segments: CallSegment[];
  totalTime: number;
  timelineHeight: number;
};

const BlankTimeline: React.FC<BlankTimelineProps> = ({
  segments,
  totalTime,
  timelineHeight,
}) => {
  const noiseSegments = segments.filter((segment) => segment.type === "blank");

  return (
    <>
      {noiseSegments.map((segment, index) => {
        const top = (segment.start / totalTime) * timelineHeight;
        const height = Math.max(
          10,
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
                {`blank - ${formatTime(segment.start)} - ${formatTime(
                  segment.end
                )}`}
              </div>
              <div>{segment.message}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BlankTimeline;
