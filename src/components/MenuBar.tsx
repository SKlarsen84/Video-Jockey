import {
  HomeModernIcon,
  VideoCameraIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

//get navigationpanel and setnavigationpanel as props
export interface MenuBarProps {
  navigationPanel: number;
  setNavigationPanel: (value: number) => void;
}

export const MenuBar = ({
  navigationPanel,
  setNavigationPanel,
}: MenuBarProps) => {
  return (
    <section className="flex w-1/12 flex-col rounded-l-3xl bg-white dark:bg-gray-800">
      <a
        href="#"
        onClick={() => {
          setNavigationPanel(0);
        }} //set navigationpanel to 0
        className="mx-auto mt-12 mb-20 w-16 rounded-2xl bg-indigo-600 p-4 text-white"
      >
        <HomeModernIcon className="text-white-500 h-8 w-8" />
      </a>
      <nav className="relative flex flex-col items-center py-4">
        <a
          href="#"
          onClick={() => {
            setNavigationPanel(0);
          }} //set navigationpanel to 0
          className="mb-4 w-16 rounded-2xl border bg-gray-900 p-4 text-white"
        >
          Vids

        </a>
        <a
          href="#"
          onClick={() => {
            setNavigationPanel(1);
          }} //set navigationpanel to 1
          className="mb-4 w-16 rounded-2xl border bg-gray-900 p-4 text-white"
        >
          Rdit
        </a>
      </nav>
    </section>
  );
};
