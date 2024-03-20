import { commonAdjectives, openai } from ".";

const textAdjectives = [...commonAdjectives, "offensive", "rude", "cheeky"];

export const getTextPrompt = async () => {
  const openAIPrompt = `Create a ${
    textAdjectives[Math.floor(Math.random() * textAdjectives.length)]
  } Quiplash prompt that isn't a comparison and doesn't use underscores`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [{ role: "system", content: openAIPrompt }],
    max_tokens: 25,
    temperature: 1,
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
