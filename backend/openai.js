import fs from "fs";
import path from "path";
import OpenAI from "openai";
const OPENAI_APIKEY = "sk-proj-eISxHB6ZdkVwRk9JFl6gT3BlbkFJcWL0HgdhBSmCsrpnAr5P";
const ORGANIZATION_KEY = "org-d2qZS2onV9cMpAX8FSEbF2OY";
const openai = new OpenAI({
    apiKey: OPENAI_APIKEY,
    organization: ORGANIZATION_KEY,
});

const speechFile = path.resolve("./generatedAudios/sound.mp3");

export async function generateAudio(text) {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  });
//   console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}
