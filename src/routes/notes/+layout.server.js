// import type { LayoutServerLoad } from './$types';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '$lib/firebase';

export async function load() {
	/**@type {import("$lib/types").ClientNote[]} */
	let notes = [];

	//get notes from db
	const querySnapshot = await getDocs(collection(db, 'notes'));

	//create a object for client
	querySnapshot.forEach((doc) => {
		/**@type {import("$lib/types").ServerNote<Timestamp>} */
		const { title, content, created_at, modified } = doc.data();

		const note = {
			id: doc.id,
			title,
			content,
			created_at: created_at.toDate(),
			modified: modified.toDate()
			// selected: false
		};
		notes.push(note);
		notes = notes.sort((a, b) => b.modified.getTime() - a.modified.getTime());
	});

	return {
		notes
	};
}
