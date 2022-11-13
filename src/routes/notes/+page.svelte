<script>
	import SelectionTools from '$lib/components/SelectionTools.svelte';
	import Note from '$lib/components/Note.svelte';
	import NoteActionCreate from '$lib/components/NoteActionCreate.svelte';

	import { onMount } from 'svelte';

	/**@type {import("./$types").ActionData} */
	export let form;

	/**@type {import("./$types").PageData} */
	export let data;

	let count = 0;
	let selection = [];

	const increment = () => {
		count++;
	};

	// onMount(() => {
	// 	const timer = setInterval(increment, 1000);
	// 	return () => clearInterval(timer);
	// });

	// $: console.log(selection);
</script>

<!-- <div>
	<button style="padding: 1em;" style:background-color={!count ? 'red' : ''}
		>{count}
		{#if !count}
			<span style="font-weight: bold;">intial</span>
		{/if}
	</button>
</div> -->

{#if selection.length}
	<SelectionTools bind:selection />
{/if}

<div class="container">
	<NoteActionCreate />

	<section class="notes-container">
		{#each data.notes as note (note.id)}
			<Note {note} bind:selection>
				<label class="label-selection" for={note.id}>
					<input
						class="checkbox"
						id={note.id}
						type="checkbox"
						value={note.id}
						bind:group={selection}
					/>

					<svg
						class="icon icon-check"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<svg
						class="icon icon-uncheck"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m21,12a9,9 0 1 1 -18,0a9,9 0 0 1 18,0z"
						/>
					</svg>
				</label>
			</Note>
		{:else}
			<span>empty list</span>
		{/each}
	</section>
</div>

<style>
	.container {
		/* padding-inline: 1em; */
	}

	.notes-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1em;
		/* padding-inline: 1em; */
	}

	.label-selection {
		font-size: 1.4rem;
		position: absolute;
		display: inline-flex;
		height: auto;
		top: 0;
		right: 0;
		margin: 0.5em;
		/* background-color: red; */
		/* padding: 1em; */
	}

	.checkbox {
		appearance: none;
		display: none;
		margin: 0;
		padding: 0;
	}

	.icon {
		width: 1em;
		height: 1em;
	}

	.icon-check {
		display: none;
		/* color: inherit; */
	}
	.icon-uncheck {
		opacity: 0.1;
	}
	.checkbox:checked {
		display: none;
	}
	.checkbox:checked ~ .icon-check {
		display: block;
	}
	.checkbox:checked ~ .icon-uncheck {
		display: none;
	}
</style>
