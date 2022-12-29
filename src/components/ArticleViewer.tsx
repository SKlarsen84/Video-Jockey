import type Parser from "rss-parser";
import type { RedditArticle } from "../server/trpc/router/reddit";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";
import { Table, TableBody, TableRow, TableCell } from "@mui/material";

interface ArticleViewerProps {
  article: RedditArticle & Parser.Item;
}

export const ArticleViewer = ({ article }: ArticleViewerProps) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const comments = trpc.reddit.getArticleComments.useQuery(article.id);
  const addVidMutation = trpc.video.addNewVideo.useMutation();

  useEffect(() => {
    const run = async () => {
      const creator = {
        id: article.id,
        title: article.title,
        reddit_id: article.id,
        reddit_title: article.title,
        reddit_content: article.content,
        reddit_comments: JSON.stringify(comments.data),
      };
      addVidMutation.mutate({ video: creator });
    };

    isAdding ? run() : null;

    setIsAdding(false);
  }, [article, isAdding, addVidMutation, comments.data]);

  return (
    <section className="flex h-full w-full flex-col rounded-r-3xl bg-white px-4 dark:bg-gray-800">
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
            <a href="#" onClick={() => setIsAdding(true)}>
              <PlusCircleIcon title={"Add this article to pipeline"} />
            </a>
          </li>
        </ul>

        <div className="mt-8">
          <h2 className="text-xl font-bold">Comments</h2>
          <div className="mt-4">
            <Table
              sx={{
                minWidth: 750,
              }}
              aria-labelledby="tableTitle"
              size={"small"}
            >
              <TableBody>
                {comments.data
                  ? comments.data.comments.map((comment: string) => (
                      <TableRow key={comment}>
                        <TableCell
                          padding="checkbox"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                        >
                          {comment}
                        </TableCell>
                      </TableRow>
                    ))
                  : "Loading comments..."}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </section>
  );
};
