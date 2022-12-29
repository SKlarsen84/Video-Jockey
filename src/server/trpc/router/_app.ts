import { router } from "../trpc";
import { gptRouter } from "./gpt";
import { redditRouter } from "./reddit";
import { videoRouter } from "./video";
import { youtubeRouter } from "./youtube";

export const appRouter = router({
  video: videoRouter,
  reddit: redditRouter,
  gpt: gptRouter,
  youtube: youtubeRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
