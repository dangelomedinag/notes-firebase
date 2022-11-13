<script>
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { v4 as uuidv4 } from 'uuid';
	import { notifications } from './notifications';

	export let i;
</script>

<div style:transform="translateY(-{i * 65}px)">
	<slot />
</div>

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
