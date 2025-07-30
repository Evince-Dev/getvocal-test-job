import { Volume2 } from "lucide-react";

type Props = {
  toggleMute: () => void;
  handleChange: (newVolume: number) => void;
  isMuted: boolean;
  volume: number;
};
const VolumeController: React.FC<Props> = ({
  toggleMute,
  handleChange,
  isMuted,
  volume,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={toggleMute}
        className="text-gray-500 hover:text-gray-700"
      >
        {isMuted ? (
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-3 h-3 bg-gray-500 rounded-sm relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-0.5 h-3 bg-white transform rotate-45"></div>
              </div>
            </div>
          </div>
        ) : (
          <Volume2 size={16} />
        )}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={isMuted ? 0 : volume}
        onChange={(e) => handleChange(parseFloat(e.target.value))}
        className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default VolumeController;
