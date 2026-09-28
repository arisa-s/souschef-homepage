import { isSubscriptionEnabled, LocaleOptions } from '@/constants'

export type FaqItem = {
  id: string
  question: string
  answer: string
  /** Shown only when subscription messaging is enabled */
  subscriptionOnly?: boolean
}

const faqsEn: FaqItem[] = [
  {
    id: 'import-sources',
    question: 'Where can I import recipes from?',
    answer:
      'Souschef can import recipes from Instagram, TikTok, YouTube, Facebook, Pinterest, recipe websites, photos, screenshots, pasted text, ChatGPT, and Claude. Ask AI for a recipe, copy the result, and paste it into Text import.',
  },
  {
    id: 'save-recipe',
    question: 'How do I save a recipe to Souschef?',
    answer:
      'Simply tap Share from Instagram, TikTok, YouTube, your browser, or another supported app and select Souschef. You can also paste a recipe link or text directly into the app, copy recipes from ChatGPT or Claude, or scan a photo or screenshot.',
  },
  {
    id: 'is-free',
    question: 'Is Souschef free?',
    answer:
      'Yes. All cooking and organization tools are free. Free users get 5 saved recipe imports per rolling 7 days. Souschef Plus is optional and adds unlimited imports.',
  },
  {
    id: 'plus',
    question: 'What does Souschef Plus include?',
    answer:
      'Souschef Plus includes unlimited recipe imports. It does not unlock separate cooking tools; those are free.',
    subscriptionOnly: true,
  },
  {
    id: 'saved-without-paying',
    question: 'Can I still use saved recipes if I do not pay?',
    answer:
      'Yes. Your saved recipes and cooking tools remain available. Existing saved recipes remain available even after you hit the import limit.',
    subscriptionOnly: true,
  },
  {
    id: 'import-limit',
    question: 'What happens when I reach the free import limit?',
    answer:
      'You can still view, cook, edit, organize, and use existing saved recipes. You just need to wait for imports to refresh or upgrade to Plus for unlimited imports. Free users can save 5 imported recipes per rolling 7 days.',
    subscriptionOnly: true,
  },
  {
    id: 'edit-recipes',
    question: 'Can I edit recipes after importing them?',
    answer:
      'Yes. You can change the title, ingredients, quantities, instructions, serving size, and other details whenever you need to. AI extraction can occasionally miss something, so you always have full control over the final recipe.',
  },
  {
    id: 'servings-measurements',
    question: 'Can Souschef adjust servings and convert measurements?',
    answer:
      'Yes. Change the number of servings and Souschef automatically recalculates ingredient quantities. You can also switch between measurement systems such as metric and US customary units.',
  },
  {
    id: 'share-recipe',
    question: 'Can I share a recipe with someone who doesn’t have Souschef?',
    answer:
      'Yes. Shared recipes open in a simple web viewer, so friends and family can read the recipe, adjust its serving size, and switch measurement systems without installing the app.',
  },
  {
    id: 'platforms',
    question: 'Is Souschef available on iPhone and Android?',
    answer:
      'Yes. The full Souschef app is available for iPhone, iPad, Android phones, and Android tablets. Shared recipe links can also be opened in any modern web browser.',
  },
]

const faqsJa: FaqItem[] = [
  {
    id: 'import-sources',
    question: 'どこからレシピを取り込めますか？',
    answer:
      'Souschef（シェフノテ）は、Instagram、TikTok、YouTube、Facebook、Pinterest、レシピサイト、写真、スクリーンショット、貼り付けたテキスト、ChatGPT、Claudeからレシピを取り込めます。AIにレシピを作ってもらい、その回答をコピーしてTextインポートに貼り付けられます。',
  },
  {
    id: 'save-recipe',
    question: 'レシピをSouschefに保存するにはどうすればよいですか？',
    answer:
      'Instagram、TikTok、YouTube、ブラウザ、その他対応アプリから「共有」をタップし、Souschefを選択するだけです。アプリ内にレシピリンクやテキストを貼り付けたり、ChatGPTやClaudeのレシピをコピーしたり、写真やスクリーンショットをスキャンしたりすることもできます。',
  },
  {
    id: 'is-free',
    question: 'Souschefは無料ですか？',
    answer:
      'はい。調理と整理のツールはすべて無料です。無料ユーザーは、7日間のローリング期間で保存できるレシピの取り込みが5件までです。Souschef Plusは任意で、取り込みが無制限になります。',
  },
  {
    id: 'plus',
    question: 'Souschef Plusには何が含まれますか？',
    answer:
      'Souschef Plusに含まれるのは、無制限のレシピ取り込みです。別の調理ツールは解放しません。それらは無料です。',
    subscriptionOnly: true,
  },
  {
    id: 'saved-without-paying',
    question: '支払わなくても、保存したレシピは使えますか？',
    answer:
      'はい。保存したレシピと調理ツールはそのまま使えます。取り込み上限に達したあとも、保存済みのレシピは残ります。',
    subscriptionOnly: true,
  },
  {
    id: 'import-limit',
    question: '無料の取り込み上限に達するとどうなりますか？',
    answer:
      '保存済みのレシピは、閲覧、調理、編集、整理に引き続き使えます。取り込み枠が戻るまで待つか、Plusにアップグレードすると取り込みが無制限になります。無料ユーザーは、7日間のローリング期間で取り込んだレシピを5件まで保存できます。',
    subscriptionOnly: true,
  },
  {
    id: 'edit-recipes',
    question: '取り込んだあとレシピを編集できますか？',
    answer:
      'はい。タイトル、材料、分量、手順、人数など、必要なときにいつでも変更できます。AI抽出が一部を見落とすこともあるため、最終的なレシピはいつでも自分で調整できます。',
  },
  {
    id: 'servings-measurements',
    question: '人数調整や単位変換はできますか？',
    answer:
      'はい。人数を変えると、材料の分量を自動で再計算します。メートル法と米国慣用単位などの単位系の切り替えもできます。',
  },
  {
    id: 'share-recipe',
    question: 'Souschefを持っていない人にもレシピを共有できますか？',
    answer:
      'はい。共有されたレシピはシンプルなWebビューアで開くので、友だちや家族はアプリをインストールせずにレシピを読み、人数や単位系を切り替えられます。',
  },
  {
    id: 'platforms',
    question: 'iPhoneとAndroidの両方で使えますか？',
    answer:
      'はい。SouschefアプリはiPhone、iPad、Androidスマホ、Androidタブレットで利用できます。共有レシピのリンクは、最新のWebブラウザでも開けます。',
  },
]

const faqsByLocale: Record<LocaleOptions, FaqItem[]> = {
  en: faqsEn,
  ja: faqsJa,
}

const filterFaqs = (faqs: FaqItem[]): FaqItem[] => {
  if (isSubscriptionEnabled) return faqs
  return faqs.filter((faq) => !faq.subscriptionOnly)
}

export const getFaqs = async (language: LocaleOptions): Promise<FaqItem[]> => {
  return filterFaqs(faqsByLocale[language] ?? faqsEn)
}
