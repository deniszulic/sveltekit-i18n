import { base } from "$app/paths";
import type { Locales } from "$i18n/i18n-types.js";
import { detectLocale, i18n, isLocale } from "$i18n/i18n-util";
import { loadAllLocales } from "$i18n/i18n-util.sync";
import { redirect, type Handle, type RequestEvent } from "@sveltejs/kit";
import { initAcceptLanguageHeaderDetector } from "typesafe-i18n/detectors";
import { getPathnameWithoutBase } from "./utils.js";
import { error } from "@sveltejs/kit";

loadAllLocales();
const L = i18n();

export const handle: Handle = async ({ event, resolve }) => {
  // console.log(event.url.pathname);
  // read language slug
  const [, lang] = getPathnameWithoutBase(event.url).split("/");

  // redirect to base locale if no locale slug was found
  if (!lang) {
    const locale = getPreferredLocale(event);

    throw redirect(307, `${base}/${locale}`);
  }

  // if slug is not a locale, use base locale (e.g. api endpoints)
  const locale = isLocale(lang) ? (lang as Locales) : getPreferredLocale(event);
  const LL = L[locale];

  // bind locale and translation functions to current request
  event.locals.locale = locale;
  event.locals.LL = LL;

  const splitted: Array<string> = event.url.pathname.split("/");
  const splittedPath: string = event.url.pathname.replace(`/${lang}`, "");
  let allLinks = LL.firstParam()
    .split(",")
    .map((o: string) => o.trim());
  // console.log(event.url.pathname.replace(`/${lang}`, ''))
  // console.log("aa",splittedPath.at(-1))
  // One way
  // if (!allLinks.includes(splittedPath) && splitted[1] !== locale) throw error(404, "Page not found!!");

  // better check
  if ((!allLinks.includes(splittedPath) && splittedPath) || !isLocale(lang))
    throw error(404, !isLocale(lang) ? "Lang not defined" : "Page not found!!");

  // if (splittedPath.length === 3) {
  //   // console.log("omg:" + LL.logg.title());
  // }

  console.info(LL.log({ fileName: "hooks.server.ts" }));

  // replace html lang attribute with correct language
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", locale),
  });
};

const getPreferredLocale = ({ request }: RequestEvent) => {
  // detect the preferred language the user has configured in his browser
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
  const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);

  return detectLocale(acceptLanguageDetector);
};
