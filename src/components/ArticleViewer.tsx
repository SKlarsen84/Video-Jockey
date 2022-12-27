import type Parser from "rss-parser";
import type { RedditArticle } from "../server/trpc/router/reddit";

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
              {article?.link}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
          </li>
          <li className="h-10 w-10 cursor-pointer rounded-lg border p-1 text-blue-800 transition duration-200 hover:bg-blue-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
          </li>
          <li className="h-10 w-10 cursor-pointer rounded-lg border p-1 text-pink-400 transition duration-200 hover:bg-blue-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
          </li>
          <li className="h-10 w-10 cursor-pointer rounded-lg border p-1 text-yellow-500 transition duration-200 hover:bg-blue-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
              />
            </svg>
          </li>
        </ul>
      </section>
    </section>
  );
};
