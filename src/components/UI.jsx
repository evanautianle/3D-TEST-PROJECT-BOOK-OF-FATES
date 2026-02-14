import { atom, useAtom } from "jotai";

export const zoomAtom = atom(0);
export const pageAtom = atom(0);

const pictures = [
  "1","2","3","4","5","6","7","8",
  "9","10","11","12","13","14","15","16",
];

export const pages = [
  { front: "book-cover", back: pictures[0] },
];

for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i],
    back: pictures[i + 1],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [, setZoom] = useAtom(zoomAtom);

  const maxPage = pages.length;

  return (
    <main className="pointer-events-none select-none z-10 absolute inset-0 flex flex-col justify-end">

      <div className="w-full pointer-events-auto flex justify-center absolute bottom-8 left-0">

        {/* Container matches your existing aesthetic */}
        <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-6 py-4 flex items-center gap-4">

          {/* Label */}
          <span className="text-white/80 text-sm uppercase min-w-[90px]">
            {page === 0
              ? "Cover"
              : page === maxPage
              ? "Back Cover"
              : `Page ${page}`}
          </span>

          {/* Slider */}
          <input
            type="range"
            min={0}
            max={maxPage}
            step={1}
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
            className="
              w-64
              appearance-none
              bg-white/20
              h-2
              rounded-full
              outline-none
              cursor-pointer

              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border
              [&::-webkit-slider-thumb]:border-black/50
              [&::-webkit-slider-thumb]:cursor-pointer

              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-none
            "
          />

        </div>

      </div>

    </main>
  );
};
