//ignore typescript errors for now
//
import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";
import type { Video } from "@prisma/client";
import { Tab, Tabs } from "@mui/material";
import { RedditTab } from "./pipelineTabs/RedditTab";
import { GptTab } from "./pipelineTabs/GptTab";

interface VideoViewerProps {
  video: Video;
  setSelectedVideo: (video: Video | undefined) => void;
}

export const VideoPipelineViewer = ({
  video,
  setSelectedVideo,
}: VideoViewerProps) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [editableVideo, setEditableVideo] = useState<Video>(video);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [commentsArray, setCommentsArray] = useState<string[]>([]);
  const deleteMutation = trpc.video.removeVideo.useMutation();

  useEffect(() => {
    setCommentsArray(
      (JSON.parse(video?.reddit_comments as string).comments as string[]) || []
    );
  }, [video]);

  useEffect(() => {
    setEditableVideo(video);
  }, [video]);

  useEffect(() => {
    const run = async () => {
      video && deleteMutation.mutate({ id: video.id });
      setIsDeleting(false);
      setSelectedVideo(undefined);
    };

    isDeleting ? run() : null;
  }, [isDeleting, setSelectedVideo, video, deleteMutation]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableVideo({ ...editableVideo, title: e.target.value });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <section className="flex w-full flex-col rounded-r-3xl bg-white px-4 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-800">
        <label className="px-3"></label>
        <input
          type="text"
          id="title_edit"
          className="block  w-full w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder={video?.title as string}
          value={editableVideo?.title as string}
          onChange={handleTitleChange}
          required
        />
      </div>
      <section className="p-12 pb-0">
        <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs">
          <Tab
            label="Reddit"
            {...a11yProps(0)}
            className="block text-sm font-medium text-gray-700 dark:text-gray-100"
          />
          <Tab
            label="chatGPT"
            {...a11yProps(1)}
            className="block text-sm font-medium text-gray-700 dark:text-gray-100"
          />
          <Tab
            label="Pictory"
            {...a11yProps(2)}
            className="block text-sm font-medium text-gray-700 dark:text-gray-100"
          />
          <Tab
            label="Youtube"
            {...a11yProps(3)}
            className="block text-sm font-medium text-gray-700 dark:text-gray-100"
          />
        </Tabs>
      </section>

      <section className="p-12 pt-2">
        {activeTab === 0 && (
          <RedditTab
            editableVideo={editableVideo}
            commentsArray={commentsArray}
            handleTitleChange={handleTitleChange}
            video={video}
          />
        )}
        {activeTab === 1 && (
          <GptTab
            editableVideo={editableVideo}
            setEditableVideo={setEditableVideo}
          />
        )}
      </section>
    </section>
  );
};
