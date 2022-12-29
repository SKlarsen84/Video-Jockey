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
    .input(z.string())
    .query(async ({ input }) => {
      const redditReader = new snoowrap({
        accessToken: process.env.REDDIT_ACCESS_TOKEN,
        refreshToken: process.env.REDDIT_REFRESH_TOKEN,
        clientId: process.env.REDDIT_CLIENT_ID,
        clientSecret: process.env.REDDIT_CLIENT_SECRET,
        userAgent: process.env.REDDIT_USER_AGENT as string,
      });

      const entries: string[] = [];

      //recursive function to get all replies

      const getReplies = (comment: { body?: any; replies?: any }) => {
        if (comment.replies.length > 0) {
          comment.replies.forEach((reply: { body: any }) => {
            entries.push(reply.body);
            getReplies(reply);
          });
        }
      };

      const comms = await redditReader
        .getSubmission(input)
        .expandReplies({ limit: Infinity, depth: Infinity })
        .then((o) => o.comments);

      //get all replies for all comms
      comms.forEach((comment: { body: any; replies: any }) => {
        entries.push(comment.body);
        getReplies(comment);
      });

      console.log(entries);
      return {
        entries,
      };
    }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.video.findMany();
  // }),
});
