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
          className="relative mb-4 w-16 rounded-2xl bg-purple-100 p-4 text-purple-900"
        >
          <VideoCameraIcon className="text-white-500h-8 w-8" />
          {/* <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 p-2 text-white">
            3
          </span> */}
        </a>
        <a
          href="#"
          onClick={() => {
            setNavigationPanel(1);
          }} //set navigationpanel to 1
          className="mb-4 w-16 rounded-2xl border p-4 text-white"
        >
          Rdit
        </a>
      </nav>
      {/* <a
        href="#"
        onClick={() => {
          setNavigationPanel(1);
        }} //set navigationpanel to 1
        className="mx-auto mt-12 mb-20 w-16 rounded-2xl bg-green-600 p-4 text-white"
      >
        <PlusIcon className="text-white-500 h-8 w-8" />
      </a> */}
    </section>
  );
};
