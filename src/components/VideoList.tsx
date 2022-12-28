import type { Video } from "@prisma/client";
import { trpc } from "../utils/trpc";

interface Props {
  selectedVideo: Video | undefined;
  setSelectedVideo: (video: Video) => void;
}

export const VideoList = ({ selectedVideo, setSelectedVideo }: Props) => {
  const allVideos = trpc.video.getAll.useQuery();

  return (
    <section className="flex h-full w-4/12 flex-col overflow-y-scroll bg-gray-50 pt-3">
      <label className="px-3">
        <input
          className="w-full rounded-lg bg-gray-100 p-4 transition duration-200 focus:outline-none focus:ring-2"
          placeholder="Search..."
        />
      </label>

      <ul className="mt-6">
        {allVideos.data
          ? allVideos.data.map((video) => (
              <li
                className={
                  selectedVideo?.id === video.id
                    ? "border-b bg-indigo-100 py-5 px-3 transition"
                    : "border-b py-5 px-3 transition hover:bg-indigo-100"
                }
                key={video.reddit_id}
              >
                <a
                  href="#"
                  className="flex items-center justify-between"
                  onClick={() => setSelectedVideo(video)}
                >
                  <h3 className="text-lg font-semibold">{video.title}</h3>
                  <p className="text-md text-gray-400">{video.status}</p>
                </a>
              </li>
            ))
          : "Loading tRPC query..."}
      </ul>
    </section>
  );
};
