import type { Video } from "@prisma/client";
import { trpc } from "../utils/trpc";

interface Props {
  selectedVideo: Video | undefined;
  setSelectedVideo: (video: Video) => void;
}

export const VideoList = ({ selectedVideo, setSelectedVideo }: Props) => {
  const allVideos = trpc.video.getAll.useQuery();

  return (
    <section className="w-4/12 flex  flex-col overflow-y-scroll bg-gray-50 pt-3  dark:bg-gray-700 p-6">
   
      <label className="px-3">
        <input
          className="w-full rounded-lg bg-gray-100 p-4 transition duration-200 focus:outline-none focus:ring-2"
          placeholder="Search..."
        />
      </label>
      <div className="mb-6">
        {allVideos.data
          ? allVideos.data.map((video) => (
              <a
                key={video.id}
                href="#"
                onClick={() => setSelectedVideo(video)}
                className="m-2 block rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <p className="text-1xl mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                  {video.title}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {video.status}
                </p>
              </a>
            ))
          : "Loading tRPC query..."}
      </div>
    </section>
  );
};
