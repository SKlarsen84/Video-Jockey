import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const videoRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.video.findMany();
  }),

  //addnewVideo takes a video object and adds it to the database
  addNewVideo: publicProcedure
    .input(
      z.object({
        video: z.object({
          id: z.string(),
          title: z.string(),
          reddit_id: z.string(),
          reddit_title: z.string(),
          reddit_content: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const video = await ctx.prisma.video.create({
        data: {
          ...input.video,
        },
      });
      return video;
    }),
});
