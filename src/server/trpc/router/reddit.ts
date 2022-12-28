import Parser from "rss-parser";
import snoowrap from "snoowrap";
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

  getArticleComments: publicProcedure
    .input(z.object({ articleId: z.string() }))
    .query(async ({ input }) => {
      const redditReader = new snoowrap({
        accessToken: process.env.REDDIT_ACCESS_TOKEN,
        refreshToken: process.env.REDDIT_REFRESH_TOKEN,
        clientId: process.env.REDDIT_CLIENT_ID,
        clientSecret: process.env.REDDIT_CLIENT_SECRET,
        userAgent: process.env.REDDIT_USER_AGENT as string,
      });

      const comms = await redditReader
        .getSubmission(input?.articleId)
        .expandReplies({ limit: 25, depth: 1 })
        .then((o) => o.comments);
      const comments = comms.map((c) => c.body);

      return {
        comments,
      };
    }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.video.findMany();
  // }),
});
