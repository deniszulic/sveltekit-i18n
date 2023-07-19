import type { PageLoad } from "./$types";
import LL from "$i18n/i18n-svelte";
import { i18nObject } from "$i18n/i18n-util.js";
import { error } from "@sveltejs/kit";

let amongus: any;
const loadComponent = (component: string) => {
  return import(`../../../lib/${component}.svelte`).then(
    (o) => (amongus = o.default)
  );
  //   amongus = await import("../../../lib/Something.svelte").default;
};

export const load: PageLoad = async ({ parent, params }) => {
  // let bigoof = loadComponent();
  let bigoof;
  const { locale } = await parent();
  let sussy = { haha: "uwu" };

  // const LL = i18nObject(locale);
  // console.log("LL", LL);
  // let parsed = LL.firstParam()
  //   .split(",")
  //   .map((o: string) => o.trim());
  // if(params.blog !== LL.firstParam()) throw new Error("404: Not Found")
  // if (!parsed.includes(params.blog)) throw error(404, "Haha uwu");
  // console.log(parsed);
  switch (params.blog) {
    case "blog":
      bigoof = loadComponent("Something");
      break;
    case "banana":
      bigoof = loadComponent("Bananko");
      break;
  }
  return {
    // loadComponent,
    bigoof,
    sussy,
  };
};
