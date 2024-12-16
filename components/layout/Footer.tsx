import { emailLink, instagramProfileLink } from "@/constants";
import { getI18n } from "@/serverContexts";
import Link from "next/link";
import { FC } from "react";
import AppDowloadQR from "../shared/AppDownloadQR";

export const Footer: FC = ({}) => {
  const { t } = getI18n();
  return (
    <footer className="max-w-7xl mx-auto flex flex-col border-t divide-y">
      <div className="flex items-center justify-between px-6">
        <div className="flex flex-col">
          <SocialLink href={emailLink} label="Email" />
          <SocialLink href={instagramProfileLink} label="Instagram" />
        </div>
        <div className="flex flex-col text-center">
          <h1 className="font-accent font-black text-2xl">
            {t("common:appName")}
          </h1>
          <p className="text-sm text-text-secondary">© 2024 Nekonote LLC</p>
        </div>
        <div className="py-2">
          <AppDowloadQR />
        </div>
      </div>
      <div className="text-sm flex items-center justify-between px-6 py-4">
        <div className="flex space-x-4">
          <MiscLink href="/" label={t("toc")} />
          <MiscLink href="/" label={t("privacy")} />
        </div>
        <div>
          <p className="text-xs">{t("footerSign")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const SocialLink: FC<{ href: string; label: string }> = ({ href, label }) => (
  <Link
    className="text-lg font-accent underline font-medium"
    href={href}
    target="_blank"
  >
    {label}
  </Link>
);

const MiscLink: FC<{ href: string; label: string }> = ({ href, label }) => (
  <Link className="underline" href={href}>
    {label}
  </Link>
);
