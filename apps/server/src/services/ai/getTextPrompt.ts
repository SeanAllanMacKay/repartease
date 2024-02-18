import { commonAdjectives, openai } from ".";

const textAdjectives = [...commonAdjectives, "offensive", "rude", "cheeky"];

export const getTextPrompt = async () => {
  const openAIPrompt = `Create a ${
    textAdjectives[Math.floor(Math.random() * textAdjectives.length)]
  } Quiplash prompt that isn't a comparison and doesn't use underscores`;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: openAIPrompt,
    max_tokens: 25,
    temperature: 1,
  });

  let gamePrompt = completion?.data?.choices?.[0]?.text?.replace(
    /^\s+|\s+$/gm,
    "",
  );

  // @ts-ignore
  gamePrompt = gamePrompt?.replaceAll(`"`, "");
  // @ts-ignore
  gamePrompt = gamePrompt?.replaceAll("Q:", "");
  // @ts-ignore
  gamePrompt = gamePrompt?.replace(/A:.*/g, "");

  return gamePrompt;
};
