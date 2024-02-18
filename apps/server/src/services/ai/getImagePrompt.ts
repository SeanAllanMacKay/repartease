import { commonAdjectives, openai } from ".";

const imageAdjectives = [...commonAdjectives, "ridiculous", "wacky", "absurd"];

const excludedWords = [
  "clown",
  "banana",
  "unicycle",
  "tightrope",
  "tricycle",
  "tutu",
  "scooter",
  "segway",
  "top hat",
  "umbrella",
  "cowboy hat",
  "roller skates",
];

export const getImagePrompt = async () => {
  const adjective =
    imageAdjectives[Math.floor(Math.random() * imageAdjectives.length)];

  const textPrompt = `Describe a ${adjective} image in one sentence that would make people laugh but don't use any of the following words: ${excludedWords.reduce(
    (total, current, index) =>
      `${total}${!index ? "" : ","} ${
        index === excludedWords.length - 1 ? "or " : " "
      }${current}`,
    "",
  )}. Don't use an animal.`;

  const prompt = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: textPrompt,
    max_tokens: 25,
    temperature: 0.75,
  });

  console.log("textPrompt", textPrompt);

  console.log(
    "prompt",
    prompt?.data?.choices?.[0]?.text?.replace(/^\s+|\s+$/gm, ""),
  );

  const image = await openai.createImage({
    prompt:
      `In a hyper-realistic digital art style, show me this scene: "${prompt?.data?.choices?.[0]?.text?.replace(
        /^\s+|\s+$/gm,
        "",
      )}"` || "",
    n: 1,
    size: "256x256",
  });

  return image?.data?.data?.[0]?.url;
};
