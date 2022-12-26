import { router } from "../trpc";
import { exampleRouter } from "./example";

export const appRouter = router({
  video: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
