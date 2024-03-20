import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const commonAdjectives = ["hilarious", "funny"];

export * from "./getImagePrompt";

export * from "./getTextPrompt";
