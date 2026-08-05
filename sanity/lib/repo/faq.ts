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
    answer: isSubscriptionEnabled
      ? 'Yes. Souschef is free to download, and almost every feature is included in the free plan—including Cooking Mode, serving adjustments, measurement conversion, shopping lists, recipe translation, and more. Free users can import up to three recipes every seven days.'
      : 'Yes. Souschef is free to download and use—including Cooking Mode, serving adjustments, measurement conversion, shopping lists, recipe translation, and more.',
  },
  {
    id: 'plus',
    question: 'What does Souschef Plus include?',
    answer:
      'Souschef Plus gives you unlimited recipe imports and removes ads from the import experience. All the tools you use to organize and cook your saved recipes are already included in the free plan.',
    subscriptionOnly: true,
  },
  {
    id: 'import-limit',
    question: 'What happens when I reach the free import limit?',
    answer:
      'You can continue viewing, editing, organizing, and cooking every recipe you have already saved. The limit only pauses new imports until your next import becomes available.',
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
    answer: isSubscriptionEnabled
      ? 'はい。Souschefは無料でダウンロードでき、クッキングモード、人数調整、単位変換、買い物リスト、レシピ翻訳など、ほぼすべての機能が無料プランに含まれています。無料ユーザーは7日ごとに最大3件までレシピを取り込めます。'
      : 'はい。Souschefは無料でダウンロードして使え、クッキングモード、人数調整、単位変換、買い物リスト、レシピ翻訳など、すべての機能を利用できます。',
  },
  {
    id: 'plus',
    question: 'Souschef Plusには何が含まれますか？',
    answer:
      'Souschef Plusでは、レシピの取り込みが無制限になり、取り込み時の広告が非表示になります。保存したレシピの整理や料理に使うツールは、すべて無料プランに含まれています。',
    subscriptionOnly: true,
  },
  {
    id: 'import-limit',
    question: '無料の取り込み上限に達するとどうなりますか？',
    answer:
      'すでに保存したレシピの閲覧、編集、整理、料理は引き続き行えます。上限は新しい取り込みだけを一時停止し、次の取り込み枠が使えるようになるまで続きます。',
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
