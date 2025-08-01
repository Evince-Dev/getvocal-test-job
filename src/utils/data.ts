import type { CallData } from "../@types/callAnalytics";
import audioFile from "../assets/audio/sample_audio.wav"; // Sample audio file

const audioUrl = audioFile;
// Sample data for demonstration
export const transcriptData: CallData = {
  audioUrl: audioUrl, // Sample audio file
  segments: [
    {
      type: "user",
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
        "Hello, I am Dottie your virtual agent from power dot, how can I help you?",
      tags: ["DB_QUESTION", "depth1"],
    },
    {
      type: "user",
      hasNoise: false,
      start: 31,
      end: 35,
      message: "I don't know what to check.",
      processedMessage: "Dont know what o check..",
    },
    {
      type: "latency",
      hasNoise: true,
      start: 36,
      end: 38,
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
      type: "user",
      hasNoise: true,
      start: 75,
      end: 79,
      message: "Umm Credit card terminal",
      processedMessage: ":Nao, nao I confirm it.AND Bicuda Street",
    },
    {
      type: "latency",
      hasNoise: true,
      start: 80,
      end: 82,
      message: "",
    },
    {
      type: "agent",
      start: 82,
      end: 90,
      message:
        "You can either start by connecting the connector to the car or start in the credit card terminal screen. Which option do you prefer to follow?",
      tags: ["DB_ANSWER", "google/gemini-2.5-flash"],
    },
    {
      type: "user",
      hasNoise: false,
      start: 99,
      end: 103,
      message: "They can't find the credit card in the church here.",
      processedMessage: "Xi, xin chao, xin chao",
    },
    {
      type: "latency",
      hasNoise: true,
      start: 104,
      end: 107,
      message: "",
    },
    {
      type: "agent",
      start: 107,
      end: 115,
      message:
        "Okay, so before we start, let's make sure the cable is still not plugged into your car. Please put it back on the charger. Is it done?",
      tags: ["LLM", "gpt-4o-2024-08-06"],
    },
    {
      type: "user",
      hasNoise: false,
      start: 119,
      end: 120,
      message: "No",
      processedMessage: "nno",
    },
    {
      type: "latency",
      hasNoise: true,
      start: 121,
      end: 123,
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
      type: "user",
      hasNoise: false,
      start: 134,
      end: 136,
      message: "Yes, yes.",
      processedMessage: "Sim, sim",
    },
    {
      type: "agent",
      start: 137,
      end: 157,
      message:
        "Great Now here's how you can start charging one, tap your credit card on the payment terminal. Two, follow any instructions on the screen, if prompted. Three, once the payment is authorized, connect the charging cable to your car and the session should begin. Did this work for you?",
      tags: ["DB_ANSWER", "gpt-4o-2024-08-06"],
    },
    {
      type: "user",
      hasNoise: true,
      start: 161,
      end: 164,
      message: "For four years",
      processedMessage: "Que eu quero",
    },
    {
      type: "latency",
      hasNoise: true,
      start: 165,
      end: 167,
      message: "",
    },
    {
      type: "agent",
      start: 168,
      end: 173,
      message:
        "The session should be active once the payment is confirmed. Is everything working on your end now?",
      tags: ["DB_QUESTION", "gpt-4o-2024-08-06"],
    },
    {
      type: "agent",
      start: 188,
      end: 190,
      message: "I think I lost you. Are you there?",
    },
    {
      type: "user",
      hasNoise: true,
      start: 196.5,
      end: 208.5,
      message:
        "Yeah, I am here. they don't do the that's enough that's enough Thank you.",
      processedMessage:
        "Yeah, I am here. they don't do the that's enough that's enough Thank you.",
    },
    {
      type: "latency",
      hasNoise: true,
      start: 209,
      end: 210.5,
      message: "",
    },
    {
      type: "agent",
      start: 210.5,
      end: 216.5,
      message:
        "You're welcome. If you have any more questions in the future, feel free to reach out. Have a great day.",
      tags: ["DB_ANSWER", "google/gemini-2.5-flash"],
      hasAction: true,
      actionType: "meeting_scheduler",
    },
    {
      type: "user",
      hasNoise: true,
      start: 217.5,
      end: 218,
      message: "Thank you.",
      processedMessage: "Thank you...",
    },
    {
      type: "agent",
      start: 221,
      end: 225,
      hasAction: true,
      actionType: "transffering_call",
      message: "",
    },
  ],
};
