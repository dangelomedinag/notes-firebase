import { writable } from 'svelte/store';

const customStore = () => {
	const { subscribe, update, set } = writable([]);

	return {
		subscribe,
		update,
		set
	};
};

export const notifications = customStore();
