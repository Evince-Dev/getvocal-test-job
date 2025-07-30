import React from "react";
import { Sparkle } from "lucide-react";
import { formatTime } from "../utils/helper";
import type { CallSegment } from "../@types/callAnalytics";
import ActionButton from "./ActionButton";

type SegmentTimelineProps = {
  segments: CallSegment[];
  type: "agent" | "speaker";
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
          20,
          ((segment.end - segment.start) / totalTime) * timelineHeight
        );
        const isActive =
          currentTime >= segment.start && currentTime <= segment.end;

        return (
          <div
            key={index}
            className="relative group"
            onClick={() => handleClick(segment)}
          >
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
            ></div>
            <>
              {/* Start Time */}
              <div
                className="absolute text-xs text-gray-600 font-mono"
                style={{
                  top: `${top - 2}px`,
                  [type === "agent" ? "right" : "left"]: "65px",
                }}
              >
                {formatTime(segment.start)}
              </div>

              {/* End Time */}
              <div
                className="absolute text-xs text-gray-600 font-mono"
                style={{
                  top: `${top + height - 10}px`,
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
                  top: `${top + height - 10}px`,
                  [type === "agent" ? "right" : "left"]: "100px",
                }}
              >
                <Sparkle size={12} color="red" />
              </div>
            )}

            {/* Transcript */}
            {isActive && segment.message && (
              <div
                className={`hidden lg:block absolute bg-primary text-white text-xs rounded p-2 transition-opacity z-10 w-60 ${
                  type === "agent" ? "right-25" : "left-25"
                }`}
                style={{ top: `${top}px` }}
              >
                <div className="font-semibold mb-1">
                  {formatTime(segment.start)} - {formatTime(segment.end)}
                </div>
                <div>{segment.message}</div>
                {segment.processedMessage && (
                  <div className="border-t border-white">
                    <b>Processed message:-</b>
                    <div className="">{segment.processedMessage}</div>
                  </div>
                )}

                <div className="my-1 flex flex-wrap gap-1">
                  {segment.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block p-1 text-xs font-semibold bg-white text-primary rounded-full"
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
                  [type === "agent" ? "right" : "left"]: "100px",
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
