import { androidDownloadLink, iosDownloadLink } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'

export const AppDownloadButtons = () => {
  return (
    <div className="flex w-full items-center justify-center lg:justify-start text-lg sm:flex-row space-x-5">
      <Link href={iosDownloadLink} className="max-w-36" target="_blank">
        <Image
          src="/images/app-store-download-light.png"
          alt="adjustIngredients"
          width={1000}
          height={500}
        />
      </Link>
      <Link href={androidDownloadLink} className="max-w-36" target="_blank">
        <Image
          src="/images/google-play-download-light.png"
          alt="adjustIngredients"
          width={1000}
          height={500}
        />
      </Link>
    </div>
  )
}

export default AppDownloadButtons
