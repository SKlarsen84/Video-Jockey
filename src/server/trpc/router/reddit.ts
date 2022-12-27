import Parser from "rss-parser";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export type RedditArticle = {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: string;
  author: string;
  id: string;
};
type CustomFeed = { foo: string };
export const redditRouter = router({
  getArticles: publicProcedure
    .input(z.object({ subReddit: z.string().nullish() }).nullish())
    .query(async ({ input }) => {
      const parser: Parser<CustomFeed, RedditArticle> = new Parser();
      const feed = await parser.parseURL(
        "https://www.reddit.com/r/" + input?.subReddit + "/.rss"
      );

      const articles = feed.items;
      return {
        articles,
      };
    }),

  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.video.findMany();
  // }),
});
