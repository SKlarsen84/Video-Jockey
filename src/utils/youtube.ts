import { createWriteStream } from "fs";
import ytdl from "ytdl-core";
import ytsr from "ytsr";

export const searchYoutube = async (term: string): Promise<ytsr.Result> => {
  const result = await ytsr(term, { limit: 10, });
  return result;
};

export const downloadYoutube = (url: string, path: string): number => {
  try {
    ytdl(url).pipe(createWriteStream(path));
  } catch (error) {
    console.log(error);
    return 500;
  }
  return 200;
};
