import { getImagePrompt } from "@services/ai";
import { getReparteasePrompt } from "./getReparteasePrompt";

const getPicAndItDidntHappenPrompt = async () => {
  return await getImagePrompt();
};

const promptTypeFunctionMapping = {
  Repartease: getReparteasePrompt,
  "Pic And It Didn't Happen": getPicAndItDidntHappenPrompt,
};

export const getPrompt = async ({
  variant,
  pastPrompts,
}: {
  variant: string;
  pastPrompts: string[];
}) => {
  return await getReparteasePrompt({ pastPrompts });
};
