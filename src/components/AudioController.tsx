import { formatTime } from "../utils/helper";
import { Play, Pause } from "lucide-react";

type Props = {
  togglePlayPause: () => void;
  isLoading: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  seekToTime: (time: number) => void;
};
const AudioController: React.FC<Props> = ({
  togglePlayPause,
  isLoading,
  isPlaying,
  currentTime,
  duration,
  seekToTime,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-2 lg:p-4 mb-2">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlayPause}
            disabled={isLoading}
            className={`w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-white transition-colors ${
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
              <Pause size={16} />
            ) : (
              <Play size={16} />
            )}
          </button>

          <div className="text-md lg:text-lg font-mono text-blue-600">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="w-full bg-gray-200 rounded-full h-2 cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const newTime = (clickX / rect.width) * duration;
          seekToTime(newTime);
        }}
      >
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-100"
          style={{
            width: `${(currentTime / duration) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default AudioController;
