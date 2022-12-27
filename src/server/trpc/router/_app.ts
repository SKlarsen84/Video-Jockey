import { router } from "../trpc";
import { redditRouter } from "./reddit";
import { videoRouter } from "./video";

export const appRouter = router({
  video: videoRouter,
  reddit: redditRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
