import { FC } from "react";
import LanguageChanger from "../locale/LanguageChanger";
import Form from "next/form";
import { getI18n } from "@/contexts";

export interface NavbarProps {}

export const Navbar: FC<NavbarProps> = async ({}) => {
  const { t } = getI18n();

  return (
    <nav className="max-w-7xl mx-auto flex items-center justify-between border-b">
      <div className="flex divide-x flex-grow">
        <div className="flex flex-col divide-y flex-grow">
          <div className="flex justify-between px-6 py-3">
            <h1 className="font-recoleta font-black text-2xl">Souschef</h1>
            <LanguageChanger />
          </div>
          <div className="flex divide-x flex-grow">
            <div className="w-4" />
            <Form
              action="https://trysouschef.com/scrape/"
              className="flex gap-4"
            >
              <input
                name="query"
                placeholder={t("importRecipePlaceholder")}
                className="px-4 min-w-60"
              />
              <button
                type="submit"
                className="px-4 bg-surface-component text-text-invert"
              >
                {t("importRecipe")}
              </button>
            </Form>
            <div className="flex ml-auto divide-x">
              <button className="px-4">{t("blog")}</button>
              <button className="px-4">{t("about")}</button>
            </div>
          </div>
        </div>
        <div className="h-24 w-24">
          <img
            src="https://via.placeholder.com/150"
            alt="Logo"
            className="h-full w-full object-cover p-2"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
