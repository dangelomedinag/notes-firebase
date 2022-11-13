<script>
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { v4 as uuidv4 } from 'uuid';
	import { notifications } from './notifications';

	export let autoclose;
	export let show = false;

	const id = uuidv4();

	const deleteFromStore = () => {
		notifications.update((t) => {
			const arr = t.filter((e) => e.id !== id);

			if (arr.length > 1) return arr.sort((a, b) => b.n - a.n);
			else return arr;
		});
		show = false;
	};

	export function open() {
		show = true;
	}
	export function close() {
		deleteFromStore();
	}

	onMount(() => {
		// show = true;
		notifications.update((v) => [{ id, n: Date.now() }, ...v]);

		if (autoclose) {
			setTimeout(deleteFromStore, autoclose);
			return;
		}

		return () => deleteFromStore();
	});
</script>

{#if $notifications.length > 0}
	{#if show}
		<div
			transition:scale
			style:transform="translateY(-{$notifications.findIndex((t) => t.id === id) * 70}px)"
		>
			<slot />
		</div>
	{/if}
{/if}

<style>
	div {
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 1em;
		background-color: var(--selection);
		margin-left: 1em;
		margin-bottom: 1em;
		border-radius: 5px;
		border: 1px solid var(--selection-border);
		z-index: 10;
		box-shadow: 0 2px 1px rgba(0, 0, 0, 0.06), 0 4px 2px rgba(0, 0, 0, 0.06),
			0 8px 4px rgba(0, 0, 0, 0.06), 0 16px 8px rgba(0, 0, 0, 0.06), 0 32px 16px rgba(0, 0, 0, 0.06);
		will-change: transform;
		transition: transform 0.3s ease-in-out;
	}
</style>
