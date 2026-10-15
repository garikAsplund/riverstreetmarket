// src/lib/site.ts
export const site = {
	name: 'River Street Market',
	phone: '(541) 426-4315',
	email: 'hello@shopriverstreetmarket.com',
	address: {
		street: '104 N River St',
		city: 'Enterprise',
		region: 'OR',
		zip: '97828'
	},
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4200.267889644636!2d-117.27777379999999!3d45.4259011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54a3f9863205f7fb%3A0xda4373197fa05ffd!2sRiver%20Street%20Market!5e1!3m2!1sen!2sus!4v1792094373289!5m2!1sen!2sus',
	mapsLink: 'https://maps.app.goo.gl/nN3N4H7reCteFVHh7',
	hours: [
		{ days: 'Wed–Sat', open: '11:00', close: '4:00' },
		{ days: 'Sun-Tue', open: 'Closed', close: '' },
	]
};

export type MenuItem = { name: string; desc?: string; price: number };

export const menu: Record<string, MenuItem[]> = {
	Sandwiches: [
		{
			name: 'Italian*',
			desc: 'mortadella, salami, capicola, aged provolone, organic iceberg, giardiniera, italian vinaigrette',
			price: 18
		},
		{
			name: 'Prosciutto',
			desc: 'prosciutto di parma, burrata, seasonal fruit, balsamic glaze',
			price: 18
		},
		{
			name: 'Ham + Cheese',
			desc: "city ham, fromager d'affinois, local greens, cherry mostarda",
			price: 16
		},
		{
			name: 'Beef Bologna',
			desc: 'wagyu beef bologna, dolomíten kőnig, local greens, carmelized onion mustard, aioli',
			price: 16
		},
		{
			name: 'Terrine',
			desc: 'rabbit + pork cheek terrine, local greens, cornichons, seeded dijon, green peppercorn aioli',
			price: 16
		},
		{
			name: 'Tuna',
			desc: 'pole + line caught tuna, castelvetrano olives, capers, pickled shallots, juanita peppers, seeded dijon, aioli, local greens, sherry vinaigrette',
			price: 17
		},
		{
			name: 'Manchego + Membrillo',
			desc: 'el trigal manchego, quince paste, local greens, flake salt, olive oil',
			price: 14
		},
		{
			name: 'The Clancy',
			desc: 'basic ham + cheese for the kids',
			price: 14
		}
	],
	Salads: [
		{
			name: 'Beets + Blue*',
			desc: 'local greens, pickled golden beets, point reyes blue cheese, walnuts, white wine vinaigrette',
			price: 16
		},
		{
			name: 'Caesar',
			desc: 'organic romaine, house-made croutons, shaved pecorino, caesar dressing',
			price: 16
		}
	]
};