/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircularProgress } from "@mui/material";
import type { Video } from "@prisma/client";
import Jimp from "jimp/*";
import Image from "next/image";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";

interface Props {
  editableVideo: Video;
  setEditableVideo: (video: Video) => void;
}

export const FootageTab = ({ editableVideo, setEditableVideo }: Props) => {
  const [search, setSearch] = useState<string>(editableVideo.title || "");
  const [thumbnailBuffer, setThumbnailBuffer] = useState<any>();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>();
  const saveMutation = trpc.video.updateVideo.useMutation();
  const thumbnailMutation = trpc.youtube.generateThumbnail.useMutation();

  const searchResults = trpc.youtube.searchYoutube.useQuery(search, {
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const resultForYoutubeUrl = trpc.youtube.searchYoutube.useQuery(
    editableVideo.youtube_url as string,
    {
      enabled:
        (editableVideo.youtube_url && editableVideo.youtube_url?.length > 0) ||
        false,
      refetchOnWindowFocus: false,
    }
  );

  const addFootage = async (url: string) => {
    const vid = { ...editableVideo, youtube_url: url };
    await saveMutation.mutateAsync({
      video: vid as {
        id: string;
        title: string;
        reddit_id: string;
        reddit_title: string;
        reddit_content: string;
        script: string;
        reddit_comments: string;
        youtube_url: string;
      },
      status: "footage added",
      status_step: 3,
    });
    setEditableVideo({
      ...editableVideo,
      youtube_url: url,
      status: "footage added",
      status_step: 3,
    });
  };

  const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const changeThumbnailUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnailUrl(e.target.value);
  };

  const handleSearch = async () => {
    searchResults.refetch();
  };

  useEffect(() => {
    const run = async () => {
      setSearch(editableVideo.title || "");

      const img = await Jimp.read(editableVideo.thumbnail_base64 as string);
      const imgBuffer = await img.getBufferAsync(Jimp.MIME_PNG);
      setThumbnailBuffer(imgBuffer);
    };

    if (editableVideo && editableVideo.thumbnail_base64) {
      run();
    }
  }, [editableVideo]);

  const thumbnailGenerator = async () => {
    const img = await thumbnailMutation.mutateAsync(thumbnailUrl as string);
    setThumbnailBuffer(img);
  };

  return (
    <div className="mt-12">
      <div className="mt-12">
        <div className="mt-12">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {resultForYoutubeUrl &&
              resultForYoutubeUrl.data?.youtubeResults &&
              resultForYoutubeUrl.data.youtubeResults.items.length > 0 &&
              resultForYoutubeUrl.data?.youtubeResults?.items[0]?.type ===
                "video" && (
                <div className="mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">
                  <form className=" mt-12">
                    <label
                      htmlFor="default-search"
                      className="mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      image URL
                    </label>
                    <div className="w-5/5 relative">
                      <input
                        type="search"
                        id="default-search"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder={
                          (resultForYoutubeUrl as any).data?.youtubeResults
                            ?.items[0]?.thumbnails[0].url
                        }
                        value={thumbnailUrl}
                        onChange={changeThumbnailUrl}
                        required
                      />
                      <button
                        type="submit"
                        className="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={thumbnailGenerator}
                        disabled={thumbnailUrl === undefined}
                      >
                        Search
                      </button>
                    </div>
                  </form>

                  {thumbnailBuffer && (
                    <>
                      <div className="mt-12">
                        <div className="mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">
                          generated thumbnail:
                        </div>
                        <div className="mt-6 mb-6 flex justify-start">
                          <Image
                            className="h-30 w-120 flex-shrink-0  bg-gray-300 dark:bg-gray-700"
                            src={thumbnailBuffer.image}
                            alt=""
                            width={344}
                            height={344}
                            title="thumbnail"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

            {/* //if there is a youtube url for this video, show the video */}
            {resultForYoutubeUrl.isFetching ? (
              <CircularProgress size={24} className="mr-2" />
            ) : (
              <>
                {resultForYoutubeUrl.data?.youtubeResults.items.map((item) => (
                  <>
                    {item.type === "video" && (
                      <>
                        {/* //if this video is currently the video used by the editableVideo, then show the checkmark in the top right corner */}
                        <div className="mt-12">
                          <div className="mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">
                            Currently used footage
                          </div>
                          <a
                            href={`https://www.youtube.com/watch?v=${item.id}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Image
                              className="h-30 w-120 flex-shrink-0  bg-gray-300 dark:bg-gray-700"
                              src={item.thumbnails[0]?.url || ""}
                              alt=""
                              width={1280}
                              height={720}
                              title={item.title}
                            />
                          </a>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.title}
                          </span>
                        </div>
                      </>
                    )}
                  </>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <form className=" mt-12">
        <label
          htmlFor="default-search"
          className="mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
        >
          Search for footage on youtube
        </label>
        <div className="w-5/5 relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search for footage..."
            value={search}
            onChange={changeSearchValue}
            required
          />
          <button
            type="submit"
            className="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </form>

      <div className="mt-12">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {searchResults.isFetching ? (
            <CircularProgress size={24} className="mr-2" />
          ) : (
            <>
              {searchResults.data?.youtubeResults.items
                .filter((i: any) => i.url !== editableVideo.youtube_url)
                .map((item) => (
                  <>
                    {item.type === "video" && (
                      <div
                        key={item.type + item.id}
                        className="divide-y divide-gray-200 rounded-lg bg-white shadow dark:divide-gray-700 dark:bg-gray-900"
                      >
                        {/* //if this video is currently the video used by the editableVideo, then show the checkmark in the top right corner */}

                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                          <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                              <h3
                                className="truncate text-sm font-medium text-gray-900 dark:text-white"
                                title={item.title}
                              >
                                {item.title}
                              </h3>

                              <span className="bg-maroon-100 inline-block flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-gray-700 dark:text-green-100">
                                {item.author?.name}
                              </span>

                              <span className="inline-block flex-shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-100">
                                {item.duration}
                              </span>
                            </div>
                          </div>
                          <Image
                            className="h-20 w-20 flex-shrink-0 rounded-full bg-gray-300 dark:bg-gray-700"
                            src={item.thumbnails[0]?.url || ""}
                            alt=""
                            width={244}
                            height={244}
                          />
                        </div>

                        <div>
                          <div className="-mt-px flex divide-x divide-gray-200 dark:divide-gray-700">
                            <div className="-ml-px flex w-0 flex-1">
                              <a
                                href={`https://www.youtube.com/watch?v=${item.id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400"
                              >
                                <span className="ml-3">View</span>
                              </a>
                            </div>
                            <div className="-ml-px flex w-0 flex-1">
                              <button
                                type="button"
                                onClick={() => addFootage(item.url)}
                                className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400"
                                disabled={
                                  editableVideo.youtube_url === item.url
                                }
                              >
                                <span className="ml-3">Use footage</span>
                              </button>
                              {editableVideo.youtube_url === item.url && (
                                <div className="flex-shrink-0">
                                  <svg
                                    className="h-12 w-12 p-2 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M5 13l4 4L19 7"
                                    ></path>
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
            </>
          )}
        </div>
      </div>

      <div className="mt-6 mb-6 flex justify-end">
        <>
          <button
            type="submit"
            onClick={() => console.log("save")}
            className="m-1 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            Save
          </button>
        </>
      </div>
    </div>
  );
};
