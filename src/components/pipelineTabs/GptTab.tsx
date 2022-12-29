import { CircularProgress } from "@mui/material";
import type { Video } from "@prisma/client";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";

interface Props {
  editableVideo: Video;
  setEditableVideo: (video: Video) => void;
}

export const GptTab = ({ editableVideo, setEditableVideo }: Props) => {
  const [busy, setBusy] = useState<boolean>(false);
  const saveMutation = trpc.video.updateVideo.useMutation();
  const [gscript] = useState<string | undefined>();
  const gptScript = trpc.gpt.getScript.useQuery(
    {
      title: editableVideo.title as string,
      comments: JSON.parse(editableVideo.reddit_comments as string)
        .comments as string[],
      content: editableVideo.reddit_content as string,
    },
    { enabled: false }
  );

  useEffect(() => {
    if (gptScript.data?.script) {
      setEditableVideo({
        ...editableVideo,
        script: gptScript.data?.script.script as string,
      });
    }
    
  }, [gptScript.data?.script]);

  useEffect(() => {
    const script = gptScript.data?.script.script as string;
    setEditableVideo({ ...editableVideo, script });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gptScript.data?.script]);

  const handleScriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableVideo({ ...editableVideo, script: e.target.value });
  };

  const handleGPTRefetch = async () => {
    setBusy(true);
    await gptScript.refetch();
    setBusy(false);
  };

  const handleSave = async () => {
    setBusy(true);
    await saveMutation.mutateAsync({
      video: editableVideo as {
        id: string;
        title: string;
        reddit_id: string;
        reddit_title: string;
        reddit_content: string;
        script: string;
      },
      status: "script added",
      status_step: 2,
    });
    setBusy(false);
  };

  return (
    <>
      <div className="w-12/12 mb-1 p-4">
        <label
          htmlFor="gpt"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          GPT script
        </label>

        {gptScript.isFetching && (
          <CircularProgress size={24} className="mr-2" />
        )}
        {!gptScript.isFetching && (
          <textarea
            name="gptScript"
            id="gpt"
            className="block h-[26rem]  w-full w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder={gscript as string}
            value={editableVideo.script as string}
            onChange={handleScriptChange}
            required
          />
        )}
      </div>
      <div className="mt-6 mb-6 flex justify-end">
        {busy ? (
          <CircularProgress size={24} className="mr-2" />
        ) : (
          <>
            <button
              onClick={() => handleGPTRefetch()}
              className="m-1 w-full rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 sm:w-auto"
            >
              Generate script
            </button>
            <button
              type="submit"
              onClick={() => handleSave()}
              className="m-1 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
            >
              Save
            </button>
          </>
        )}
      </div>
    </>
  );
};
