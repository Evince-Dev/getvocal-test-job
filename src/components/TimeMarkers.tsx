import React from "react";
import { formatTime } from "../utils/helper";
import type { CallSegment } from "../@types/callAnalytics";

type TimeMarkersProps = {
  segments: CallSegment[];
  totalTime: number;
  timelineHeight: number;
};

const TimeMarkers: React.FC<TimeMarkersProps> = ({
  segments,
  totalTime,
  timelineHeight,
}) => {
  const filteredSegments = segments.filter(
    (segment) => segment.type === "agent" || segment.type === "user"
  );

  return (
    <>
      {filteredSegments.map((segment, index) => {
        const top = (segment.start / totalTime) * timelineHeight;

        return (
          <>
            {/* Start Time */}
            <div
              key={index.toString()}
              className="absolute text-xs text-gray-400 font-mono"
              style={{
                top: `${top - 2}px`,
                left: "40px",
              }}
            >
              {formatTime(segment.start)}
            </div>
          </>
        );
      })}
    </>
  );
};

export default TimeMarkers;
