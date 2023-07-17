import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { LL }, parent }) => {
	const { locale } = await parent()
	// console.info(LL.log({ fileName: '+page.server.ts' }))
	console.log("parent", locale)
}
