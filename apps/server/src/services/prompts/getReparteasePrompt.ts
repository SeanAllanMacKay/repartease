import { reparteaseAdjectives } from "./util";
import { openai } from "@services/ai";

export const getReparteasePrompt = async ({
  pastPrompts,
}: {
  pastPrompts: string[];
}) => {
  const prompt = `Create a ${
    reparteaseAdjectives[
      Math.floor(Math.random() * reparteaseAdjectives.length)
    ]
  } Quiplash prompt that isn't a comparison and doesn't use underscores. Do not use any of the same premises or subjects as any of the past responses.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      ...pastPrompts.map((content) => ({
        role: "assistant" as "assistant",
        content,
      })),
      { role: "system", content: prompt },
    ],
    max_tokens: 25,
    temperature: 1,
    frequency_penalty: 2,
    presence_penalty: 2,
  });

  let gamePrompt = completion?.choices?.[0]?.message?.content?.replace(
    /^\s+|\s+$/gm,
    ""
  );

  // @ts-ignore
  gamePrompt = gamePrompt?.replaceAll(`"`, "");
  // @ts-ignore
  gamePrompt = gamePrompt?.replaceAll("Q:", "");
  // @ts-ignore
  gamePrompt = gamePrompt?.replace(/A:.*/g, "");

  return gamePrompt;
};
