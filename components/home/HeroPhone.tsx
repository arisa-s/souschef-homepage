import Image from 'next/image'

const PHONE_SRC = '/images/home/hero/phone.webp'
const PHONE_WIDTH = 3436
const PHONE_VISIBLE_HEIGHT = 5910

type HeroIcon = {
  src: string
  x: number
  y: number
  size: number
  rotate: number
  delay: number
  duration: number
}

const ICONS: HeroIcon[] = [
  {
    src: '/images/home/hero/icons/facebook.webp',
    x: 79.2,
    y: 21.4,
    size: 20.4,
    rotate: 14,
    delay: 0,
    duration: 3.6,
  },
  {
    src: '/images/home/hero/icons/youtube.webp',
    x: 7.0,
    y: 43.0,
    size: 24.2,
    rotate: -8,
    delay: 0.4,
    duration: 4.0,
  },
  {
    src: '/images/home/hero/icons/tiktok.webp',
    x: 84.2,
    y: 43.2,
    size: 24.0,
    rotate: 14,
    delay: 0.8,
    duration: 3.8,
  },
  {
    src: '/images/home/hero/icons/camera.webp',
    x: 10.2,
    y: 71.8,
    size: 18.8,
    rotate: -14,
    delay: 1.2,
    duration: 4.2,
  },
  {
    src: '/images/home/hero/icons/instgarm.webp',
    x: 83.8,
    y: 76.2,
    size: 24.4,
    rotate: 10,
    delay: 0.6,
    duration: 3.5,
  },
  {
    src: '/images/home/hero/icons/claude.webp',
    x: 8.6,
    y: 96.6,
    size: 18.4,
    rotate: -10,
    delay: 1.0,
    duration: 3.9,
  },
]

function HeroIconBadge({ src, x, y, size, rotate, delay, duration }: HeroIcon) {
  return (
    <span
      className="pointer-events-none absolute z-10"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}%`,
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
      }}
      aria-hidden
    >
      <span
        className="animate-hero-icon-breathe block motion-reduce:animate-none"
        style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
      >
        <Image
          src={src}
          alt=""
          width={160}
          height={160}
          loading="eager"
          className="h-auto w-full rounded-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.16)]"
        />
      </span>
    </span>
  )
}

export default function HeroPhone({ alt }: { alt: string }) {
  return (
    <div className="relative w-full px-[8%]">
      <div
        className="relative w-full overflow-visible"
        style={{ aspectRatio: `${PHONE_WIDTH} / ${PHONE_VISIBLE_HEIGHT}` }}
      >
        <Image
          src={PHONE_SRC}
          alt={alt}
          fill
          priority
          sizes="(max-width: 640px) 18rem, (max-width: 1024px) 23rem, 27rem"
          className="z-0 object-cover object-top"
        />
        {ICONS.map((icon) => (
          <HeroIconBadge key={icon.src} {...icon} />
        ))}
      </div>
    </div>
  )
}
