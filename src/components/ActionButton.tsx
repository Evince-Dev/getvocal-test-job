import { useMemo } from "react";
import type { ActionType } from "../@types/callAnalytics";
import { Calendar, PhoneForwarded } from "lucide-react"; // or pass as prop if custom

type Props = {
  handleClick: () => void;
  type: ActionType;
};
const ActionButton: React.FC<Props> = ({ handleClick, type }) => {
  const getText = useMemo(() => {
    switch (type) {
      case "meeting_scheduler":
        return "Meeting scheduler";
      case "transffering_call":
        return "Transffering call";
      default:
        return "";
    }
  }, [type]);

  const getIcon = useMemo(() => {
    switch (type) {
      case "meeting_scheduler":
        return <Calendar size={14} />;
      case "transffering_call":
        return <PhoneForwarded size={14} />;
      default:
        return null;
    }
  }, [type]);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      className="text-primary transition-colors shadow-sm min-w-36 lg:min-w-48"
    >
      <div className="flex items-center justify-around lg:space-x-2 p-1 lg:p2 text-sm">
        <span>{getText}</span>
        {getIcon}
      </div>
    </button>
  );
};

export default ActionButton;
