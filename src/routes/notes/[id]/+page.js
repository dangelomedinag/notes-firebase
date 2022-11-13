/** @type {import('./$types').PageLoad} */
export async function load({ parent, params }) {
	const { notes } = await parent();

	const note = notes.filter((n) => n.id === params.id)[0];

	return { note };
}
