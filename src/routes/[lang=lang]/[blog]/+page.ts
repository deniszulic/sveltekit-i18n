import type { PageLoad } from "./$types";

let amongus: any;
const loadComponent = () => {
  return import("../../../lib/Something.svelte").then(
    (o) => (amongus = o.default)
  );
  //   amongus = await import("../../../lib/Something.svelte").default;
};

export const load = (({ params }) => {
  let bigoof = loadComponent();
  return {
    // loadComponent,
    bigoof,
  };
}) satisfies PageLoad;
