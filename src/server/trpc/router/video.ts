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
          reddit_comments: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const video = await ctx.prisma.video.create({
        data: {
          ...input.video,
          script: '',
          status: 'reddit added',
          status_step: 1
        },
      });
      return video;
    }),

  //removeVideo takes a video object and removes it from the database
  removeVideo: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const video = await ctx.prisma.video.delete({
        where: {
          id: input.id,
        },
      });
      return video;
    }),

  //updateVideo takes a video object and updates it in the database
  updateVideo: publicProcedure
    .input(
      z.object({
        video: z.object({
          id: z.string(),
          title: z.string(),
          reddit_id: z.string(),
          reddit_title: z.string(),
          reddit_content: z.string(),
          script: z.string().nullish()
        }),
        status: z.string(),
        status_step: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const video = await ctx.prisma.video.update({
        where: {
          id: input.video.id,
        },
        data: {
          ...input.video,
          status: input.status,
          status_step: input.status_step
        },
      });
      return video;
    }),
});
