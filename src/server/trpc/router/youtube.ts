import { z } from "zod";
import { searchYoutube } from "../../../utils/youtube";

import { router, publicProcedure } from "../trpc";

export const youtubeRouter = router({
  searchYoutube: publicProcedure.input(z.string()).query(async ({ input }) => {
    const youtubeResults = await searchYoutube(input);
    return {
      youtubeResults,
    };
  }),
});
