import type { PageServerLoad } from "./$types";
import LL from "$i18n/i18n-svelte";
import { error } from "@sveltejs/kit";

let amongus;

export const load: PageServerLoad = (async ({
  locals: { LL },
  parent,
  params,
}) => {
  const { locale } = await parent();
  // console.log("locale2", locale)

  // console.log("halo", LL.firstParam())

  // // console.log(route.id)
  // console.log("params", params.blog)
  let parsed = LL.firstParam()
    .split(",")
    .map((o: string) => o.trim());
  // if(params.blog !== LL.firstParam()) throw new Error("404: Not Found")
  if (!parsed.includes(params.blog)) throw error(404, "Ligma");
  //   return { loadComponent };
}) satisfies PageServerLoad;
