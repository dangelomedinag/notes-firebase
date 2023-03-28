import { db } from '$lib/firebase';
import { fail } from '@sveltejs/kit';
import { doc, Timestamp, updateDoc } from 'firebase/firestore';

export async function load({ parent, params }) {
	const { notes } = await parent();

	const note = notes.filter((n) => n.id === params.id)[0];

	return { note };
}

export const actions = {
	update: async ({ request }) => {
		const fields = Object.fromEntries(await request.formData());

		if (!fields.title || !fields.content || !fields.id) {
			return fail(404, { success: false, message: 'invalid or missing title/content' });
		}

		try {
			await updateDoc(doc(db, 'notes', fields.id.toString()), {
				title: fields.title,
				content: fields.content,
				modified: Timestamp.now()
			});
		} catch (error) {
			console.error(error);
		}

		return {
			success: true,
			message: 'update note successful'
		};
	}
};
