import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

export const commonAdjectives = ["hilarious", "funny"];

export * from "./getImagePrompt";

export * from "./getTextPrompt";
