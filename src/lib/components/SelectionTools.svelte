<script>
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';

	export let selection;

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

	const handlerDelete = async (e) => {
		e.preventDefault();
		const form = e.target;

		const data = new FormData(form);
		const response = await fetch(form.action, {
			method: form.method,
			body: data
		});

		if (response.ok) form.reset();
	};
</script>

<!-- <Toast show={true}>{selection.length} item(s) selected</Toast> -->
<!-- <Toast>whatever message {selection.length}</Toast> -->

<div class="selection-tools" transition:fly|local={{ y: 50 }}>
	<form on:reset={resetSelection} action="?/deleteAll" method="post" on:submit={handlerDelete}>
		<input type="hidden" value={selection} name="ids" />
		<button type="submit">
			<span>delete {selection.length} item(s)</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
				/>
			</svg>
		</button>
		{#if selection.length != $page.data.notes.length}
			<button type="button" on:click={invertSelection}
				><span>invert</span><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
					/>
				</svg>
			</button>
		{/if}
		<button class="close" type="reset">
			<span>close</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</form>
</div>

<style>
	.selection-tools {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 0.8em 0;
		background-color: var(--selection);
		border-top: 1px solid var(--selection-border);
		z-index: 10;
	}

	form {
		padding-inline: 1em;
		display: flex;
		gap: 0.5em;
		max-width: 1000px;
		margin: 0 auto;
	}

	button {
		margin: 0;
		padding: 0.5em;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		border: none;
		margin: 0;
		border: 1px solid var(--selection-border);
		border-radius: 50vh;
	}

	button:hover {
		background-color: var(--selection-border);
		border-color: transparent;
	}

	span {
		font-size: 0.8rem;
		line-height: 0.8rem;
		padding: 0 0.5em;
		margin: 0;
	}

	.close {
		margin-left: auto;
	}
</style>
