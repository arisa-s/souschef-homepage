import AppStoreRating from '@/components/home/AppStoreRating'
import DownloadAppModal from '@/components/home/DownloadAppModal'
import HeroPhone from '@/components/home/HeroPhone'
import { JsonLd } from '@/components/blog/JsonLd'
import SiteContainer from '@/components/layout/SiteContainer'
import AppDownloadButtons from '@/components/shared/AppDownloadButtons'
import { DownloadContent } from '@/constants'
import { softwareAppJsonLd } from '@/lib/seo'
import { ReactNode } from 'react'

type MarketingHomeProps = {
  locale: string
  path?: string
  metaTitle: string
  metaDescription: string
  heroAlt: string
  rating: string
  lovedBy: string
  h1: ReactNode
  header: string
  downloadDisclaimer: string
  heroDownloadContent: DownloadContent
}

export function MarketingHome({
  locale,
  path = '',
  metaTitle,
  metaDescription,
  heroAlt,
  rating,
  lovedBy,
  h1,
  header,
  downloadDisclaimer,
  heroDownloadContent,
}: MarketingHomeProps) {
  return (
    <div className="flex w-full flex-1 flex-col">
      <JsonLd
        data={softwareAppJsonLd({
          locale,
          path,
          name: metaTitle,
          description: metaDescription,
        })}
      />
      <SiteContainer
        as="section"
        className="grid flex-1 grid-cols-1 items-center py-6 sm:py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:py-0"
      >
        <div className="mx-auto -mt-14 w-full max-w-[14rem] sm:max-w-[16rem] md:max-w-[18rem] lg:-mt-0 lg:max-w-[20rem] xl:max-w-[22rem]">
          <HeroPhone alt={heroAlt} />
        </div>

        <div className="mx-auto mt-6 w-full max-w-[46rem] text-center lg:mx-0 lg:text-left">
          <AppStoreRating rating={rating} lovedBy={lovedBy} />

          <h1 className="font-accent text-2xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-3xl lg:text-4xl">
            {h1}
          </h1>

          <p className="mx-auto mt-4 max-w-[42rem] text-lg leading-7 text-text-secondary sm:text-xl sm:leading-8 lg:mx-0 lg:text-2xl lg:leading-[1.4]">
            {header}
          </p>

          <div className="mt-6 flex flex-col items-center sm:mt-8 lg:items-start">
            <div className="flex justify-center lg:justify-start">
              <AppDownloadButtons content={heroDownloadContent} />
            </div>

            <p className="mt-4 max-w-[40rem] text-center text-sm leading-6 text-text-secondary lg:text-left">
              {downloadDisclaimer}
            </p>
          </div>
        </div>
      </SiteContainer>

      <DownloadAppModal />
    </div>
  )
}
