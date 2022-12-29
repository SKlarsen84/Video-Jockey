import type Parser from "rss-parser";
import type { RedditArticle } from "../server/trpc/router/reddit";
import { trpc } from "../utils/trpc";

interface Props {
  selectedArticle: (RedditArticle & Parser.Item) | undefined;
  setSelectedArticle: (article: RedditArticle & Parser.Item) => void;
}

export const RedditReader = ({
  selectedArticle,
  setSelectedArticle,
}: Props) => {
  const articles = trpc.reddit.getArticles.useQuery({
    subReddit: "gamernews",
  });

  return (
    <section className="flex h-full w-4/12 flex-col overflow-y-scroll bg-gray-50 p-6  pt-3 dark:bg-gray-700">
      <label className="px-3">
        <input
          className="w-full rounded-lg bg-gray-100 p-4 transition duration-200 focus:outline-none focus:ring-2"
          placeholder="Search..."
        />
      </label>

      {articles.data
        ? articles.data.articles.map((article) => (
            <a
              key={article.id}
              href="#"
              className="m-2 block rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={() => setSelectedArticle(article)}
            >
              <p className="text-1xl mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                {article.title}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {article.pubDate}
              </p>
            </a>
          ))
        : "Loading tRPC query..."}
    </section>
  );
};
