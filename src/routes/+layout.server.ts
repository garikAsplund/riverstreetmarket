import type { LayoutServerLoad } from './$types';
import Papa from 'papaparse';

export const load: LayoutServerLoad = async () => {
	try {
		const hoursUrl = 'https://docs.google.com/spreadsheets/d/1Q1dZflARia4eoGkgSacV3Cb1tUxTSbVznb-wMmdev9U/export?format=csv&gid=1502643371';
		const res = await fetch(hoursUrl);

		if (!res.ok) throw new Error('Failed to download current store operating hours.');
		const csvText = await res.text();

		const parsed = Papa.parse(csvText, {
			header: true,
			skipEmptyLines: true,
			dynamicTyping: true,
			transformHeader: (header) => header.replace(/^\ufeff/, '').trim()
		});

		return {
			hours: parsed.data
		};
	} catch (err) {
		console.error('Hours sheet background load failed:', err);
		return { hours: [] };
	}
};
