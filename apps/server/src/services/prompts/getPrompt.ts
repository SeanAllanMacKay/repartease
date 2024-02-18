import { getTextPrompt, getImagePrompt } from "@services/ai";

const getReparteasePrompt = async () => {
  return await getTextPrompt();
};

const getPicAndItDidntHappenPrompt = async () => {
  return await getImagePrompt();
};

const promptTypeFunctionMapping = {
  Repartease: getReparteasePrompt,
  "Pic And It Didn't Happen": getPicAndItDidntHappenPrompt,
};

export const getPrompt = async () => {
  return await getReparteasePrompt();
};
