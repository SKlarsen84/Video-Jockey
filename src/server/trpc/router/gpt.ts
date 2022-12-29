import { z } from "zod";
import { gptWriteRecap } from "../../../utils/gpt";

import { router, publicProcedure } from "../trpc";

export const gptRouter = router({
  getScript: publicProcedure
    .input(
      z.object({
        title: z.string(),
        comments: z.array(z.string()),
        content: z.string(),
      })
    )
    .query(async ({ input }) => {
      const script = await gptWriteRecap(
        input.title,
        input.content,
        input.comments
      );
      return {
        script,
      };
    }),
});
