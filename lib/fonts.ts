import localFont from "next/font/local";
import { Noto_Sans_JP, Zen_Old_Mincho } from 'next/font/google'

export const recoleta = localFont({
    src: [
      {
        path: "../public/fonts/Recoleta/RecoletaLight.ttf",
        weight: "300",
        style: "normal",
      },
      {
        path: "../public/fonts/Recoleta/RecoletaRegular.ttf",
        weight: "400",
        style: "normal",
      },
      {
        path: "../public/fonts/Recoleta/RecoletaMedium.ttf",
        weight: "500",
        style: "normal",
      },
      {
        path: "../public/fonts/Recoleta/RecoletaSemiBold.ttf",
        weight: "600",
        style: "normal",
      },
      {
        path: "../public/fonts/Recoleta/RecoletaBold.ttf",
        weight: "700",
        style: "normal",
      },
      {
        path: "../public/fonts/Recoleta/RecoletaBlack.ttf",
        weight: "800",
        style: "normal",
      },
    ],
    variable: "--font-accent",
  });

export const zenOldMincho = Zen_Old_Mincho({
    variable: "--font-accent",
    weight: ['400', '500', '600', '700', '900'],
    subsets: ['latin'],
})

export  const basisGrotesque = localFont({
    src: [
      {
        path: "../public/fonts/BasisGrotesque/BasisGrotesqueLight.ttf",
        weight: "300",
        style: "normal",
      },
      {
        path: "../public/fonts/BasisGrotesque/BasisGrotesqueLightItalic.ttf",
        weight: "300",
        style: "italic",
      },
      {
        path: "../public/fonts/BasisGrotesque/BasisGrotesque.ttf",
        weight: "400",
        style: "normal",
      },
      {
        path: "../public/fonts/BasisGrotesque/BasisGrotesqueItalic.ttf",
        weight: "400",
        style: "italic",
      },
      {
        path: "../public/fonts/BasisGrotesque/BasisGrotesqueMedium.ttf",
        weight: "500",
        style: "normal",
      },
      {
        path: "../public/fonts/BasisGrotesque/BasisGrotesqueMediumItalic.ttf",
        weight: "500",
        style: "italic",
      },
      {
        path: "../public/fonts/BasisGrotesque/BasisGrotesqueMedium.ttf",
        weight: "600",
        style: "normal",
      },
      {
        path: "../public/fonts/BasisGrotesque/BasisGrotesqueMediumItalic.ttf",
        weight: "600",
        style: "italic",
      },
      {
        path: "../public/fonts/BasisGrotesque/BasisGrotesqueBold.ttf",
        weight: "700",
        style: "normal",
      },
      {
        path: "../public/fonts/BasisGrotesque/BasisGrotesqueBoldItalic.ttf",
        weight: "700",
        style: "italic",
      },
      {
        path: "../public/fonts/BasisGrotesque/BasisGrotesqueBold.ttf",
        weight: "700",
        style: "normal",
      },
      {
        path: "../public/fonts/BasisGrotesque/BasisGrotesqueBoldItalic.ttf",
        weight: "700",
        style: "italic",
      },
      {
        path: "../public/fonts/BasisGrotesque/BasisGrotesqueBlack.ttf",
        weight: "800",
        style: "normal",
      },
      {
        path: "../public/fonts/BasisGrotesque/BasisGrotesqueBlackItalic.ttf",
        weight: "800",
        style: "italic",
      },
    ],
    variable: "--font-base",
  });

  export const notoSanJapanese = Noto_Sans_JP({
    variable: "--font-base",
    subsets: ['latin'],
})