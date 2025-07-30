import React, { useState, useRef, useEffect } from "react";
import { transcriptData } from "../utils/data";
import { Play, Pause, Sparkle } from "lucide-react";
import { AudioController, BlankTimeline, SegmentTimeline } from "../components";
import { formatTime } from "../utils/helper";

const CallAnalytics: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [containerHeight, setContainerHeight] = useState(450);

  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const maxTime = Math.max(...transcriptData.segments.map((s) => s.end));
  const totalTime = duration || maxTime;

  // Dynamic scaling based on content length
  const minPixelsPerSecond = 8; // Minimum scale for very long recordings
  const maxPixelsPerSecond = 20; // Maximum scale for short recordings
  const basePixelsPerSecond = Math.max(
    minPixelsPerSecond,
    Math.min(maxPixelsPerSecond, 800 / totalTime)
  );

  const timelineHeight = Math.max(400, totalTime * basePixelsPerSecond);

  useEffect(() => {
    const calculateHeight = () => {
      // Calculate available height
      // Subtract header, controls, padding, etc.
      const headerHeight = 100; // Approximate height of your header and controls
      const padding = 165; // Additional padding/margins
      const availableHeight = window.innerHeight - headerHeight - padding;

      // Set minimum height to avoid too small containers
      const minHeight = 450;
      setContainerHeight(Math.max(minHeight, availableHeight));
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  // Auto-scroll function - only scroll when button is out of view
  const scrollToCurrentTime = () => {
    if (!scrollContainerRef.current || !isPlaying) return;

    const container = scrollContainerRef.current;
    const buttonPosition = (currentTime / totalTime) * timelineHeight;
    const currentScrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const visibleTop = currentScrollTop;
    const visibleBottom = currentScrollTop + containerHeight;

    // Add some padding to trigger scroll before button completely disappears
    const triggerPadding = 50;
    // How far from top to position button when scrolling
    const scrollPadding = 100;

    // Check if button is out of view (considering the button height of ~24px)
    const buttonTop = buttonPosition - 12; // Half button height
    const buttonBottom = buttonPosition + 12; // Half button height

    let needsScroll = false;
    let newScrollTop = currentScrollTop;

    // Button is going below visible area - scroll to position it well above top
    if (buttonBottom > visibleBottom - triggerPadding) {
      newScrollTop = buttonPosition - scrollPadding;
      needsScroll = true;
    }
    // Button is going above visible area - scroll to position it below top
    else if (buttonTop < visibleTop + triggerPadding) {
      newScrollTop = buttonPosition - scrollPadding;
      needsScroll = true;
    }

    if (needsScroll) {
      container.scrollTo({
        top: Math.max(
          0,
          Math.min(newScrollTop, timelineHeight - containerHeight)
        ),
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Auto-scroll effect - only when button goes out of view
  useEffect(() => {
    if (isPlaying) {
      scrollToCurrentTime();
    }
  }, [currentTime, isPlaying, totalTime, timelineHeight]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const seekToTime = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleTimelineClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickY = event.clientY - rect.top;

    // Simple calculation: click position relative to timeline height
    const newTime = Math.max(
      0,
      Math.min(totalTime, (clickY / timelineHeight) * totalTime)
    );

    seekToTime(newTime);
  };

  const activeSegment = transcriptData.segments.filter(
    (segment) => currentTime >= segment.start && currentTime <= segment.end
  )[0];
  console.log("activeSegment: ", activeSegment);
  return (
    <div className="w-full max-w-5xl  mx-auto p-3 lg:p-6 bg-white">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={transcriptData.audioUrl} preload="metadata" />

      <div className="lg:mb-2">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Call Analytics
        </h1>
        <div className="text-sm text-gray-600 mb-4 flex items-center gap-2">
          <Sparkle size={12} color="red" /> Represents background noise.
        </div>

        {/* Audio Controls */}
        <AudioController
          togglePlayPause={togglePlayPause}
          isLoading={isLoading}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration || maxTime}
          toggleMute={toggleMute}
          handleVolumeChange={handleVolumeChange}
          isMuted={isMuted}
          volume={volume}
          seekToTime={seekToTime}
        />
      </div>

      {/* Transcript at top only for mobile+tablet */}
      <div className="block lg:hidden text-gray-600 text-sm mb-1 px-1 h-20 md:h-16 overflow-auto">
        <span className="font-bold capitalize">
          Transcript{" "}
          {activeSegment?.message &&
            activeSegment.type &&
            `(${activeSegment.type})`}
          :-
        </span>
        {activeSegment?.message}
      </div>

      {/* Scrollable Timeline Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-y-auto scroll-smooth"
        style={{ height: `${containerHeight}px` }}
      >
        <div className="grid grid-cols-3 gap-1 lg:gap-3 max-w-lg mx-auto justify-items-center">
          {/* AI Agent Column */}
          <div className="flex flex-col items-center">
            <div className="bg-blue-50 p-2 rounded-lg mb-4 w-full text-center sticky top-0 z-30  shadow-sm">
              <h2 className="font-semibold text-gray-800">AI Agent</h2>
            </div>

            <div
              className="relative"
              style={{ height: `${timelineHeight}px`, width: "100px" }}
            >
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 h-full"></div>

              {/* Segment rectangles */}
              <SegmentTimeline
                segments={transcriptData.segments}
                type="agent"
                totalTime={totalTime}
                timelineHeight={timelineHeight}
                currentTime={currentTime}
                handleClick={(seg) => seekToTime(seg.start)}
              />
            </div>
          </div>

          {/* Timeline Column */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-50 p-2 rounded-lg mb-4 w-full text-center sticky top-0 z-30  shadow-sm font-semibold text-gray-800">
              <h2 className="hidden lg:block">Timeline of audio</h2>
              <h2 className="block lg:hidden">Timeline</h2>
            </div>

            <div
              className="relative bg-gray-100 rounded-lg cursor-pointer"
              style={{ height: `${timelineHeight}px`, width: "60px" }}
              onClick={handleTimelineClick}
            >
              {/* Timeline background */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-400 h-full rounded"></div>

              {/* Progress indicator */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-500 rounded transition-all duration-100"
                style={{
                  height: `${
                    (currentTime / (duration || maxTime)) * timelineHeight
                  }px`,
                  top: 0,
                }}
              ></div>

              {/* Current Time Position Button */}
              <div
                style={{
                  top: `${
                    (currentTime / (duration || maxTime)) * timelineHeight - 8
                  }px`,
                  left: "50%",
                }}
                className="absolute"
              >
                {/* Dotted line behind the button */}
                <span
                  className={`absolute top-3 left-1/2 transform -translate-x-1/2 border border-dashed w-56 lg:w-80 z-10 ${
                    isPlaying ? "bg-red-500" : "bg-blue-500"
                  }`}
                />

                {/* Button on top */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent timeline click
                    togglePlayPause();
                  }}
                  disabled={isLoading}
                  className={`z-20 absolute w-6 h-6 transform -translate-x-1/2 duration-100 rounded-full flex items-center justify-center text-white transition-colors ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : isPlaying
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : isPlaying ? (
                    <Pause size={14} />
                  ) : (
                    <Play size={14} />
                  )}
                </button>
              </div>

              {/* Time markers */}
              {Array.from(
                { length: Math.ceil((duration || maxTime) / 15) + 1 },
                (_, i) => i * 15
              )
                .filter((time) => time <= (duration || maxTime))
                .map((time) => (
                  <div
                    key={time}
                    className="absolute text-xs text-gray-600 font-mono"
                    style={{
                      top: `${
                        (time / (duration || maxTime)) * timelineHeight - 6
                      }px`,
                      left: "70px",
                    }}
                  >
                    {formatTime(time)}
                  </div>
                ))}

              {/* Noise segments overlay */}
              <BlankTimeline
                segments={transcriptData.segments}
                totalTime={totalTime}
                timelineHeight={timelineHeight}
              />
            </div>

            {/* <div className="mt-4 text-center sticky bottom-0 bg-white pt-2">
              <div className="text-xs text-gray-500">Click to seek</div>
              <div className="text-xs font-mono text-gray-600 mt-1">
                Total: {formatTime(duration || maxTime)}
              </div>
            </div> */}
          </div>

          {/* Speaker Column */}
          <div className="flex flex-col items-center">
            <div className="bg-green-50 p-2 rounded-lg mb-4 w-full text-center sticky top-0 z-30 shadow-sm">
              <h2 className="font-semibold text-gray-800">Speaker</h2>
            </div>

            <div
              className="relative"
              style={{ height: `${timelineHeight}px`, width: "100px" }}
            >
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 h-full"></div>

              {/* Segment rectangles */}
              <SegmentTimeline
                segments={transcriptData.segments}
                type="speaker"
                totalTime={totalTime}
                timelineHeight={timelineHeight}
                currentTime={currentTime}
                handleClick={(seg) => seekToTime(seg.start)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallAnalytics;
