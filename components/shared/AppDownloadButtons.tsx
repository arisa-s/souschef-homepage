import { androidDownloadLink, DownloadContent, iosDownloadLink } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'

type AppDownloadButtonsProps = {
  content?: DownloadContent
}

export const AppDownloadButtons = ({
  content = 'homepage_hero',
}: AppDownloadButtonsProps) => {
  return (
    <div className="flex w-full items-center justify-center space-x-5 text-lg sm:flex-row lg:justify-start">
      <Link
        href={iosDownloadLink(content)}
        className="max-w-36"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/app-store-download-light.png"
          alt="Download Souschef on the App Store"
          width={1000}
          height={500}
        />
      </Link>
      <Link
        href={androidDownloadLink(content)}
        className="max-w-36"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/google-play-download-light.png"
          alt="Get Souschef on Google Play"
          width={1000}
          height={500}
        />
      </Link>
    </div>
  )
}

export default AppDownloadButtons
