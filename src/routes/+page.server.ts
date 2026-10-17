import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	// Await the global layout database properties from +layout.server.ts
	const layoutData = await parent();
	
	return {
		hours: layoutData.hours ?? []
	};
};
