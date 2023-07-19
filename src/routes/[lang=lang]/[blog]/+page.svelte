<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  import type { PageData } from "./$types";
  import type { SvelteComponent } from "svelte";
  export let data: PageData;

//   let component = data.loadComponent();
//   let oof = import("../../../lib/Something.svelte").then((o) => o.default);

//   import { onMount } from "svelte";

//   let Thing: any;

//   //   const sleep = (ms) => new Promise((f) => setTimeout(f, ms));

//   onMount(async () => {
//     // await sleep(1000); // simulate network delay
//     Thing = (await import("../../../lib/Something.svelte")).default;
//   });
</script>

<h1>{$LL.logg.title()}</h1>
<svelte:component this={data.bigoof} />
