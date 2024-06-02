import { openai } from ".";

const imageAdjectives = ["ridiculous", "wacky", "absurd"];

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
    ""
  )}. Don't use an animal.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [{ role: "system", content: textPrompt }],
    max_tokens: 25,
    temperature: 1.5,
  });

  let gamePrompt = completion?.choices?.[0]?.message?.content?.replace(
    /^\s+|\s+$/gm,
    ""
  );

  const image = await openai.images.generate({
    prompt:
      `In a hyper-realistic digital art style, show me this scene: "${gamePrompt}"` ||
      "",
    n: 1,
    size: "256x256",
  });

  return image?.data?.[0]?.url;
};
