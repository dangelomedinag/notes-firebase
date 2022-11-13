import { db } from '$lib/firebase';
import { invalid } from '@sveltejs/kit';
import { addDoc, collection, deleteDoc, doc, Timestamp, writeBatch } from 'firebase/firestore';

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request }) => {
		const fields = Object.fromEntries(await request.formData());

		if (!fields.title && !fields.content) {
			return invalid(404, { success: false, message: 'invalid or missing title/content' });
		}

		try {
			const note = {
				title: fields.title,
				content: fields.content,
				created_at: Timestamp.now(),
				modified: Timestamp.now()
			};

			await addDoc(collection(db, 'notes'), note);
		} catch (error) {
			console.error(error);
		}

		return {
			success: true,
			message: 'create note successful'
		};
	},
	delete: async ({ request }) => {
		const field = Object.fromEntries(await request.formData());
		const { id } = field;

		if (id) {
			try {
				await deleteDoc(doc(db, `notes/${id}`));
			} catch (error) {
				console.error(error);
			}
		}

		return {
			success: true,
			message: 'delete note successful'
		};
	},
	deleteAll: async ({ request }) => {
		const fields = await request.formData();

		const ids = fields.get('ids');

		const batch = writeBatch(db);
		ids.split(',').forEach((el) => {
			batch.delete(doc(db, `notes/${el}`));
		});

		try {
			await batch.commit();
		} catch (error) {
			console.error(error);
		}

		return {
			success: true,
			message: 'delete all notes successful'
		};
	}
};
