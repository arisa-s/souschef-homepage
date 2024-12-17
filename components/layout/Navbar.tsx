import { FC } from "react";
import LanguageChanger from "../locale/LanguageChanger";
import Form from "next/form";
import { getI18n } from "@/serverContexts";
import AppDowloadQR from "../shared/AppDownloadQR";
import Link from "next/link";

export const Navbar: FC = async ({}) => {
  const { t } = getI18n();

  return (
    <nav className="max-w-7xl mx-auto flex items-center justify-between border-b">
      <div className="flex divide-x flex-grow">
        <div className="flex flex-col divide-y flex-grow">
          <div className="flex justify-between px-6 py-3">
            <Link href="/">
              <h1 className="font-accent font-black text-2xl">
                {t("layout:appName")}
              </h1>
            </Link>
            <LanguageChanger />
          </div>
          <div className="flex divide-x flex-grow">
            <div className="w-4" />
            <Form action="https://trysouschef.com/scrape/" className="flex">
              <input
                name="query"
                placeholder={t("layout:importRecipePlaceholder")}
                className="px-4 py-2 min-w-60 placeholder:text-sm text-sm focus:outline-0"
              />
              <button
                type="submit"
                className="px-4 bg-surface-component text-text-invert font-medium hover:opacity-80"
              >
                {t("layout:importRecipe")}
              </button>
            </Form>
            <div className="flex ml-auto divide-x">
              <Link
                href="/blog"
                className="px-4 hover:bg-surface-hover items-center flex"
              >
                {t("layout:blog")}
              </Link>

              <button className="px-4 hover:bg-surface-hover">
                {t("layout:about")}
              </button>
            </div>
          </div>
        </div>
        <div className="pr-6 pl-2 py-2">
          <AppDowloadQR />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
