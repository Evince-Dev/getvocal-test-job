export type SegmentType = "agent" | "user" | "latency";
export type ActionType = "meeting_scheduler" | "transffering_call";

export interface CallSegment {
  type: SegmentType;
  start: number;
  end: number;
  message: string; // Original message content before any modifications
  processedMessage?: string;
  hasNoise?: boolean; // Indicates whether the segment contains noise
  tags?: string[]; // Additional tags for the segment
  hasAction?: boolean; // Indicates whether the segment contains an action
  actionType?: ActionType; // Type of action in the segment (if any)
}

export interface CallData {
  segments: CallSegment[];
  audioUrl: string;
}
