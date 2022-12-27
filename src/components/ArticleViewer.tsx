import type Parser from "rss-parser";
import type { RedditArticle } from "../server/trpc/router/reddit";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

interface ArticleViewerProps {
  article: (RedditArticle & Parser.Item) | undefined;
}

export const ArticleViewer = ({ article }: ArticleViewerProps) => {
  return (
    <section className="flex w-6/12 flex-col rounded-r-3xl bg-white px-4">
      <div className="mb-8 flex h-48 items-center justify-between border-b-2">
        <div className="flex items-center space-x-4">
          <p className="text-light text-gray-400">
            <a href={article?.link} target="_blank" rel="noreferrer">
              {article?.pubDate} (link)
            </a>
          </p>
        </div>
      </div>
      <section>
        <h1 className="text-2xl font-bold">{article?.title}</h1>
        <article className="mt-8 leading-7 tracking-wider text-gray-500">
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: article?.content as string }}
          ></div>
        </article>
        <ul className="mt-12 flex space-x-4">
          <li className="h-10 w-10 cursor-pointer rounded-lg border p-1 text-indigo-600 transition duration-200 hover:bg-blue-100">
            <PlusCircleIcon title={"Add this article to pipeline"} />
          </li>
        </ul>
      </section>
    </section>
  );
};
