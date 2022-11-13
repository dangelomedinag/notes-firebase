<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import Toast from './toast/Toast.svelte';
	// import ToastA from './toast/ToastA.svelte';

	export let selection;
	let show = false;
	let toastInfo;

	const resetSelection = () => {
		selection = [];
	};
	const invertSelection = () => {
		selection = selection.reduce(
			(acc, curr) => {
				return acc.filter((r) => r !== curr);
			},
			$page.data.notes.map((t) => t.id)
		);
	};
</script>

<Toast show={true}>{selection.length} item(s) selected</Toast>
<!-- <Toast>whatever message {selection.length}</Toast> -->

<div class="selection-tools" transition:fly|local={{ y: -50 }}>
	<form on:reset={resetSelection} action="?/deleteAll" method="post" use:enhance>
		<input type="hidden" value={selection} name="ids" />
		<button type="submit">delete {selection.length} item(s)</button>
		<button type="reset">deselection</button>
		<button type="button" on:click={invertSelection}>invert selection</button>
	</form>
</div>

<style>
	.selection-tools {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		padding: 1em;
		background-color: var(--selection);

		z-index: 10;
		border-bottom: 1px solid var(--selection-border);
	}
</style>
