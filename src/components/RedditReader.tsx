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
    subReddit: "GamingLeaksAndRumours",
  });

  return (
    <section className="flex h-full w-4/12 flex-col overflow-y-scroll bg-gray-50 pt-3">
      <label className="px-3">
        <input
          className="w-full rounded-lg bg-gray-100 p-4 transition duration-200 focus:outline-none focus:ring-2"
          placeholder="Search..."
        />
      </label>

      <ul className="mt-6">
        {articles.data
          ? articles.data.articles.map((article) => (
              <li
                className={
                  selectedArticle?.id === article.id
                    ? "border-b bg-indigo-100 py-5 px-3 transition"
                    : "border-b py-5 px-3 transition hover:bg-indigo-100"
                }
                key={article.id}
              >
                <a
                  href="#"
                  className="flex items-center justify-between"
                  onClick={() => setSelectedArticle(article)}
                >
                  <h3 className="text-lg font-semibold">{article.title}</h3>
                  <p className="text-md text-gray-400">{article.isoDate}</p> 
                </a>
              </li>
            ))
          : "Loading tRPC query..."}
      </ul>
    </section>
  );
};
