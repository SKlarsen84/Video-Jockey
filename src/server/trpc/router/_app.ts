import { router } from "../trpc";
import { gptRouter } from "./gpt";
import { redditRouter } from "./reddit";
import { videoRouter } from "./video";

export const appRouter = router({
  video: videoRouter,
  reddit: redditRouter,
  gpt: gptRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
