
import type { PageServerLoad } from './$types';
import Papa from 'papaparse';

export const load: PageServerLoad = async () => {
	try {
		// Clean menu URL targeting the standalone worksheet tab
		const menuUrl = 'https://docs.google.com/spreadsheets/d/1Q1dZflARia4eoGkgSacV3Cb1tUxTSbVznb-wMmdev9U/export?format=csv&sheet=Menu';

		const menuRes = await fetch(menuUrl);

		if (!menuRes.ok) {
			throw new Error('Google Sheets server connection rejected.');
		}

		const menuCsv = await menuRes.text();

		const menuResult = Papa.parse(menuCsv, {
			header: true,
			skipEmptyLines: true,
			dynamicTyping: true,
			// Strips out hidden BOM alignment characters from Google Sheets headers
			transformHeader: (header) => header.replace(/^\ufeff/, '').trim()
		});

		// Transform rows into your custom Record<string, MenuItem[]> object layout
		const dynamicMenu = menuResult.data.reduce((acc: Record<string, any>, item: any) => {
			if (!item.section || !item.name) return acc;
			
			const sectionName = String(item.section).trim();

			if (!acc[sectionName]) {
				acc[sectionName] = [];
			}

			const processedNotes = item.notes 
				? String(item.notes).split(',').map((n) => n.trim()).filter((n) => n !== '') 
				: [];

			acc[sectionName].push({
				name: String(item.name).trim(),
				desc: item.desc ? String(item.desc).trim() : undefined,
				price: Number(item.price) || 0,
				vegetarian: item.vegetarian === true || String(item.vegetarian).toUpperCase() === 'TRUE',
				notes: processedNotes
			});
			return acc;
		}, {} as Record<string, any>);

		return {
			menu: dynamicMenu
		};
	} catch (err) {
		console.error('Google Sheet menu data pipeline processing failed:', err);
		return { menu: {} };
	}
};
