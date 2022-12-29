import { Divider, Table, TableBody, TableRow, TableCell } from "@mui/material";
import type { Video } from "@prisma/client";
import type {
  ChangeEventHandler,
} from "react";

export function RedditTab(props: {
  video: Video;
  editableVideo: Video;
  handleTitleChange: ChangeEventHandler<HTMLInputElement> | undefined;
  commentsArray: string[];
}) {
  return (
    <form>
      <div className=" w-4/12 p-4">
        <label
          htmlFor="redditId"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Reddit ID
        </label>

        <input
          type="text"
          name={props.video.reddit_id as string}
          id="redditId"
          className="block  w-full w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder={props.video.reddit_id as string}
          value={props.editableVideo.reddit_id as string}
          onChange={props.handleTitleChange}
          required
        />
      </div>
      <div className="w-12/12 mb-1 p-4">
        <label
          htmlFor="redditTitle"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Reddit title
        </label>

        <input
          type="text"
          name={props.video.reddit_title as string}
          id="redditTitle"
          className="block  w-full w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder={props.video.reddit_title as string}
          value={props.editableVideo.reddit_title as string}
          onChange={props.handleTitleChange}
          required
        />
      </div>

      <div className="mb-1 w-6/12 p-4">
        <label
          htmlFor="redditTitle"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Reddit content
        </label>
        <Divider />
        <article className="mt-8 leading-7 tracking-wider text-gray-500">
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: props.video?.reddit_content as string,
            }}
          ></div>
        </article>
      </div>
      <div className="mt-6 mb-6 flex justify-end">
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          Save
        </button>
      </div>
      <div className="mb-1 w-6/12 p-4">
        <label
          htmlFor="redditComments"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Reddit comments
        </label>
        <Divider />
        {/* striped table with comments  */}

        <Table
          sx={{
            minWidth: 750,
          }}
          aria-labelledby="tableTitle"
          size={"small"}
        >
          <TableBody>
            {props.commentsArray.map((comment: string) => (
              <TableRow key={comment}>
                <TableCell
                  padding="checkbox"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  {comment}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </form>
  );
}
