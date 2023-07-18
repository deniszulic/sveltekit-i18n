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
  console.log(event.url.pathname);
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

  const splittedPath = event.url.pathname.split("/");
  let allLinks = LL.firstParam()
    .split(",")
    .map((o: string) => o.trim());

  if (!allLinks.includes(splittedPath[2])) throw error(404, "Ligma");

  if (splittedPath.length === 3) {
    // console.log("omg:" + LL.logg.title());
  }

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
