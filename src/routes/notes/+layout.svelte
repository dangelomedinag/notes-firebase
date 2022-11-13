<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { collection, onSnapshot } from 'firebase/firestore';
	import { onMount } from 'svelte';

	onMount(() => {
		const unsubscribe = onSnapshot(collection(db, 'notes'), async (snapshot) => {
			const changesList = snapshot.docChanges();
			// const invalidateData = changesList.some(
			// 	({ type }) => type === 'modified' || type === 'removed'
			// );
			// console.log(changesList);
			await invalidateAll();
		});

		// Stop listening to changes
		return () => unsubscribe();
	});
</script>

<slot />
