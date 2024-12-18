import { LocaleOptions } from "@/constants";
import initTranslations from "@/lib/i18n";

const i18nNamespaces = ["home", "common"];

type HomeProps = {
  params: Promise<{ locale: LocaleOptions }>;
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <div className="max-w-7xl mx-auto flex min-h-screen">
      <main className="flex flex-col flex-grow gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col w-full divide-y">
          <div className="flex items-center p-6">
            <h1 className="font-accent font-bold text-3xl">{t("header")}</h1>
          </div>
          <div></div>
        </div>
      </main>
    </div>
  );
}
