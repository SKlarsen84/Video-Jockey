import { z } from "zod";
import { imageOverlay } from "../../../utils/thumbnailMaker";
import { searchYoutube, downloadYoutube } from "../../../utils/youtube";

import { router, publicProcedure } from "../trpc";

export const youtubeRouter = router({
  searchYoutube: publicProcedure.input(z.string()).query(async ({ input }) => {
    const youtubeResults = await searchYoutube(input);
    return {
      youtubeResults,
    };
  }),

  generateThumbnail: publicProcedure
    .input(z.object({ image: z.string(), fileName: z.string() }))
    .mutation(async ({input}) => {
      console.log(input);
      const image = await imageOverlay(input.image, input.fileName);
      return {
        image,
      };
    }),

  downloadVideo: publicProcedure
    .input(z.object({ url: z.string(), path: z.string() }))
    .mutation(async ({ input }) => {
      const dlStatus = await downloadYoutube(input.url, input.path);

      return {
        dlStatus,
      };
    }),
});
