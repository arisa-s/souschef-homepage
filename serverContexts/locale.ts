import { i18n } from "i18next";
import serverContext from "server-only-context";


export const [getI18n, setI18n] = serverContext({} as i18n);