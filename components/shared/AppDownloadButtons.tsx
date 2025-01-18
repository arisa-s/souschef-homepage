import { androidDownloadLink, iosDownloadLink } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'

export const AppDownloadButtons = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-2 text-lg sm:flex-row sm:space-x-12 sm:space-x-6 sm:space-y-0">
      <Link href={iosDownloadLink} className="max-w-44" target="_blank">
        <Image
          src="/images/app-store-download-light.png"
          alt="adjustIngredients"
          width={1000}
          height={500}
        />
      </Link>
      <Link href={androidDownloadLink} className="max-w-44" target="_blank">
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
