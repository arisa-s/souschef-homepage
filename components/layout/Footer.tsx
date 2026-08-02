import { emailLink, instagramProfileLink, isSubscriptionEnabled } from '@/constants'
import { getI18n } from '@/serverContexts'
import Link from 'next/link'
import { FC } from 'react'
import { FiInstagram, FiMail } from 'react-icons/fi'
import SiteContainer from './SiteContainer'

const PRICING_LINK = 'https://docs.trysouschef.com/billing/free-plan'

const linkClassName =
  'text-sm text-text-primary no-underline transition-colors hover:text-black hover:underline hover:underline-offset-4 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'

const iconLinkClassName =
  'inline-flex size-11 items-center justify-center text-text-primary transition-colors hover:text-black focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'

export const Footer: FC = () => {
  const { t } = getI18n()
  const currentYear = new Date().getFullYear()

  const legalLinks = [
    { href: '/toc', label: t('layout:toc') },
    { href: '/privacy', label: t('layout:privacy') },
    ...(isSubscriptionEnabled
      ? [{ href: PRICING_LINK, label: t('layout:pricing'), external: true }]
      : []),
    { href: '/faq', label: t('layout:faq') },
  ]

  return (
    <footer className="w-full border-t border-[#e0e0e0] bg-gray-50">
      <SiteContainer className="flex flex-col gap-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-5">
        <nav aria-label="Footer" className="mx-auto sm:mx-0">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {legalLinks.map(({ href, label, external }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={linkClassName}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 mx-auto sm:mx-0">
          <p className="text-sm text-text-secondary">
            © {currentYear} Nekonote LLC
          </p>
          <ul className="flex items-center">
            <li>
              <Link
                href={instagramProfileLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Souschef on Instagram"
                className={iconLinkClassName}
              >
                <FiInstagram className="size-5" aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link
                href={emailLink}
                aria-label="Contact Souschef"
                className={iconLinkClassName}
              >
                <FiMail className="size-5" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </SiteContainer>
    </footer>
  )
}

export default Footer
