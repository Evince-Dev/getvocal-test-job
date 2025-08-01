import React from "react";
import { Sparkle } from "lucide-react";
import { formatTime } from "../utils/helper";
import type { CallSegment } from "../@types/callAnalytics";
import ActionButton from "./ActionButton";

type SegmentTimelineProps = {
  segments: CallSegment[];
  type: "agent" | "user";
  totalTime: number;
  timelineHeight: number;
  currentTime: number;
  handleClick: (segment: CallSegment) => void;
};

const SegmentTimeline: React.FC<SegmentTimelineProps> = ({
  segments,
  type,
  totalTime,
  timelineHeight,
  currentTime,
  handleClick,
}) => {
  const filteredSegments = segments.filter((segment) => segment.type === type);

  return (
    <>
      {filteredSegments.map((segment, index) => {
        const top = (segment.start / totalTime) * timelineHeight;
        const height = Math.max(
          10, // min height for segment
          ((segment.end - segment.start) / totalTime) * timelineHeight
        );
        const isActive = currentTime >= segment.start;

        return (
          <div key={index} className="relative group">
            {segment.message && (
              <div
                className={`absolute w-6 rounded border-2 cursor-pointer transition-all duration-200 
                ${isActive ? "opacity-100" : "opacity-50"}
                ${
                  type === "agent"
                    ? "bg-blue-200 border-blue-600"
                    : "bg-green-200 border-green-600"
                }`}
                style={{
                  top: `${top}px`,
                  height: `${height}px`,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
                onClick={() => handleClick(segment)}
              ></div>
            )}

            <>
              {/* Start Time */}
              <div
                className="absolute text-xs text-gray-600 font-mono"
                style={{
                  top: `${top - 8}px`,
                  [type === "agent" ? "right" : "left"]: "65px",
                }}
              >
                {formatTime(segment.start)}
              </div>

              {/* End Time */}
              <div
                className="absolute text-xs text-gray-600 font-mono"
                style={{
                  top: `${top + height - 8}px`,
                  [type === "agent" ? "right" : "left"]: "65px",
                }}
              >
                {formatTime(segment.end)}
              </div>
            </>

            {/* Noise Icon */}
            {segment.hasNoise && (
              <div
                className="absolute"
                style={{
                  top: `${top + height - 8}px`,
                  [type === "agent" ? "right" : "left"]: "93px",
                }}
              >
                <Sparkle size={12} color="red" />
              </div>
            )}

            {/* Transcript */}
            {isActive && segment.message && (
              <div
                className={`hidden lg:block absolute bg-primary text-white text-xs rounded p-2 transition-opacity z-10 min-w-48 w-[max-content] max-w-60 xl:max-w-72 ${
                  type === "agent" ? "right-27" : "left-27"
                }`}
                style={{ top: `${top}px` }}
              >
                <div>{segment.message}</div>
                {segment.processedMessage && (
                  <div className="border-t border-white">
                    <b>Processed message:-</b>
                    <div className="">{segment.processedMessage}</div>
                  </div>
                )}

                {/* tags */}
                <div className="my-1 flex flex-wrap gap-1">
                  {segment.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block p-[2px] text-xs font-semibold bg-white text-primary rounded shadow-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button */}
            {segment.hasAction && segment.actionType && (
              <div
                className="hidden md:block absolute"
                style={{
                  top: `${top}px`,
                  [type === "agent" ? "right" : "left"]: "110px",
                }}
              >
                <ActionButton
                  type={segment.actionType}
                  handleClick={() => {
                    // alert("clicked");
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default SegmentTimeline;
