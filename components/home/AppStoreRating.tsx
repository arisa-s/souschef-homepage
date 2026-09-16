const APPLE_LAUREL_LEAVES = [
  { x: 100.7, y: 18.7, rot: 52.4, rx: 8.61, ry: 19.9 },
  { x: 77.5, y: 23.1, rot: 8.0, rx: 8.42, ry: 20.18 },
  { x: 90.2, y: 43.0, rot: 81.2, rx: 8.79, ry: 19.53 },
  { x: 58.3, y: 43.9, rot: 3.2, rx: 9.16, ry: 21.47 },
  { x: 73.1, y: 63.5, rot: 75.9, rx: 9.35, ry: 20.83 },
  { x: 42.5, y: 69.7, rot: -5.5, rx: 9.72, ry: 22.95 },
  { x: 63.6, y: 82.8, rot: 66.5, rx: 9.9, ry: 22.31 },
  { x: 29.7, y: 102.2, rot: -16.7, rx: 10.18, ry: 24.62 },
  { x: 54.4, y: 111.2, rot: 53.7, rx: 10.46, ry: 23.97 },
  { x: 24.2, y: 141.9, rot: -30.5, rx: 10.27, ry: 24.53 },
  { x: 50.4, y: 144.5, rot: 39.8, rx: 10.37, ry: 24.44 },
  { x: 53.2, y: 177.2, rot: 22.4, rx: 10.46, ry: 24.25 },
  { x: 27.5, y: 183.5, rot: -228.5, rx: 10.46, ry: 24.16 },
  { x: 63.8, y: 207.5, rot: 9.7, rx: 9.72, ry: 22.49 },
  { x: 41.6, y: 218.5, rot: -241.8, rx: 9.72, ry: 22.49 },
  { x: 83.2, y: 237.8, rot: -1.0, rx: 8.52, ry: 20.27 },
  { x: 62.1, y: 247.1, rot: -252.3, rx: 8.7, ry: 20.09 },
  { x: 100.7, y: 255.7, rot: -10.2, rx: 7.22, ry: 17.31 },
  { x: 84.0, y: 266.9, rot: -262.3, rx: 7.4, ry: 16.94 },
  { x: 108.0, y: 279.1, rot: -268.3, rx: 5.55, ry: 12.4 },
] as const

function almondPath(rx: number, ry: number) {
  return `M0 ${-ry}C${rx * 0.72} ${-ry * 0.62} ${rx} ${-ry * 0.22} ${rx} 0C${rx} ${ry * 0.22} ${rx * 0.72} ${ry * 0.62} 0 ${ry}C${-rx * 0.72} ${ry * 0.62} ${-rx} ${ry * 0.22} ${-rx} 0C${-rx} ${-ry * 0.22} ${-rx * 0.72} ${-ry * 0.62} 0 ${-ry}Z`
}

function Laurel({ className }: { className?: string }) {
  return (
    <svg viewBox="8 4 125 290" className={className} fill="currentColor" aria-hidden>
      {APPLE_LAUREL_LEAVES.map((leaf) => (
        <path
          key={`${leaf.x}-${leaf.y}`}
          d={almondPath(leaf.rx, leaf.ry)}
          transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.rot})`}
        />
      ))}
    </svg>
  )
}

export default function AppStoreRating({
  rating,
  lovedBy,
}: {
  rating: string
  lovedBy: string
}) {
  return (
    <div className="mb-4 flex justify-center lg:mb-5 lg:justify-start">
      <div className="inline-flex items-center text-text-primary">
        <Laurel className="h-14 w-6 sm:h-[4.15rem] sm:w-7" />
        <div className="flex flex-col items-center px-1 sm:px-1.5">
          <p className="font-accent text-[0.7rem] font-bold leading-none tracking-tight sm:text-[0.8rem]">
            {rating}
          </p>
          <p className="mt-1 font-accent text-[0.65rem] font-bold leading-none tracking-tight text-text-secondary sm:text-[0.75rem]">
            {lovedBy}
          </p>
        </div>
        <Laurel className="h-14 w-6 -scale-x-100 sm:h-[4.15rem] sm:w-7" />
      </div>
    </div>
  )
}
