import type { CallData } from "../@types/callAnalytics";
import audioFile from "../assets/audio/sample_audio.wav"; // Sample audio file

const audioUrl = audioFile;
// Sample data for demonstration
export const transcriptData: CallData = {
  audioUrl: audioUrl, // Sample audio file
  segments: [
    {
      type: "blank",
      hasNoise: false,
      start: 0,
      end: 16,
      message: "",
    },
    {
      type: "speaker",
      hasNoise: false,
      start: 17,
      end: 18,
      message: "Hello",
      processedMessage: "HelloW..",
    },
    {
      type: "agent",
      start: 19,
      end: 23,
      message:
        "hello, I am Dottie your virtual agent from power dot, how can I help you?",
      tags: ["DB_QUESTION", "depth1"],
    },
    {
      type: "blank",
      hasNoise: true,
      start: 24,
      end: 30,
      message: "",
    },
    {
      type: "speaker",
      hasNoise: false,
      start: 31,
      end: 35,
      message: "I don't know what to check.",
      processedMessage: "dont know what o check..",
    },
    {
      type: "blank",
      hasNoise: true,
      start: 36,
      end: 37,
      message: "",
    },
    {
      type: "agent",
      start: 38,
      end: 66,
      message:
        "Okay, you have a couple of ways to start charging on power dot stations. First is QR code, if you want to do a quick one time payment. Second is using the mobile app, which would require you to set up an account once. Third is an activated RFID card. Fourth is a bank card which can be used in a payment terminal. Fifth is auto charge. Can you tell me which payment method you are using?",
      tags: ["DB_ANSWER", "depth1"],
    },
    {
      type: "blank",
      hasNoise: true,
      start: 67,
      end: 74,
      message: "",
    },
    {
      type: "speaker",
      hasNoise: true,
      start: 75,
      end: 79,
      message: "Umm Credit card terminal",
      processedMessage: ":Nao, nao I confirm it.AND Bicuda Street",
    },
    {
      type: "blank",
      hasNoise: true,
      start: 80,
      end: 81,
      message: "",
    },
    {
      type: "agent",
      start: 82,
      end: 90,
      message:
        "you can either start by connecting the connector to the car or start in the credit card terminal screen. Which option do you prefer to follow?",
      tags: ["DB_ANSWER", "google/gemini-2.5-flash"],
    },
    {
      type: "blank",
      hasNoise: true,
      start: 91,
      end: 98,
      message: "",
    },
    {
      type: "speaker",
      hasNoise: false,
      start: 99,
      end: 103,
      message: "They can't find the credit card in the church here.",
      processedMessage: "xi, xin chao, xin chao",
    },
    {
      type: "blank",
      hasNoise: true,
      start: 104,
      end: 105,
      message: "",
    },
    {
      type: "agent",
      start: 106,
      end: 114,
      message:
        "Okay, so before we start, let's make sure the cable is still not plugged into your car. Please put it back on the charger. Is it done?",
      tags: ["LLM", "gpt-4o-2024-08-06"],
    },
    {
      type: "blank",
      hasNoise: true,
      start: 115,
      end: 118,
      message: "",
    },
    {
      type: "speaker",
      hasNoise: false,
      start: 119,
      end: 120,
      message: "No",
      processedMessage: "nno",
    },
    {
      type: "blank",
      hasNoise: true,
      start: 121,
      end: 122,
      message: "",
    },
    {
      type: "agent",
      start: 123,
      end: 133,
      message:
        "Make sure the cable is placed back to its position. Once you've done that, let me know, and we can proceed with the steps to start charging with your card. Is it done?",
      tags: ["LLM", "gpt-4o-2024-08-06"],
    },
    {
      type: "speaker",
      hasNoise: false,
      start: 134,
      end: 136,
      message: "Yes, yes.",
      processedMessage: "sim, sim",
    },
    {
      type: "agent",
      start: 137,
      end: 157,
      message:
        "great Now here's how you can start charging one, tap your credit card on the payment terminal. Two, follow any instructions on the screen, if prompted. Three, once the payment is authorized, connect the charging cable to your car and the session should begin. Did this work for you?",
      tags: ["DB_ANSWER", "gpt-4o-2024-08-06"],
    },
    {
      type: "blank",
      hasNoise: true,
      start: 158,
      end: 160,
      message: "",
    },
    {
      type: "speaker",
      hasNoise: true,
      start: 161,
      end: 163,
      message: "For four years",
      processedMessage: "que eu quero",
    },
    {
      type: "blank",
      hasNoise: true,
      start: 164,
      end: 166,
      message: "",
    },
    {
      type: "agent",
      start: 167,
      end: 173,
      message:
        "the session should be active once the payment is confirmed. Is everything working on your end now?",
      tags: ["DB_QUESTION", "gpt-4o-2024-08-06"],
    },
    {
      type: "blank",
      hasNoise: true,
      start: 174,
      end: 187,
      message: "",
    },
    {
      type: "agent",
      start: 188,
      end: 190,
      message: "I think I lost you. Are you there?",
    },
    {
      type: "blank",
      hasNoise: true,
      start: 191,
      end: 195,
      message: "",
    },
    {
      type: "speaker",
      hasNoise: true,
      start: 196,
      end: 209,
      message:
        "Yeah, I am here. they don't do the that's enough that's enough Thank you.",
      processedMessage:
        "Yeah, I am here. they don't do the that's enough that's enough Thank you.",
    },
    {
      type: "agent",
      start: 210,
      end: 216,
      message:
        "You're welcome. If you have any more questions in the future, feel free to reach out. Have a great day.",
      tags: ["DB_ANSWER", "google/gemini-2.5-flash"],
      hasAction: true,
      actionType: "meeting_scheduler",
    },
    {
      type: "agent",
      start: 221,
      end: 225,
      hasAction: true,
      actionType: "transffering_call",
      message: "",
    },
    {
      type: "speaker",
      hasNoise: true,
      start: 217,
      end: 218,
      message: "Thank you.",
      processedMessage: "Thank you...",
    },
    {
      type: "blank",
      hasNoise: true,
      start: 218,
      end: 225,
      message: "",
    },
  ],
};
