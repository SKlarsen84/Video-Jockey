import type { Video } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import type Parser from "rss-parser";
import { ArticleViewer } from "../components/ArticleViewer";
import { MenuBar } from "../components/MenuBar";
import { RedditReader } from "../components/RedditReader";
import { VideoList } from "../components/VideoList";
import { VideoPipelineViewer } from "../components/VideoPipelineViewer";
import type { RedditArticle } from "../server/trpc/router/reddit";

const Home: NextPage = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video>();
  const [selectedArticle, setSelectedArticle] = useState<
    (RedditArticle & Parser.Item) | undefined
  >();
  const [navigationPanel, setNavigationPanel] = useState<number>(0);

  return (
    <>
      <Head>
        <title>VideoJockey</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="dark mt-4 mb-0 bg-gray-600">
        <h1 className="text-center text-4xl font-bold dark:text-white">
          VideoJockey
        </h1>
      </header>

      <main className=" dark	m-12 mt-2 flex place-self-center rounded-3xl shadow-lg ">
        <MenuBar
          navigationPanel={navigationPanel}
          setNavigationPanel={setNavigationPanel}
        />

        {navigationPanel === 0 && (
          <VideoList
            selectedVideo={selectedVideo}
            setSelectedVideo={setSelectedVideo}
          />
        )}

        {navigationPanel === 0 && selectedVideo && (
          <VideoPipelineViewer
            video={selectedVideo}
            setSelectedVideo={setSelectedVideo}
          />
        )}

        {navigationPanel === 1 && (
          <RedditReader
            selectedArticle={selectedArticle}
            setSelectedArticle={setSelectedArticle}
          />
        )}

        {navigationPanel === 1 && selectedArticle && (
          <ArticleViewer article={selectedArticle} />
        )}
      </main>
    </>
  );
};

export default Home;
